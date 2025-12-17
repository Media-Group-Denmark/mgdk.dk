import { getPageSectionsBySlug } from "@/lib/wp-getPageSections";
import { resolveSectionComponent } from "@/lib/sections-registry";
import { getSectionBackgroundClass } from "@/lib/section-utils";
import { getAllPosts } from "@/lib/wp-getPosts";
import { notFound } from "next/navigation";
import type { PostCategory } from "@/types/sections";

export async function generateStaticParams() {
  const categories: PostCategory[] = ["news", "case", "campaign"];
  const allPosts = await Promise.all(
    categories.map(async (category) => {
      return await getAllPosts(category, undefined);
    })
  );

  const uncategorizedPosts = await getAllPosts("no-category", undefined);

  return [...allPosts.flat(), ...uncategorizedPosts].map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = true;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { sections, id } = await getPageSectionsBySlug(slug, "post");
  if (!id || id === 0) {
    notFound();
  }
  console.log("id", sections, id);

  return (
    <>
      {sections.map((s, i) => {
        const Component = resolveSectionComponent(s.type);
        const nextSection = sections[i + 1];
        const isBeforeHighlightNumbers =
          nextSection?.type === "highlight_numbers_section";

        const backgroundClass = isBeforeHighlightNumbers
          ? getSectionBackgroundClass(s)
          : "";

        return (
          <div
            key={i}
            className={
              isBeforeHighlightNumbers
                ? `pb-36 lg:pb-40 ${backgroundClass}`
                : ""
            }
          >
            <Component {...s} />
          </div>
        );
      })}
    </>
  );
}
