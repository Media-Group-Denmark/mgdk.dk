import Link from "next/link";
import { Button } from "../ui/button";

export default function Cases(props: {
  title?: string;
  case_cards: {
    case_title?: string;
    case_text?: string;
    case_url?: string;
  }[];
}) {
  const { title, case_cards } = props;
  return (
    <div className="w-full max-w-[1440px] 2xl:max-w-[1640px] mx-auto px-4">
      <h2 className="text-[36px] md:text-[52px] text-center font-medium mb-2 mt-20">
        {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 py-10">
        {case_cards?.map((card, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center bg-[#F2F2F4] p-20 rounded-lg"
          >
            <h3 className="text-[32px] md:text-[48px] font-medium mb-2">
              {card.case_title}
            </h3>
            <p className="text-[20px] text-center md:text-[28px] font-light mb-4">
              {card.case_text}
            </p>
            <Button variant="primary" size="md">
              <Link href={card.case_url ?? ""}>{card.case_title}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
