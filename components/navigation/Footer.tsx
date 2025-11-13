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

export default function Footer({
  footerRow1,
  footerRow2,
}: {
  footerRow1: Item[];
  footerRow2: Item[];
}) {
  return (
    <footer className="hidden md:block relative z-10 bg-[#121213] font-inter text-white">
      <div className="mx-auto flex justify-between w-full max-w-[1440px]  gap-6 pt-14 pb-6 px-8">
        <div>
          <div className="flex text-[56px] font-black uppercase md:text-[64px] lg:text-[72px]">
            <Link href="/">MGDK</Link>
            <span className="text-primary">.</span>
          </div>

          <div className="py-12 grid w-full grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
            <div className="flex flex-col items-start gap-2 text-base text-white md:gap-3 md:text-lg lg:gap-4 lg:text-xl">
              <Link href="mailto:info@mgdk.dk" className="block">
                info@mgdk.dk
              </Link>
              <Link href="tel:+4533131313" className="block">
                +45 12 34 56 78
              </Link>
              <p className="font-medium border-b border-white/60 pb-1 mt-12">
                Horsensvej 72A, 7100 Vejle
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-start justify-end gap-14 md:gap-24 lg:gap-32 xl:gap-40">
            <FooterRow title="Nav Row 1" items={footerRow1} />
            <FooterRow title="Nav Row 2" items={footerRow2} />
          </div>
          <div className="flex flex-col items-start justify-center gap-4 mt-12 mb-12 ">
            <Link
              href="/media-kit"
              className="text-[19px] uppercase text-white/70 md:text-[20px] lg:text-[21px]"
            >
              Media kit
            </Link>
            <Button variant="outline-white" size="lg">
              <Link href="/" className="inline-flex w-full justify-center">
                Hent nu
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Separator className="w-full" />

      <div className="flex flex-row w-full max-w-[1440px] px-8 py-6 mx-auto items-center justify-between text-xs text-white md:text-sm lg:text-base">
        <p>© 2025 Media Group Denmark ApS. All rights reserved</p>
        <p>CVR nr.: 35809295</p>
      </div>
    </footer>
  );
}
