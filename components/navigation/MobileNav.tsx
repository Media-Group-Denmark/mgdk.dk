import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cross as Hamburger } from "hamburger-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
type Item = {
  id: number;
  title: { rendered: string };
  url: string;
  parent: number;
  menu_order: number;
};

export default function MobileNav({
  items,
  slug,
  isOpen,
  setIsOpen,
}: {
  items: Item[];
  slug: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const pathname = usePathname();

  const modalVariants: Variants = {
    hidden: {
      scaleY: 0,
      transformOrigin: "top",
    },
    visible: {
      scaleY: 1,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.3,
      },
    },
  };

  const linkItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  };

  const navLinksVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <>
      <div className="block md:hidden ">
        <div className="z-[100] relative mr-[-12px]">
          <Hamburger
            toggled={isOpen}
            toggle={() => setIsOpen(!isOpen)}
            color="#fff"
            size={20}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-[#121213] z-[50] flex flex-col gap-4 top-[62px] p-8"
          >
            <motion.div
              variants={navLinksVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-4"
            >
              {items.map((item, index) => (
                <motion.div key={item.id} variants={linkItemVariants}>
                  <Link
                    href={slug[index]}
                    className={`text-white text-[44px] font-[900] uppercase ${
                      pathname === slug[index] ? "underline" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title.rendered}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
