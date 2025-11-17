import { ButtonType } from "@/types/buttonVariants";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function TextAndImage(props: {
  title?: string;
  text?: string;
  buttons?: ButtonType[];
  image?: string;
}) {
  const { title, text, buttons, image } = props;
  return (
    <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-4 lg:gap-10 xl:gap-30 justify-center px-4 py-10">
      <Image
        className=" lg:hidden rounded-sm"
        src={image ?? ""}
        alt={title ?? ""}
        width={1000}
        height={1000}
      />
      <div>
        <h2 className="text-[32px] md:text-[52px] mt-10 font-extralight uppercase">
          {parse(title ?? "")}
        </h2>
        <div className="text-[18px] md:text-[18px] font-extralight mt-4">
          {parse(text ?? "")}
        </div>
        <div className="flex justify-center items-center lg:justify-end gap-4 mt-6">
          {buttons?.map((button, index) => (
            <Button
              key={index}
              variant={button.button_variant ?? "primary"}
              size="lg"
            >
              <Link href={button.button_url ?? ""}>{button.button_text}</Link>
            </Button>
          ))}
        </div>
      </div>
      <Image
        className="hidden lg:block w-[50%] object-contain"
        src={image ?? ""}
        alt={title ?? ""}
        width={1000}
        height={1000}
      />
    </div>
  );
}
