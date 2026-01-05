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
 * Henter featured image URL fra post (prøver _embedded først, derefter API)
 */
async function getPostFeaturedImage(
  post: WordPressPosts
): Promise<string | undefined> {
  if (post._embedded?.["wp:featuredmedia"]?.[0]) {
    const media = post._embedded["wp:featuredmedia"][0];
    return (
      media.source_url ||
      media.media_details?.sizes?.full?.source_url ||
      media.media_details?.sizes?.large?.source_url
    );
  }

  // Fallback: Hent manuelt hvis _embedded mangler
  if (post.featured_media && post.featured_media > 0) {
    return await getFeaturedImageUrl(post.featured_media);
  }

  return undefined;
}

/**
 * Mapper posts og tilføjer category slug og featured image
 */
async function enrichPostsWithCategorySlugs(
  posts: WordPressPosts[],
  knownCategorySlug?: string
): Promise<WordPressPosts[]> {
  return Promise.all(
    posts.map(async (post) => {
      // Hent kategori slug (brug kendt slug hvis tilgængelig, ellers hent fra API)
      let categorySlug: string | undefined = knownCategorySlug;
      if (!categorySlug && post.categories && post.categories.length > 0) {
        const slug = await getCategorySlugById(post.categories[0]);
        if (slug && slug !== "ikke-kategoriseret") {
          categorySlug = slug;
        }
      }

      // Hent featured image
      const image = await getPostFeaturedImage(post);

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
