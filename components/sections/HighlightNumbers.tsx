import parse from "html-react-parser";
import HighlightNumberCard from "../HighlightNumberCard";

export default function HighlightNumbersSection(props: {
  title?: string;
  text?: string;
  stats: {
    number?: number;
    title?: string;
    text?: string;
  }[];
}) {
  const { title, text, stats } = props;

  return (
    <div className="bg-[#F2F2F4] pt-30 pb-15 md:pb-25">
      <div className="bg-[#F2F2F4] w-full max-w-[1440px] 2xl:max-w-[1640px] mx-auto px-4 flex flex-col relative">
        <div className="bg-[#3F2ADB] text-white rounded-[13px] px-6 py-8 sm:px-12 sm:py-12 lg:px-20 lg:py-16 -mt-70 mb-12 lg:mb-16">
          {title && (
            <h2 className="text-[28px] sm:text-[32px] md:text-[52px] text-center mb-6 sm:mb-10 font-light">
              {parse(title)}
            </h2>
          )}
          <div className="bg-[#4934E0] rounded-[13px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-20 justify-items-center items-center">
              {stats.map((stat, index) => (
                <HighlightNumberCard
                  key={index}
                  number={stat.number ?? 0}
                  title={stat.title ?? ""}
                  text={stat.text ?? ""}
                />
              ))}
            </div>
          </div>
        </div>

        {text && (
          <p className="text-[12px] md:text-[14px] lg:text-[18px] text-center text-[#A7A7A7] font-light leading-relaxed  px-4 max-w-[800px] mx-auto">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}
