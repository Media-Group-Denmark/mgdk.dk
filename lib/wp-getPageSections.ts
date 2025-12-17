import { wp } from "./wp-server";
import type {
  Section,
  WordPressFlexibleContentRow,
  WordPressPage,
  WordPressImage,
  WordPressButton,
  WordPressLink,
  PostCategory,
} from "@/types/sections";
import type { ButtonVariant, ButtonType } from "@/types/buttonVariants";

async function getMediaUrl(mediaId: number): Promise<string | undefined> {
  try {
    const media = (await wp(`/wp/v2/media/${mediaId}?_fields=source_url`, {
      next: { revalidate: 3600 },
    })) as { source_url?: string };

    return media?.source_url;
  } catch (error) {
    console.error(`Error fetching media for ID "${mediaId}":`, error);
    return undefined;
  }
}

export function imageToUrl(img: WordPressImage): string | undefined {
  if (!img) return undefined;
  if (typeof img === "number") return undefined;
  if (typeof img === "string") return img;
  if (typeof img === "object" && img.url) return img.url;
  return undefined;
}

//Wordpress image to url
export async function imageToUrlAsync(
  img: WordPressImage
): Promise<string | undefined> {
  if (!img) return undefined;
  if (typeof img === "number") {
    return await getMediaUrl(img);
  }
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
  slug?: string,
  type?: "post" | "page"
): Promise<{ id: number; title: string; sections: Section[] }> {
  let page: WordPressPage | undefined;
  const endpoint = type === "post" ? "/wp/v2/posts" : "/wp/v2/pages";

  if (slug?.startsWith("medier/")) {
    page = (await wp(`/wp/v2/pages/383?_fields=id,title,acf`)) as WordPressPage;
  } else if (!slug) {
    page = (await wp(`/wp/v2/pages/119?_fields=id,title,acf`)) as WordPressPage;
  } else {
    const queryString =
      type === "post"
        ? `?slug=${encodeURIComponent(slug)}`
        : `?slug=${encodeURIComponent(slug)}&_fields=id,title,acf`;
    const list = (await wp(`${endpoint}${queryString}`)) as WordPressPage[];
    page = list?.[0];
  }

  if (!page) {
    return { id: 0, title: "", sections: [] };
  }

  const title = page.title?.rendered ?? "";
  const rawSections: WordPressFlexibleContentRow[] = Array.isArray(
    page.acf?.flexible_content
  )
    ? page.acf.flexible_content
    : [];

  const sections: Section[] = await Promise.all(
    rawSections.map(async (row) => {
      switch (row.acf_fc_layout) {
        case "hero_section": {
          const imageUrl = await imageToUrlAsync(row.image);
          const contactCardImageUrl = row.contact_card?.image
            ? await imageToUrlAsync(row.contact_card.image)
            : undefined;
          return {
            type: "hero_section",
            title: row.title ?? "",
            text: row.text ?? "",
            image: imageUrl,
            buttons: transformButtons(row.buttons),
            contact_card: row.contact_card
              ? {
                  name: row.contact_card.name ?? "",
                  title: row.contact_card.title ?? "",
                  phone_number: row.contact_card.phone_number ?? "",
                  mail: row.contact_card.mail ?? "",
                  image: contactCardImageUrl,
                }
              : null,
          };
        }

        case "logo_carousel_section": {
          const logos = await Promise.all(
            Array.isArray(row.logos)
              ? row.logos.map(async (l) => ({
                  logo_image: await imageToUrlAsync(l.logo_image),
                  logo_url: linkToUrl(l.logo_url),
                }))
              : []
          );
          return {
            type: "logo_carousel_section",
            logos,
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
            category: row.category as PostCategory,
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
          const imageUrl = await imageToUrlAsync(row.image);
          return {
            type: "text_and_image_section",
            title: row.title ?? "",
            text: row.text ?? "",
            buttons: transformButtons(row.buttons),
            image: imageUrl,
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
          const imageUrl = await imageToUrlAsync(row.image);
          return {
            type: "overview_section_white",
            title: row.title ?? "",
            image: imageUrl,
            text: row.text ?? "",
          };
        }

        case "image_section": {
          const imageUrl = await imageToUrlAsync(row.image);
          return {
            type: "image_section",
            image: imageUrl,
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
    })
  );

  return { id: page?.id, title, sections };
}
