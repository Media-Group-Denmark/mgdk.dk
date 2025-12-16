import { WordPressImage } from "@/types/sections";
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
