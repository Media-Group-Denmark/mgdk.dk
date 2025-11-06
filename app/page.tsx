import { getPageSectionsBySlug } from "@/lib/wp-getPageSections";
import { resolveSectionComponent } from "@/lib/sections-registry";

export default async function Home() {
  const { sections } = await getPageSectionsBySlug();

  return (
    <>
      {sections.map((s, i) => {
        const Component = resolveSectionComponent(s.type);
        return <Component key={i} {...s} />;
      })}
    </>
  );
}
