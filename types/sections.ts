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
