import type { ButtonType } from "./buttonVariants";

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
  button_variant?: string;
  button_url?: WordPressLink;
}

export interface WordPressCard {
  card_title?: string;
  card_text?: string;
  background_color?: string;
  buttons?: WordPressButton[];
}

export interface WordPressCase {
  case_title?: string;
  case_excerpt?: string;
  case_image?: WordPressImage;
  case_link?: WordPressLink;
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

export interface WordPressServicesGridSection {
  acf_fc_layout: "services_grid_section";
  service_cards?: WordPressCard[];
}

export interface WordPressCasesSection {
  acf_fc_layout: "cases_section";
  section_title?: string;
  items?: WordPressCase[];
}

export interface WordPressStatementSection {
  acf_fc_layout: "statement_section";
  statement_highlight?: string;
  statement_body?: string;
  statement_button?: WordPressLink | { title?: string; url?: string };
  statement_button_label?: string;
  statement_background?: string;
}

export interface WordPressContactSection {
  acf_fc_layout: "contact_section";
  contact_heading?: string;
  contact_form_shortcode?: string;
}

export type WordPressFlexibleContentRow =
  | WordPressHeroSection
  | WordPressServicesGridSection
  | WordPressCasesSection
  | WordPressStatementSection
  | WordPressContactSection;

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

export type ServicesGrid = {
  type: "services_grid_section";
  cards: {
    card_title?: string;
    card_text?: string;
    background_color?: string;
    buttons?: ButtonType[];
  }[];
};

export type Cases = {
  type: "cases_section";
  title?: string;
  items: { title: string; excerpt?: string; image?: string; url?: string }[];
};

export type Statement = {
  type: "statement_section";
  highlight: string;
  body?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  background?: string;
};

export type Contact = {
  type: "contact_section";
  title?: string;
  formShortcode?: string;
};

export type Section = Hero | ServicesGrid | Cases | Statement | Contact;

export interface WordPressPage {
  id: number;
  title?: {
    rendered?: string;
  };
  acf?: {
    flexible_content?: WordPressFlexibleContentRow[];
  };
}
