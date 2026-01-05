import Image from "next/image";
import parse from "html-react-parser";

export default function OverviewWhiteBackground(props: {
  title?: string;
  image?: string;
  text?: string;
  className?: string;
}) {
  const { title, image, text, className } = props;
  return (
    <div
      key={title}
      className={`bg-white flex flex-col md:flex-row pb-8 md:pt-20 ${className}`}
    >
      <div className="max-w-[1440px] 2xl:max-w-[1640px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <h2 className="text-[20px] md:text-[14px] lg:text-[18px] font-extralight uppercase my-8 md:my-0">
            {parse(title ?? "")}
          </h2>
          {image && (
            <div className="h-full flex justify-center items-center">
              <Image
                src={image ?? ""}
                alt={title ?? ""}
                width={1000}
                height={1000}
                className="w-[70%] max-h-[300px] object-contain mx-auto mb-18"
              />
            </div>
          )}
        </div>
        <div className="text-[18px] md:text-[18px] font-extralight md:w-1/2">
          {parse(text ?? "")}
        </div>
      </div>
    </div>
  );
}
