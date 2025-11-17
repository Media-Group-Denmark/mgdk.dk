import parse from "html-react-parser";
import HighlightNumberCard from "../HighlightNumberCard";

export default function HighlightNumbersSection(props: {
  title?: string;
  text?: string;
  people_stats?: {
    title?: string;
    text?: string;
  };
  location_stats?: {
    title?: string;
    text?: string;
  };
  media_stats?: {
    title?: string;
    text?: string;
  };
}) {
  const { title, text, people_stats, location_stats, media_stats } = props;
  return (
    <div className="bg-[#F2F2F4]">
      <div className="bg-[#F2F2F4] w-full max-w-[1440px] mx-auto px-4">
        <div className="bg-[#3F2ADB] text-white rounded-[13px] px-12 py-12 lg:px-20 lg:py-16">
          <h2 className="text-[32px] md:text-[52px] text-center mb-10 font-light">
            {parse(title ?? "")}
          </h2>
          <div className="bg-[#4934E0] rounded-[13px] px-10 py-16 lg:px-16 lg:py-20 flex flex-col md:flex-row justify-between items-center gap-15 lg:gap-20">
            <HighlightNumberCard
              number="53"
              title={people_stats?.title ?? ""}
              text={people_stats?.text ?? ""}
            />
            <HighlightNumberCard
              number="3"
              title={location_stats?.title ?? ""}
              text={location_stats?.text ?? ""}
            />
            <HighlightNumberCard
              number="21"
              title={media_stats?.title ?? ""}
              text={media_stats?.text ?? ""}
            />
          </div>
        </div>
        <p className="text-[12px] md:text-[14px] lg:text-[18px] text-center text-[#A7A7A7] font-light leading-relaxed mt-12 mb-16 px-4 max-w-[800px] mx-auto">
          {text}
        </p>
      </div>
    </div>
  );
}
