import type { ButtonType } from "@/types/buttonVariants";
import { Button } from "../ui/button";
import Link from "next/link";
import parse from "html-react-parser";

export default function Statement(props: {
  title?: string;
  text?: string;
  button?: ButtonType;
}) {
  const { title, text, button } = props;
  return (
    <div
      className="w-full py-20 md:py-35"
      style={{
        backgroundColor: "#1F1F24",
        backgroundImage:
          "linear-gradient(135deg, rgba(120,120,130,0.35) 0%, rgba(60,60,70,0.85) 55%, rgba(15,15,18,0.95) 100%), radial-gradient(120% 120% at 16% 16%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 55%), radial-gradient(150% 150% at 98% 105%, rgba(10,10,12,0.6) 0%, rgba(10,10,12,0) 70%)",
      }}
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1640px] px-4 mx-auto">
        <div
          className="flex flex-col gap-6 md:gap-8 rounded-[30px] md:rounded-[36px] px-6 py-18 md:px-16 md:py-16 text-white shadow-[0px_38px_66px_-10px_rgba(0,0,0,0.8)] md:shadow-[0px_60px_140px_-50px_rgba(0,0,0,0.75)]"
          style={{
            backgroundColor: "#101014",
            backgroundImage:
              "radial-gradient(130% 110% at 30% 42%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 70%), conic-gradient(from 90deg at 50% 100%, #101014 0deg, #101014 140deg, #3F3F48 280deg, #2A2A33 340deg, #191921 360deg)",
          }}
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-[52px] md:text-[52px] text-center md:text-left font-light leading-14">
              {parse(title ?? "")}
            </h2>
          </div>
          <div className="md:flex md:justify-between md:items-end">
            <div className="text-[20px] md:text-[24px] font-[100] leading-relaxed md:leading-tight md:pr-20">
              {parse(text ?? "")}
            </div>
            <div className="flex justify-center items-center md:justify-start mt-8 md:mb-8">
              {button?.button_text && (
                <Button variant={button.button_variant ?? "primary"} size="lg">
                  <Link href={button.button_url ?? ""}>
                    {button.button_text}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
