import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../components/sections/Hero"));
const ServicesGrid = dynamic(
  () => import("../components/sections/ServicesGrid")
);
/* const Services = dynamic(() => import('@/components/sections/Services'));
const Cases = dynamic(() => import('@/components/sections/Cases'));
const Statement = dynamic(() => import('@/components/sections/Statement'));
const Contact = dynamic(() => import('@/components/sections/Contact'));*/
const Unknown = dynamic(() => import("../components/sections/Unknown"));

export const sectionsRegistry: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  hero_section: Hero,
  services_grid_section: ServicesGrid as React.ComponentType<
    Record<string, unknown>
  >,
  /*   services: Services,
  cases: Cases,
  statement: Statement,
  contact: Contact, */
  // alt andet → Unknown
};

export function resolveSectionComponent(type: string) {
  return sectionsRegistry[type] ?? Unknown;
}
