import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FooterRow } from "./FooterRow";

type Item = {
  id: number;
  title: { rendered: string };
  url: string;
  parent: number;
  menu_order: number;
};

export default function FooterMobile({
  footerRow1,
  footerRow2,
}: {
  footerRow1: Item[];
  footerRow2: Item[];
}) {
  return (
    <footer className="md:hidden relative z-10 bg-[#121213] font-inter text-white">
      <div className="mx-auto flex w-full max-w-[1440px] 2xl:max-w-[1640px] flex-col items-center gap-4  pt-14 pb-4 ">
        <div className="flex items-center text-[56px] font-black uppercase">
          <Link href="/">MGDK</Link>
          <span className="text-primary">.</span>
        </div>
        <div className="flex w-full items-center justify-center mt-4 gap-14 mb-8 md:mb-0">
          <FooterRow title="Nav Row 1" items={footerRow1} />
          <FooterRow title="Nav Row 2" items={footerRow2} />
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-2 text-base text-white">
          <Link href="mailto:info@mgdk.dk" className="block">
            info@mgdk.dk
          </Link>
          <Link href="tel:+4533131313" className="block">
            +45 33 13 13 13
          </Link>
          <p className="font-medium border-b-1 border-white/60 my-8">
            Horsensvej 72A, 7100 Vejle
          </p>
        </div>

        <Separator />
        <p className="text-xs text-white px-6">
          © 2025 Media Group Denmark ApS. All rights reserved
        </p>
        <Separator />
        <p className="text-xs text-white ">CVR nr.: 35809295</p>
      </div>
    </footer>
  );
}
