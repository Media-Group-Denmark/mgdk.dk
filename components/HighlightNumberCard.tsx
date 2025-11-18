export default function HighlightNumberCard({
  number,
  title,
  text,
}: {
  number?: number;
  title: string;
  text: string;
}) {
  return (
    <div className="font-medium italic ">
      <p className="text-[92px] leading-[1]">{number}</p>
      <h3 className="text-[12px] uppercase my-3">{title}</h3>
      <p className="text-[12px] max-w-[200px]">{text}</p>
    </div>
  );
}
