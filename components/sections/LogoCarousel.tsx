"use client";

import LogoCard from "@/components/LogoCard";

type Logo = { logo_image?: string; logo_url?: string };

export default function LogoCarousel({ logos }: { logos: Logo[] }) {
  const loopLogos = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden bg-[#F2F2F4] pt-10">
      <div className="marquee flex gap-8 pb-15">
        {loopLogos.map((logo, idx) => (
          <div key={idx} className="relative w-56 h-10 shrink-0">
            <LogoCard
              logo_image={logo.logo_image}
              logo_url={logo.logo_url ?? ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
