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
    <div className="relative  h-full  flex justify-center items-center cursor-pointer group">
      <Link target="_blank" href={logo_url ?? ""}>
        <div className="relative h-full w-auto">
          <Image
            src={logo_image ?? ""}
            alt={logo_url ?? ""}
            width={300}
            height={200}
            className="h-auto w-auto max-h-[100px] max-w-[160px] object-contain filter grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          />
        </div>
      </Link>
    </div>
  );
}
