import Link from "next/link";

type Item = {
  id: number;
  title: { rendered: string };
  url: string;
  parent: number;
  menu_order: number;
};

export function FooterRow({ title, items }: { title: string; items: Item[] }) {
  const slugs = items.map((item) => item.url);

  return (
    <div className="space-y-4">
      <p className="text-[19px] font-normal uppercase text-white/60">{title}</p>
      <ul className="space-y-2 text-[19px] font-normal">
        {items.map((item, index) => (
          <li key={item.id}>
            <Link
              href={slugs[index]}
              className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {item.title.rendered}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
