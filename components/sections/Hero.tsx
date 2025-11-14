import LiquidGlass from "@/components/LiquidGlass";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import ContactCard from "@/components/ContactCard";
import type { ButtonType } from "@/types/buttonVariants";
import parse from "html-react-parser";

export default function Hero(props: {
  title?: string;
  text?: string;
  image?: string;
  buttons?: ButtonType[];
}) {
  const { title, text, image, buttons = [] } = props;
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
      <div className="md:absolute md:top-0 md:left-0 flex justify-center items-center h-full px-10">
        <LiquidGlass className="w-full max-w-[700px] lg:py-15">
          <h1 className="text-white text-[20px] md:text-[24px] lg:text-[40px] font-normal mb-2">
            {parse(title ?? "")}
          </h1>
          <p className="text-[#C5C5C5] text-sm md:text-[15px] mb-4 font-medium">
            {text}
          </p>
          <Separator className="mb-4" />
          <div className="flex justify-center md:justify-start gap-4 mt-[38px] md:mt-6">
            {buttons.map((button) => (
              <Button
                variant={button.button_variant}
                size="md"
                key={button.button_text}
              >
                <Link href={button.button_url}>{button.button_text}</Link>
              </Button>
            ))}
          </div>
        </LiquidGlass>
      </div>
      <div className="absolute bottom-10 right-10 hidden md:block">
        <ContactCard />
      </div>
    </div>
  );
}
