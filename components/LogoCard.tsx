import Image from "next/image";
import Link from "next/link";

export default function LogoCard({
  logo_image,
  logo_url,
}: {
  logo_image?: string;
  logo_url: string;
}) {
  return (
    <div className="relative w-full h-full flex justify-center items-center py-10 cursor-pointer group">
      <Link target="_blank" href={logo_url ?? ""}>
        <Image
          src={logo_image ?? ""}
          alt={logo_url ?? ""}
          width={160}
          height={160}
          className="filter grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      </Link>
    </div>
  );
}
