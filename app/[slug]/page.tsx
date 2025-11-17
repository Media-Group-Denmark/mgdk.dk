import { getPageSectionsBySlug } from "@/lib/wp-getPageSections";
import { resolveSectionComponent } from "@/lib/sections-registry";
import { wp } from "@/lib/wp-server";

export async function generateStaticParams() {
  const pages = (await wp(
    `/wp/v2/pages?per_page=100&_fields=slug`
  )) as Array<{ slug: string }>;

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
        return <Component key={i} {...s} />;
      })}
    </>
  );
}
