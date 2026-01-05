import { getAllMedias, WordPressMedier } from "@/lib/wp-getMedias";
import { getPageSectionsBySlug } from "@/lib/wp-getPageSections";
import { resolveSectionComponent } from "@/lib/sections-registry";
import { getSectionBackgroundClass } from "@/lib/section-utils";

export default async function MediaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { sections } = await getPageSectionsBySlug(`medier/${slug}`);
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

export async function generateStaticParams() {
  const medias = await getAllMedias();
  return medias.map((media: WordPressMedier) => ({
    slug: media.slug,
  }));
}

export const dynamic = "force-static";
export const runtime = 'edge';
