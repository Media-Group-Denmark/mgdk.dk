import Image from "next/image";
import LiquidGlass from "./LiquidGlass";

export default function ContactCard() {
  return (
    <LiquidGlass className="flex items-center gap-4">
      <Image
        src="/avatar.png"
        alt="Avatar"
        width={100}
        height={100}
        className="w-10 h-10"
      />
      <div>
        <h2 className="text-white text-[20px] font-normal mb-2">Navn</h2>
        <p className="text-[#ACACAC] text-sm mb-1 font-medium">Title</p>
        <p className="text-white text-sm mb-1 font-medium">Email</p>
        <p className="text-white text-sm mb-1 font-medium">Telefon</p>
        <p className="text-white text-sm mb-1 font-medium">Mail</p>
      </div>
    </LiquidGlass>
  );
}
