import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ContactFormular(props: { title?: string }) {
  const { title } = props;
  return (
    <div className="w-full max-w-[1440px] 2xl:max-w-[1640px] px-4 lg:px-8 mx-auto flex flex-col items-center py-15 mb-20">
      <h2 className="text-[36px] md:text-[52px] text-center font-medium mb-15 md:mb-10">
        {title}
      </h2>
      <div className="max-w-[400px] w-full flex flex-col gap-6 border-2 border-gray-200 rounded-lg p-6 ">
        <Input placeholder="Fornavn" />
        <Input placeholder="Email" />
        <Input placeholder="Telefon" />
        <Textarea placeholder="Beskrivelse" />
        <Button variant="primary" size="lg">
          Send
        </Button>
      </div>
    </div>
  );
}
