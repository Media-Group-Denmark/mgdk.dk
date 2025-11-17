import type { CSSProperties } from "react";
import type { ButtonType } from "@/types/buttonVariants";
import { Button } from "../ui/button";
import Link from "next/link";

type CardBackground = { className: string; style?: CSSProperties };

const getCardBackground = (color?: string): CardBackground => {
  switch (color?.toLowerCase()) {
    case "white":
      return { className: "bg-white" };
    case "black":
      return {
        className: "",
        style: {
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(140% 100% at 30% 75%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 55%), conic-gradient(from 220deg at 40% 68%, #000000 0deg, #000000 120deg, #686883 300deg, #000000 350deg)",
        },
      };
    case "blue":
      return {
        className: "bg-gradient-to-b from-[#CBE5F5] to-[#fbfcfd]",
      };
    default:
      return { className: "bg-white" };
  }
};

export default function ServicesGrid(props: {
  service_cards: {
    card_title?: string;
    card_text?: string;
    background_color?: string;
    buttons?: ButtonType[];
  }[];
}) {
  const { service_cards = [] } = props;

  return (
    <div className="bg-[#F2F2F4] lg:py-5">
      <div className="lg:px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:p-1">
        {service_cards.map((card) => {
          const { className: backgroundClass, style: backgroundStyle } =
            getCardBackground(card.background_color);

          return (
            <div
              key={card.card_title}
              className={`${backgroundClass} ${
                card.background_color === "black" ? "text-white" : "text-black"
              } py-58 px-6 md:rounded-lg lg:m-1`}
              style={backgroundStyle}
            >
              <h2 className="text-[36px] md:text-[52px] text-center font-medium mb-2">
                {card.card_title}
              </h2>
              <p className="text-[20px] md:text-[30px] text-center font-[200] mb-6">
                {card.card_text}
              </p>
              <div className="flex justify-center gap-4">
                {card.buttons?.map((button) => {
                  const url = button.button_url || "#";
                  return (
                    <Button
                      key={button.button_text}
                      variant={button.button_variant}
                      size="lg"
                    >
                      <Link href={url}>{button.button_text}</Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
