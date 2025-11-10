import { wp } from "./wp-server";
import type {
  Section,
  WordPressCard,
  WordPressFlexibleContentRow,
  WordPressPage,
  WordPressImage,
  WordPressButton,
  WordPressCaseCard,
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
          subtitle: row.text ?? "",
          image: imageToUrl(row.image),
          buttons: Array.isArray(row.buttons)
            ? row.buttons.map((b: WordPressButton) => ({
                button_text: b?.button_text ?? "",
                button_variant: (b?.button_variant ??
                  "primary") as ButtonVariant,
                button_url:
                  typeof b?.button_url === "string"
                    ? b.button_url
                    : typeof b?.button_url === "object" && b?.button_url?.url
                    ? b.button_url.url
                    : "",
              }))
            : [],
          contact_card: row.contact_card
            ? {
                name: row.contact_card.name ?? "",
                title: row.contact_card.title ?? "",
                phone_number: row.contact_card.phone_number ?? "",
                mail: row.contact_card.mail ?? "",
                image: imageToUrl(row.contact_card.image),
              }
            : null,
        };
      }

      case "services_grid_section": {
        return {
          type: "services_grid_section",
          service_cards: Array.isArray(row.service_cards)
            ? row.service_cards.map((c: WordPressCard) => ({
                card_title: c?.card_title ?? "",
                card_text: c?.card_text ?? "",
                background_color: c?.background_color ?? "",
                buttons: Array.isArray(c?.buttons)
                  ? c?.buttons.map((b: WordPressButton) => ({
                      button_text: b?.button_text ?? "",
                      button_variant: (b?.button_variant ??
                        "primary") as ButtonVariant,
                      button_url:
                        typeof b?.button_url === "string"
                          ? b.button_url
                          : typeof b?.button_url === "object" &&
                            b?.button_url?.url
                          ? b.button_url.url
                          : "",
                    }))
                  : [],
              }))
            : [],
        };
      }

      case "case_section": {
        return {
          type: "case_section",
          title: row.title ?? "",
          case_cards: Array.isArray(row.case_cards)
            ? row.case_cards.map((c: WordPressCaseCard) => ({
                case_title: c?.case_title ?? "",
                case_text: c?.case_text ?? "",
                case_url:
                  typeof c?.case_url === "string"
                    ? c.case_url
                    : typeof c?.case_url === "object" && c?.case_url?.url
                    ? c.case_url.url
                    : "",
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
