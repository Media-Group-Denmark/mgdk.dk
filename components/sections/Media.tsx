import { getMediaBySlug } from "@/lib/wp-getMedias";
import { imageToUrl } from "@/lib/wp-getPageSections";
import OverviewWhiteBackground from "./OverviewWhiteBackground";
import HighlightNumbersSection from "./HighlightNumbers";
import OverviewBlackBackground from "./OverviewBlackBackground";

interface MediaProps {
  slug: string;
}

export default async function Media({ slug }: MediaProps) {
  const media = await getMediaBySlug(slug);

  return (
    <div>
      {media?.acf?.black_background_section?.title && (
        <OverviewBlackBackground
          eyebrow_title={
            media?.acf?.black_background_section?.eyebrow_title ?? ""
          }
          title={media?.acf?.black_background_section?.title ?? ""}
          text={media?.acf?.black_background_section?.text ?? ""}
        />
      )}
      <OverviewWhiteBackground
        title={media?.title.rendered}
        image={imageToUrl(media?.acf?.logo)}
        text={media?.acf?.beskrivelse}
        className={`${
          media?.acf?.stats_section?.stats ? "pb-46 lg:pb-56" : ""
        }`}
      />
      {media?.acf?.stats_section?.stats && (
        <HighlightNumbersSection
          title={media?.acf?.stats_section?.title ?? ""}
          text={media?.acf?.stats_section?.text ?? ""}
          stats={media?.acf?.stats_section?.stats ?? []}
        />
      )}
    </div>
  );
}
