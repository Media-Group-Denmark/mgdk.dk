import { getPageSectionsBySlug } from "@/lib/wp-getPageSections";
import { resolveSectionComponent } from "@/lib/sections-registry";
import { getSectionBackgroundClass } from "@/lib/section-utils";

export const dynamic = "force-static";

export default async function Home() {
  const { sections } = await getPageSectionsBySlug();

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
