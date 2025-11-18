import Image from "next/image";
export default function ImageSection(props: { image?: string }) {
  const { image } = props;
  return (
    <div>
      <Image
        src={image ?? ""}
        alt="Image"
        width={1440}
        height={900}
        className="w-full h-[400px] md:h-[550px] object-cover"
      />
    </div>
  );
}
