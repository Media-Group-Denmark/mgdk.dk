import Image from "next/image";
import { getAllMedias } from "@/lib/wp-getMedias";
import { imageToUrl } from "@/lib/wp-getPageSections";
import Link from "next/link";

export default async function Medias() {
  const medias = await getAllMedias();

  return (
    <div>
      {medias.reverse().map((media) => (
        <div
          key={media.id}
          className="bg-white flex flex-col md:flex-row pb-8 md:pt-20"
        >
          <div className="max-w-[1440px] 2xl:max-w-[1640px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <Link href={`/medier/${media.slug}`}>
                <h2 className="text-[20px] md:text-[14px] lg:text-[18px] font-extralight uppercase my-8 md:my-0">
                  {media.title.rendered}
                </h2>
              </Link>
              <div className="h-full flex justify-center items-center">
                {media.acf?.logo && (
                  <Image
                    src={imageToUrl(media.acf.logo) ?? ""}
                    alt={media.title.rendered}
                    width={1000}
                    height={1000}
                    className="w-[70%] max-h-[300px] object-contain mx-auto mb-18"
                  />
                )}
              </div>
            </div>
            <div className="text-[18px] md:text-[18px] font-extralight md:w-1/2">
              {media.acf?.beskrivelse}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
