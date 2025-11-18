import { getPageSectionsBySlug } from "@/lib/wp-getPageSections";
import { resolveSectionComponent } from "@/lib/sections-registry";
import { getSectionBackgroundClass } from "@/lib/section-utils";
import { wp } from "@/lib/wp-server";

export async function generateStaticParams() {
  const pages = (await wp(`/wp/v2/pages?per_page=100&_fields=slug`)) as Array<{
    slug: string;
  }>;

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export const dynamic = "force-static";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { sections } = await getPageSectionsBySlug(slug);
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
