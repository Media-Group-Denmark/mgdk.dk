import { wp } from "./wp-server";
import type {
  Section,
  WordPressButton,
  WordPressCard,
  WordPressCase,
  WordPressFlexibleContentRow,
  WordPressPage,
  WordPressImage,
} from "@/types/sections";
import type { ButtonVariant } from "@/types/buttonVariants";

function imageToUrl(img: WordPressImage): string | undefined {
  if (!img) return undefined;
  if (typeof img === "number") return undefined;
  if (typeof img === "string") return img;
  if (typeof img === "object" && img.url) return img.url;
  return undefined;
}

export async function getPageSectionsBySlug(
  slug?: string
): Promise<{ id: number; title: string; sections: Section[] }> {
  let page: WordPressPage | undefined;

  if (!slug) {
    page = (await wp(`/wp/v2/pages/119?_fields=id,title,acf`)) as WordPressPage;
  } else {
    const list = (await wp(
      `/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id,title,acf`
    )) as WordPressPage[];
    page = list?.[0];
  }

  const title = page?.title?.rendered ?? "";
  const rawSections: WordPressFlexibleContentRow[] =
    page?.acf?.flexible_content ?? [];
  const sections: Section[] = rawSections.map((row) => {
    switch (row.acf_fc_layout) {
      case "hero_section": {
        return {
          type: "hero_section",
          title: row.title ?? "",
          text: row.text ?? "",
          image: imageToUrl(row.image),
          buttons: Array.isArray(row.buttons)
            ? row.buttons.map((b: WordPressButton) => ({
                button_text: b?.button_text ?? "",
                button_variant: (b?.button_variant ??
                  "primary") as ButtonVariant,
                button_url:
                  typeof b?.button_url === "string"
                    ? b.button_url
                    : b?.button_url?.url ?? "",
              }))
            : [],
          /* profile:
            row.hero_profile_name || row.hero_profile_email
              ? {
                  name: row.hero_profile_name ?? "",
                  title: row.hero_profile_title ?? "",
                  email: row.hero_profile_email ?? "",
                  image: imageToUrl(row.hero_profile_image),
                }
              : null, */
        };
      }

      case "services_grid_section": {
        return {
          type: "services_grid_section",
          heading: row.heading ?? "",
          cards: Array.isArray(row.cards)
            ? row.cards.map((c: WordPressCard) => ({
                title: c?.card_title ?? "",
                text: c?.card_text ?? "",
                linkLabel: c?.card_link_label ?? "",
                linkUrl:
                  typeof c?.card_link_url === "string"
                    ? c.card_link_url
                    : c?.card_link_url?.url ?? "",
              }))
            : [],
        };
      }

      case "cases_section": {
        return {
          type: "cases_section",
          title: row.section_title ?? "",
          items: Array.isArray(row.items)
            ? row.items.map((it: WordPressCase) => ({
                title: it?.case_title ?? "",
                excerpt: it?.case_excerpt ?? "",
                image: imageToUrl(it?.case_image),
                url:
                  typeof it?.case_link === "string"
                    ? it.case_link
                    : it?.case_link?.url ?? "",
              }))
            : [],
        };
      }

      case "statement_section": {
        return {
          type: "statement_section",
          highlight: row.statement_highlight ?? "",
          body: row.statement_body ?? "",
          buttonLabel:
            (typeof row.statement_button === "object" &&
              row.statement_button !== null &&
              "title" in row.statement_button &&
              row.statement_button.title) ||
            row.statement_button_label ||
            "",
          buttonUrl:
            typeof row.statement_button === "string"
              ? row.statement_button
              : typeof row.statement_button === "object"
              ? row.statement_button?.url ?? ""
              : "",
          background: row.statement_background ?? "",
        };
      }

      case "contact_section": {
        return {
          type: "contact_section",
          title: row.contact_heading ?? "",
          formShortcode: row.contact_form_shortcode ?? "",
        };
      }

      default: {
        const layout = (row as { acf_fc_layout: string }).acf_fc_layout;
        return { type: layout } as Section;
      }
    }
  });

  return { id: page?.id, title, sections };
}
