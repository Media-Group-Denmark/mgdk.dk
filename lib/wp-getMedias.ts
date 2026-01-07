import { WordPressImage } from "@/types/sections";
import { wp } from "./wp-server";
import { imageToUrlAsync } from "./wp-getPageSections";

export interface WordPressMedier {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  logoUrl?: string;
  acf?: {
    beskrivelse?: string;
    logo?: number | WordPressImage;
    stats_section?: {
      title?: string;
      text?: string;
      stats?: {
        number?: number;
        title?: string;
        text?: string;
      }[];
    };
    black_background_section?: {
      eyebrow_title?: string;
      title?: string;
      text?: string;
    };
  };
}

async function getLogoUrl(
  logo: number | WordPressImage | undefined
): Promise<string | undefined> {
  if (!logo) return undefined;
  return await imageToUrlAsync(logo);
}

async function enrichMediasWithLogoUrls(
  medias: WordPressMedier[]
): Promise<WordPressMedier[]> {
  return Promise.all(
    medias.map(async (media) => {
      const logoUrl = await getLogoUrl(media.acf?.logo);
      return {
        ...media,
        logoUrl,
      };
    })
  );
}

export async function getAllMedias(): Promise<WordPressMedier[]> {
  try {
    const medias = (await wp(
      `/wp/v2/medier?per_page=100&_fields=id,title,slug,acf`,
      { next: { revalidate: 60 } }
    )) as WordPressMedier[];

    if (!medias || medias.length === 0) {
      return [];
    }

    return await enrichMediasWithLogoUrls(medias);
  } catch (error) {
    console.error("Error fetching medias:", error);
    return [];
  }
}

export async function getMediaBySlug(
  slug: string
): Promise<WordPressMedier | null> {
  try {
    const medias = (await wp(
      `/wp/v2/medier?slug=${encodeURIComponent(
        slug
      )}&_fields=id,title,slug,acf`,
      { next: { revalidate: 60 } }
    )) as WordPressMedier[];

    const media = medias?.[0];

    if (!media) {
      return null;
    }

    const enrichedMedias = await enrichMediasWithLogoUrls([media]);
    return enrichedMedias[0] ?? null;
  } catch (error) {
    console.error("Error fetching media by slug:", error);
    return null;
  }
}
