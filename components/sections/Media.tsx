import { getMediaBySlug } from "@/lib/wp-getMedias";
import { imageToUrl } from "@/lib/wp-getPageSections";
import OverviewWhiteBackground from "./OverviewWhiteBackground";
import HighlightNumbersSection from "./HighlightNumbers";

interface MediaProps {
  slug: string;
}

export default async function Media({ slug }: MediaProps) {
  const media = await getMediaBySlug(slug);

  return (
    <div>
      <OverviewWhiteBackground
        title={media?.title.rendered}
        image={imageToUrl(media?.acf?.logo)}
        text={media?.acf?.beskrivelse}
        className="pb-46 lg:pb-56"
      />
      <HighlightNumbersSection
        title={media?.acf?.stats_section?.title ?? ""}
        text={media?.acf?.stats_section?.text ?? ""}
        stats={media?.acf?.stats_section?.stats ?? []}
      />
    </div>
  );
}
