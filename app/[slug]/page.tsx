import { getPageSectionsBySlug } from "@/lib/wp-getPageSections";
import { resolveSectionComponent } from "@/lib/sections-registry";

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
        const Component = resolveSectionComponent((s as any).type);
        return <Component key={i} {...s} />;
      })}
    </>
  );
}
