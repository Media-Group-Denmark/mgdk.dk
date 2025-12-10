import { wp } from "./wp-server";
import type {
  Section,
  WordPressFlexibleContentRow,
  WordPressPage,
  WordPressImage,
  WordPressButton,
  WordPressLink,
} from "@/types/sections";
import type { ButtonVariant, ButtonType } from "@/types/buttonVariants";

//Wordpress image to url
export function imageToUrl(img: WordPressImage): string | undefined {
  if (!img) return undefined;
  if (typeof img === "number") return undefined;
  if (typeof img === "string") return img;
  if (typeof img === "object" && img.url) return img.url;
  return undefined;
}

//Wordpress link to url
export function linkToUrl(link: WordPressLink): string {
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

  if (slug?.startsWith("medier/")) {
    page = (await wp(`/wp/v2/pages/383?_fields=id,title,acf`)) as WordPressPage;
  } else if (!slug) {
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
          stats: Array.isArray(row.stats)
            ? row.stats.map((s) => ({
                number: s?.number ?? 0,
                title: s?.title ?? "",
                text: s?.text ?? "",
              }))
            : [],
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

      case "overview_section_black": {
        return {
          type: "overview_section_black",
          eyebrow_title: row.eyebrow_title ?? "",
          title: row.title ?? "",
          text: row.text ?? "",
        };
      }

      case "overview_section_white": {
        return {
          type: "overview_section_white",
          title: row.title ?? "",
          image: imageToUrl(row.image),
          text: row.text ?? "",
        };
      }

      case "image_section": {
        return {
          type: "image_section",
          image: imageToUrl(row.image),
        };
      }
      case "medias_section": {
        return {
          type: "medias_section",
        };
      }
      case "media_section": {
        const mediaSlug = slug?.startsWith("medier/")
          ? slug.replace("medier/", "")
          : undefined;
        return {
          type: "media_section",
          slug: mediaSlug,
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
