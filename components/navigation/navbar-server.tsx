import { getMenu } from "@/lib/getMenu";
import { Navbar } from "./Navbar";

export default async function NavbarServer() {
  const items = await getMenu("primary");
  return <Navbar items={items} />;
}
