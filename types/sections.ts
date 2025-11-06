export type Hero = {
  type: "hero_section";
  title: string;
  subtitle?: string;
  image?: string;
  buttons?: { label: string; url: string }[];
  profile?: {
    name?: string;
    title?: string;
    email?: string;
    image?: string;
  } | null;
};

export type ServicesGrid = {
  type: "services_grid_section";
  heading?: string;
  cards: {
    title: string;
    text?: string;
    linkLabel?: string;
    linkUrl?: string;
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
};

export type Contact = {
  type: "contact_section";
  title?: string;
  formShortcode?: string;
};

export type Section = Hero | ServicesGrid | Cases | Statement | Contact;
