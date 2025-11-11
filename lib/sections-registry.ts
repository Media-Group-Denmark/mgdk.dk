import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../components/sections/Hero"));
const ServicesGrid = dynamic(
  () => import("../components/sections/ServicesGrid")
);
const Cases = dynamic(() => import("../components/sections/Cases"));
const Statement = dynamic(() => import("../components/sections/Statement"));
const ContactFormular = dynamic(
  () => import("../components/sections/ContactFormular")
);

const Unknown = dynamic(() => import("../components/sections/Unknown"));

export const sectionsRegistry: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  hero_section: Hero,
  services_grid_section: ServicesGrid as React.ComponentType<
    Record<string, unknown>
  >,
  case_section: Cases as React.ComponentType<Record<string, unknown>>,
  statement_section: Statement as React.ComponentType<Record<string, unknown>>,
  contact_formular_section: ContactFormular as React.ComponentType<
    Record<string, unknown>
  >,

  // alt andet → Unknown
};

export function resolveSectionComponent(type: string) {
  return sectionsRegistry[type] ?? Unknown;
}
