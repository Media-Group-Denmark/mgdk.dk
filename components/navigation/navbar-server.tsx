import { wp } from "@/lib/wp-server";
import Navbar from "./Navbar";

type Item = {
  id: number;
  title: { rendered: string };
  url: string;
  parent: number;
  menu_order: number;
};

function toPublicPath(inputUrl: string): string {
  const match = inputUrl.match(/[^\/]+(?=\/?$)/);
  return match ? `/${match[0]}` : "/";
}

async function getMenu(): Promise<Item[]> {
  const loc = await wp("/wp/v2/menu-locations/primary?context=edit");
  const items: Item[] = await wp(
    `/wp/v2/menu-items?menus=${loc.menu}&per_page=100&_fields=id,title,url,parent,menu_order&context=edit`,
    { next: { revalidate: 60 } }
  );
  const normalized = items
    .map((i) => ({
      ...i,
      url: toPublicPath(i.url),
    }))
    .sort((a, b) => a.menu_order - b.menu_order);
  return normalized;
}

export default async function NavbarServer() {
  const items = await getMenu();
  return <Navbar items={items} />;
}
