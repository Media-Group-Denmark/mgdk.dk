import { getPostBySlug, getAllPosts } from "@/lib/wp-getPosts";
import { notFound } from "next/navigation";
import type { PostCategory } from "@/types/sections";

export async function generateStaticParams() {
  // Hent alle posts fra alle kategorier
  const categories: PostCategory[] = ["news", "case", "campaign"];
  const allPosts = await Promise.all(
    categories.map(async (category) => {
      return await getAllPosts(category, undefined);
    })
  );

  // Hent også posts uden kategori ("no-category")
  const uncategorizedPosts = await getAllPosts("no-category", undefined);

  return [...allPosts.flat(), ...uncategorizedPosts].map((post) => ({
    slug: post.slug,
  }));
}

export const runtime = "edge";
export const dynamicParams = true;
export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full max-w-[1440px] 2xl:max-w-[1640px] mx-auto px-4 py-20">
      <article>
        <h1 className="text-[36px] md:text-[52px] font-medium mb-8">
          {post.title?.rendered}
        </h1>
        {post.acf?.text && (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.acf.text }}
          />
        )}
      </article>
    </div>
  );
}
