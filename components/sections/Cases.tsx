import { getAllPosts } from "@/lib/wp-getPosts";
import type { PostCategory } from "@/types/sections";
import Image from "next/image";
import Link from "next/link";

export default async function Cases(props: {
  title?: string;
  category: PostCategory;
}) {
  const { title, category } = props;
  const posts = await getAllPosts(category, 3);

  return (
    <div className="w-full max-w-[1440px] 2xl:max-w-[1640px] mx-auto px-4">
      <h2 className="text-[44px] md:text-[52px] text-center font-medium mb-2 mt-20">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-2 py-10">
        {posts?.map((post, index) => {
          return (
            <Link
              key={post.id || index}
              href={
                post.categorySlug
                  ? `/${post.categorySlug}/${post.slug}`
                  : `/post/${post.slug}`
              }
              className="flex flex-col "
            >
              <Image
                src={post.image ?? "/img-placeholder.png"}
                alt={post.title?.rendered ?? ""}
                width={1000}
                height={800}
                className="w-full h-full object-cover rounded-lg bg-gray-100 aspect-square lg:aspect-auto lg:h-[400px]"
              />
              <h3 className="text-[24px] font-medium mb-2 mt-4">
                {post.title?.rendered}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
