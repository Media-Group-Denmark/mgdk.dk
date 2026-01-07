import { getPageSectionsBySlug } from "@/lib/wp-getPageSections";
import { resolveSectionComponent } from "@/lib/sections-registry";
import { getSectionBackgroundClass } from "@/lib/section-utils";
import { notFound } from "next/navigation";

export const runtime = "edge";
export const dynamicParams = true;

export default async function MediaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { sections, id } = await getPageSectionsBySlug(`medier/${slug}`);
  if (!id || id === 0) {
    notFound();
  }

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
