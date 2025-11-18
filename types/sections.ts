import type { ButtonType, ButtonVariant } from "./buttonVariants";

// Base WordPress types
export type WordPressImage =
  | string
  | number
  | { url?: string }
  | null
  | undefined;

export type WordPressLink = string | { url?: string } | null | undefined;

export interface WordPressButton {
  button_text?: string;
  button_variant?: ButtonVariant;
  button_url?: WordPressLink;
}

export interface WordPressCard {
  card_title?: string;
  card_text?: string;
  background_color?: string;
  buttons?: WordPressButton[];
}

export interface WordPressCaseCard {
  case_title?: string;
  case_text?: string;
  case_url?: WordPressLink;
}

// WordPress input types
export interface WordPressHeroSection {
  acf_fc_layout: "hero_section";
  title?: string;
  text?: string;
  image?: WordPressImage;
  buttons?: WordPressButton[];
  contact_card?: {
    name?: string;
    title?: string;
    phone_number?: string;
    mail?: string;
    image?: WordPressImage;
  };
}

export interface WordPressLogoCarouselSection {
  acf_fc_layout: "logo_carousel_section";
  logos: {
    logo_image?: WordPressImage;
    logo_url?: WordPressLink;
  }[];
}

export interface WordPressServicesGridSection {
  acf_fc_layout: "services_grid_section";
  service_cards?: WordPressCard[];
}

export interface WordPressCasesSection {
  acf_fc_layout: "case_section";
  title?: string;
  case_cards?: WordPressCaseCard[];
}

export interface WordPressStatementSection {
  acf_fc_layout: "statement_section";
  title?: string;
  text?: string;
  button?: WordPressButton;
}

export interface WordPressContactSection {
  acf_fc_layout: "contact_formular_section";
  title?: string;
}

export interface WordPressHighlightNumbersSection {
  acf_fc_layout: "highlight_numbers_section";
  title?: string;
  text?: string;
  stats: {
    title?: string;
    text?: string;
    number?: number;
  }[];
}

export interface WordPressTextAndImageSection {
  acf_fc_layout: "text_and_image_section";
  title?: string;
  text?: string;
  buttons?: WordPressButton[];
  image?: WordPressImage;
}

export interface WordPressOverviewSectionBlackBackground {
  acf_fc_layout: "overview_section_black";
  eyebrow_title?: string;
  title?: string;
  text?: string;
}

export interface WordPressOverviewSectionWhiteBackground {
  acf_fc_layout: "overview_section_white";
  title?: string;
  image?: WordPressImage;
  text?: string;
}

export interface WordPressImageSection {
  acf_fc_layout: "image_section";
  image?: WordPressImage;
}

export type WordPressFlexibleContentRow =
  | WordPressHeroSection
  | WordPressLogoCarouselSection
  | WordPressServicesGridSection
  | WordPressCasesSection
  | WordPressStatementSection
  | WordPressContactSection
  | WordPressHighlightNumbersSection
  | WordPressTextAndImageSection
  | WordPressOverviewSectionBlackBackground
  | WordPressOverviewSectionWhiteBackground
  | WordPressImageSection;

// Output types
export type Hero = {
  type: "hero_section";
  title: string;
  subtitle?: string;
  image?: string;
  buttons?: ButtonType[];
  contact_card?: {
    name?: string;
    title?: string;
    phone_number?: string;
    mail?: string;
    image?: WordPressImage;
  } | null;
};

export type LogoCarousel = {
  type: "logo_carousel_section";
  logos: {
    logo_image?: WordPressImage;
    logo_url?: WordPressLink;
  }[];
};

export type ServicesGrid = {
  type: "services_grid_section";
  service_cards: {
    card_title?: string;
    card_text?: string;
    background_color?: string;
    buttons?: ButtonType[];
  }[];
};

export type Cases = {
  type: "case_section";
  title?: string;
  case_cards: {
    case_title?: string;
    case_text?: string;
    case_url?: string;
  }[];
};

export type Statement = {
  type: "statement_section";
  title?: string;
  text?: string;
  button?: ButtonType;
};

export type Contact = {
  type: "contact_formular_section";
  title?: string;
};

export type HighlightNumbersSection = {
  type: "highlight_numbers_section";
  title?: string;
  text?: string;
  stats: {
    title?: string;
    text?: string;
    number?: number;
  }[];
};

export type TextAndImageSection = {
  type: "text_and_image_section";
  title?: string;
  text?: string;
  buttons?: ButtonType[];
  image?: WordPressImage;
};

export type OverviewSectionBlackBackground = {
  type: "overview_section_black";
  eyebrow_title?: string;
  title?: string;
  text?: string;
};

export type OverviewSectionWhiteBackground = {
  type: "overview_section_white";
  title?: string;
  image?: WordPressImage;
  text?: string;
};

export type ImageSection = {
  type: "image_section";
  image?: WordPressImage;
};

export type Section =
  | Hero
  | LogoCarousel
  | ServicesGrid
  | Cases
  | Statement
  | Contact
  | HighlightNumbersSection
  | TextAndImageSection
  | OverviewSectionBlackBackground
  | OverviewSectionWhiteBackground
  | ImageSection;

export interface WordPressPage {
  id: number;
  title?: {
    rendered?: string;
  };
  acf?: {
    flexible_content?: WordPressFlexibleContentRow[];
  };
}
