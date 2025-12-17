import { PostCategory } from "@/types/sections";
import { wp } from "./wp-server";

export interface WordPressPosts {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  categories?: number[];
  featured_media?: number;
  image?: string;
  categorySlug?: string;
  acf?: {
    title?: string;
    text?: string;
    case_title?: string;
    case_text?: string;
    case_url?: string | { url?: string };
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: {
          full?: { source_url?: string };
          large?: { source_url?: string };
          medium?: { source_url?: string };
        };
      };
    }>;
  };
}

interface WordPressCategory {
  id: number;
  slug: string;
}

/**
 * Henter kategori ID
 */
async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  try {
    const categories = (await wp(
      `/wp/v2/categories?slug=${encodeURIComponent(slug)}&_fields=id,slug`,
      { next: { revalidate: 3600 } }
    )) as WordPressCategory[];

    return categories?.[0]?.id ?? null;
  } catch (error) {
    console.error(`Error fetching category by slug "${slug}":`, error);
    return null;
  }
}

/**
 * Henter kategori slug
 */
async function getCategorySlugById(id: number): Promise<string | null> {
  try {
    const category = (await wp(`/wp/v2/categories/${id}?_fields=id,slug`, {
      next: { revalidate: 3600 },
    })) as WordPressCategory;

    return category?.slug ?? null;
  } catch (error) {
    console.error(`Error fetching category by id "${id}":`, error);
    return null;
  }
}

/**
 * Henter featured image URL baseret på media ID
 */
async function getFeaturedImageUrl(
  mediaId: number
): Promise<string | undefined> {
  try {
    const media = (await wp(`/wp/v2/media/${mediaId}?_fields=source_url`, {
      next: { revalidate: 3600 },
    })) as { source_url?: string };

    return media?.source_url;
  } catch (error) {
    console.error(
      `Error fetching featured image for media ID "${mediaId}":`,
      error
    );
    return undefined;
  }
}

/**
 * Mapper de rigtige posts hvis der er en kategori og tilføjer featured image
 */
async function enrichPostsWithCategorySlugs(
  posts: WordPressPosts[],
  knownCategorySlug?: string
): Promise<WordPressPosts[]> {
  if (knownCategorySlug) {
    // Hvis vi kender kategorien, tilføj category slug og hent featured images
    return Promise.all(
      posts.map(async (post) => {
        const image =
          post.featured_media && post.featured_media > 0
            ? await getFeaturedImageUrl(post.featured_media)
            : post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
                ?.full?.source_url ||
              post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
                ?.large?.source_url;

        return {
          ...post,
          categorySlug: knownCategorySlug,
          image,
        };
      })
    );
  }

  // Ellers hent category slug og featured image for hver post
  return Promise.all(
    posts.map(async (post) => {
      let categorySlug: string | undefined;
      if (post.categories && post.categories.length > 0) {
        const slug = await getCategorySlugById(post.categories[0]);
        if (slug && slug !== "ikke-kategoriseret") {
          categorySlug = slug;
        }
      }

      const image =
        post.featured_media && post.featured_media > 0
          ? await getFeaturedImageUrl(post.featured_media)
          : post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
              ?.full?.source_url ||
            post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
              ?.large?.source_url;

      return {
        ...post,
        categorySlug,
        image,
      };
    })
  );
}

export async function getAllPosts(
  category?: PostCategory,
  limit?: number
): Promise<WordPressPosts[]> {
  try {
    let endpoint = `/wp/v2/posts?_fields=id,title,slug,categories,acf,featured_media&_embed`;

    if (category && category !== "no-category") {
      const categoryId = await getCategoryIdBySlug(category);
      if (!categoryId) {
        console.warn(`Category "${category}" not found`);
        return [];
      }
      endpoint += `&categories=${categoryId}`;
    }

    endpoint += `&per_page=${limit ?? 100}`;

    const posts = (await wp(endpoint, {
      next: { revalidate: 60 },
    })) as WordPressPosts[];

    const knownCategorySlug =
      category && category !== "no-category" ? category : undefined;
    return enrichPostsWithCategorySlugs(posts, knownCategorySlug);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(
  slug: string
): Promise<WordPressPosts | null> {
  try {
    const posts = (await wp(
      `/wp/v2/posts?slug=${encodeURIComponent(
        slug
      )}&_fields=id,title,slug,categories,acf,featured_media&_embed`,
      { next: { revalidate: 60 } }
    )) as WordPressPosts[];

    const post = posts?.[0];
    if (!post) {
      return null;
    }

    const enrichedPosts = await enrichPostsWithCategorySlugs([post]);
    return enrichedPosts[0] ?? null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}
