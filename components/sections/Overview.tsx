import Image from "next/image";
import parse from "html-react-parser";

export default function Overview(props: {
  overview_black_background: {
    eyebrow_title?: string;
    title?: string;
    text?: string;
  }[];
  overview_white_background: {
    title?: string;
    image?: string;
    text?: string;
  }[];
}) {
  const { overview_black_background, overview_white_background } = props;
  console.log("overview_white_background", overview_white_background);
  return (
    <div>
      {overview_black_background.map((b) => (
        <div key={b.title} className="bg-[#151619] text-white mb-8">
          <div className="max-w-[1440px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-4">
            <div className="flex flex-col justify-center gap-4 md:w-1/2">
              <h3 className="text-[20px] md:text-[14px] lg:text-[18px] font-extralight uppercase mb-4">
                {b.eyebrow_title}
              </h3>
              <h2 className="max-w-[500px] text-[52px] md:text-[52px] font-extralight leading-14 mb-18">
                {parse(b.title ?? "")}
              </h2>
            </div>
            <div className="text-[18px] md:text-[18px] font-extralight md:w-1/2">
              {parse(b.text ?? "")}
            </div>
          </div>
        </div>
      ))}
      {overview_white_background.map((w) => (
        <div key={w.title} className="bg-white flex flex-col md:flex-row mb-8">
          <div className="max-w-[1440px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <h2 className="text-[20px] md:text-[14px] lg:text-[18px] font-extralight uppercase my-8 md:my-0">
                {parse(w.title ?? "")}
              </h2>
              <div className="h-full flex justify-center items-center">
                <Image
                  src={w.image ?? ""}
                  alt={w.title ?? ""}
                  width={1000}
                  height={1000}
                  className="w-[70%] max-h-[300px] object-contain mx-auto mb-18"
                />
              </div>
            </div>
            <div className="text-[18px] md:text-[18px] font-extralight md:w-1/2">
              {parse(w.text ?? "")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
