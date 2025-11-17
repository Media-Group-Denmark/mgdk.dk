import Image from "next/image";
import LiquidGlass from "./LiquidGlass";
import Link from "next/link";

export default function ContactCard({
  name,
  title,
  phone_number,
  mail,
  image,
}: {
  name?: string;
  title?: string;
  phone_number?: string;
  mail?: string;
  image?: string;
}) {
  return (
    <div className="absolute bottom-10 right-10 hidden md:block">
      <LiquidGlass className="flex items-center gap-4 pr-30">
        <Image
          src={image ?? "/img-placeholder.png"}
          alt="Avatar"
          width={100}
          height={100}
          className="w-30 h-30 object-cover"
        />
        <div>
          <h2 className="text-white text-[16px] font-normal mb-2">{name}</h2>
          <p className="text-[#ACACAC] text-sm mb-1 font-medium">{title}</p>
          <p className="text-white text-sm mb-1 font-medium">{phone_number}</p>
          <Link
            href={`mailto:${mail}`}
            className="text-white text-sm mb-1 font-medium"
          >
            {mail}
          </Link>
        </div>
      </LiquidGlass>
    </div>
  );
}
