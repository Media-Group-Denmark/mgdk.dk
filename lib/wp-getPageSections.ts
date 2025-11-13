import { wp } from "./wp-server";
import type {
  Section,
  WordPressCard,
  WordPressFlexibleContentRow,
  WordPressPage,
  WordPressImage,
  WordPressButton,
  WordPressCaseCard,
  WordPressLogoCarouselSection,
  WordPressLink,
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

      case "logo_carousel_section": {
        return {
          type: "logo_carousel_section",
          logos: Array.isArray(row.logos)
            ? row.logos.map(
                (l: {
                  logo_image?: WordPressImage;
                  logo_url?: WordPressLink;
                }) => ({
                  logo_image: imageToUrl(l.logo_image),
                  logo_url:
                    typeof l.logo_url === "string"
                      ? l.logo_url
                      : typeof l.logo_url === "object" && l.logo_url?.url
                      ? l.logo_url.url
                      : "",
                })
              )
            : [],
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
          title: row.title ?? "",
          text: row.text ?? "",
          button: row.button
            ? {
                button_text: row.button.button_text ?? "",
                button_variant: (row.button.button_variant ??
                  "primary") as ButtonVariant,
                button_url:
                  typeof row.button.button_url === "string"
                    ? row.button.button_url
                    : typeof row.button.button_url === "object" &&
                      row.button.button_url?.url
                    ? row.button.button_url.url
                    : "",
              }
            : undefined,
        };
      }

      case "contact_formular_section": {
        return {
          type: "contact_formular_section",
          title: row.title ?? "",
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
