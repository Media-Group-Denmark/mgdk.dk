import LiquidGlass from "@/components/LiquidGlass";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import ContactCard from "@/components/ContactCard";
import type { ButtonType } from "@/types/buttonVariants";
import parse from "html-react-parser";
import { getLinkPath } from "@/lib/utils";

export default function Hero(props: {
  title?: string;
  text?: string;
  image?: string;
  buttons?: ButtonType[];
  contact_card?: {
    name?: string;
    title?: string;
    phone_number?: string;
    mail?: string;
    image?: string;
  } | null;
}) {
  const { title, text, image, buttons = [], contact_card } = props;
  return (
    <div className="h-[60vh] md:h-[70vh] lg:h-[90vh] relative">
      <Image
        src={image ?? ""}
        alt={title ?? ""}
        width={1400}
        height={900}
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        priority
      />
      <div className="relative max-w-[1440px] 2xl:max-w-[1640px] h-full mx-auto">
        <div className="md:absolute md:top-0 md:left-0 flex justify-center items-center h-full px-4">
          <LiquidGlass className="w-full max-w-[800px] lg:py-20">
            <h1 className="text-white text-[24px] md:text-[30px] lg:text-[52px] font-extralight mb-2 leading-7 md:leading-15">
              {parse(title ?? "")}
            </h1>
            <p className="text-[#C5C5C5] text-sm md:text-[15px] lg:text-[18px] mb-4 font-normal">
              {text}
            </p>
            <Separator className="mb-4" />
            <div className="flex justify-center md:justify-start gap-4 mt-[30px] md:mt-6">
              {buttons.map((button) => (
                <Button
                  variant={button.button_variant}
                  size="md"
                  key={button.button_text}
                >
                  <Link
                    href={
                      button.button_url ? getLinkPath(button.button_url) : ""
                    }
                  >
                    {button.button_text}
                  </Link>
                </Button>
              ))}
            </div>
          </LiquidGlass>
        </div>
        {contact_card?.name && (
          <ContactCard
            name={contact_card.name}
            title={contact_card.title}
            phone_number={contact_card.phone_number}
            mail={contact_card.mail}
            image={contact_card.image}
          />
        )}
      </div>
    </div>
  );
}
