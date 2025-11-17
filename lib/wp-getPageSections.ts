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
  WordPressOverviewSection,
} from "@/types/sections";
import type { ButtonVariant, ButtonType } from "@/types/buttonVariants";

//Wordpress image to url
function imageToUrl(img: WordPressImage): string | undefined {
  if (!img) return undefined;
  if (typeof img === "number") return undefined;
  if (typeof img === "string") return img;
  if (typeof img === "object" && img.url) return img.url;
  return undefined;
}

//Wordpress link to url
function linkToUrl(link: WordPressLink): string {
  if (!link) return "";
  if (typeof link === "string") return link;
  if (typeof link === "object" && link.url) return link.url;
  return "";
}

//Transform Wordpress button to button type
function transformButton(button: WordPressButton): ButtonType {
  return {
    button_text: button?.button_text ?? "",
    button_variant: (button?.button_variant ?? "primary") as ButtonVariant,
    button_url: linkToUrl(button?.button_url),
  };
}

//Transform Wordpress buttons Array to button types Array
function transformButtons(
  buttons: WordPressButton[] | undefined
): ButtonType[] {
  return Array.isArray(buttons) ? buttons.map(transformButton) : [];
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
          buttons: transformButtons(row.buttons),
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
            ? row.logos.map((l) => ({
                logo_image: imageToUrl(l.logo_image),
                logo_url: linkToUrl(l.logo_url),
              }))
            : [],
        };
      }

      case "services_grid_section": {
        return {
          type: "services_grid_section",
          service_cards: Array.isArray(row.service_cards)
            ? row.service_cards.map((c) => ({
                card_title: c?.card_title ?? "",
                card_text: c?.card_text ?? "",
                background_color: c?.background_color ?? "",
                buttons: transformButtons(c?.buttons),
              }))
            : [],
        };
      }

      case "case_section": {
        return {
          type: "case_section",
          title: row.title ?? "",
          case_cards: Array.isArray(row.case_cards)
            ? row.case_cards.map((c) => ({
                case_title: c?.case_title ?? "",
                case_text: c?.case_text ?? "",
                case_url: linkToUrl(c?.case_url),
              }))
            : [],
        };
      }

      case "statement_section": {
        return {
          type: "statement_section",
          title: row.title ?? "",
          text: row.text ?? "",
          button: row.button ? transformButton(row.button) : undefined,
        };
      }

      case "contact_formular_section": {
        return {
          type: "contact_formular_section",
          title: row.title ?? "",
        };
      }

      case "highlight_numbers_section": {
        return {
          type: "highlight_numbers_section",
          title: row.title ?? "",
          text: row.text ?? "",
          people_stats: row.people_stats
            ? {
                title: row.people_stats.title ?? "",
                text: row.people_stats.text ?? "",
              }
            : {},
          location_stats: row.location_stats
            ? {
                title: row.location_stats.title ?? "",
                text: row.location_stats.text ?? "",
              }
            : {},
          media_stats: row.media_stats
            ? {
                title: row.media_stats.title ?? "",
                text: row.media_stats.text ?? "",
              }
            : {},
        };
      }
      case "text_and_image_section": {
        return {
          type: "text_and_image_section",
          title: row.title ?? "",
          text: row.text ?? "",
          buttons: transformButtons(row.buttons),
          image: imageToUrl(row.image),
        };
      }

      case "overview_section": {
        const overviewRow = row as WordPressOverviewSection;
        return {
          type: "overview_section",
          overview_black_background: Array.isArray(
            overviewRow.overview_black_background
          )
            ? overviewRow.overview_black_background.map((b) => ({
                eyebrow_title: b.eyebrow_title ?? "",
                title: b.title ?? "",
                text: b.text ?? "",
              }))
            : [],
          overview_white_background: Array.isArray(
            overviewRow.overview_white_background
          )
            ? overviewRow.overview_white_background.map((w) => ({
                title: w.title ?? "",
                image: imageToUrl(w.image),
                text: w.text ?? "",
              }))
            : [],
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
