import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../components/sections/Hero"));
const LogoCarousel = dynamic(
  () => import("../components/sections/LogoCarousel")
);
const ServicesGrid = dynamic(
  () => import("../components/sections/ServicesGrid")
);
const Cases = dynamic(() => import("../components/sections/Cases"));
const Statement = dynamic(() => import("../components/sections/Statement"));
const ContactFormular = dynamic(
  () => import("../components/sections/ContactFormular")
);
const HighlightNumbers = dynamic(
  () => import("../components/sections/HighlightNumbers")
);
const TextAndImage = dynamic(
  () => import("../components/sections/TextAndImage")
);
const OverviewBlackBackground = dynamic(
  () => import("../components/sections/OverviewBlackBackground")
);
const OverviewWhiteBackground = dynamic(
  () => import("../components/sections/OverviewWhiteBackground")
);
const Image = dynamic(() => import("../components/sections/Image"));
const Unknown = dynamic(() => import("../components/sections/Unknown"));

export const sectionsRegistry: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  hero_section: Hero,
  logo_carousel_section: LogoCarousel as React.ComponentType<
    Record<string, unknown>
  >,
  services_grid_section: ServicesGrid as React.ComponentType<
    Record<string, unknown>
  >,
  case_section: Cases as React.ComponentType<Record<string, unknown>>,
  statement_section: Statement as React.ComponentType<Record<string, unknown>>,
  contact_formular_section: ContactFormular as React.ComponentType<
    Record<string, unknown>
  >,
  highlight_numbers_section: HighlightNumbers as React.ComponentType<
    Record<string, unknown>
  >,
  text_and_image_section: TextAndImage as React.ComponentType<
    Record<string, unknown>
  >,
  overview_section_black: OverviewBlackBackground as React.ComponentType<
    Record<string, unknown>
  >,
  overview_section_white: OverviewWhiteBackground as React.ComponentType<
    Record<string, unknown>
  >,
  image_section: Image as React.ComponentType<Record<string, unknown>>,
  // alt andet → Unknown
};

export function resolveSectionComponent(type: string) {
  return sectionsRegistry[type] ?? Unknown;
}
