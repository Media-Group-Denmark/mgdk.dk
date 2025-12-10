import { WordPressImage, WordPressLink } from "@/types/sections";
import { wp } from "./wp-server";

export interface WordPressMedier {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  acf?: {
    beskrivelse?: string;
    logo?: WordPressImage;
    stats?: {
      number?: number;
      title?: string;
      text?: string;
    }[];
  };
}

export async function getAllMedias(): Promise<WordPressMedier[]> {
  try {
    const medias = (await wp(
      `/wp/v2/medier?per_page=100&_fields=id,title,slug,acf`,
      { next: { revalidate: 60 } }
    )) as WordPressMedier[];

    return medias ?? [];
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

    // WordPress returnerer et array, så vi skal tage det første element
    const media = medias?.[0];

    if (!media) {
      return null;
    }

    return media;
  } catch (error) {
    console.error("Error fetching media by slug:", error);
    return null;
  }
}
