import { getMenu } from "@/lib/getMenu";
import FooterMobile from "./FooterMobile";
import Footer from "./Footer";

export default async function FooterServer() {
  const footerRow1 = await getMenu("footer-row-1");
  const footerRow2 = await getMenu("footer-row-2");
  return (
    <>
      <FooterMobile footerRow1={footerRow1} footerRow2={footerRow2} />
      <Footer footerRow1={footerRow1} footerRow2={footerRow2} />
    </>
  );
}
