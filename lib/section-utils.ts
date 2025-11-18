export function getSectionBackgroundClass(section: {
  type: string;
  [key: string]: unknown;
}): string {
  switch (section.type) {
    case "statement_section":
      return "bg-[#1F1F24]";
    case "overview_section_black":
      return "bg-[#151619]";
    case "services_grid_section":
      return "bg-[#F2F2F4]";
    case "logo_carousel_section":
      return "bg-[#F2F2F4]";
    default:
      // Default to white for sections without explicit backgrounds
      return "bg-white";
  }
}
