import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import Post, { type PostProps } from "../Post";

interface CategoryProps {
  category: string;
  posts: PostProps[];
}
export default function Category({ category, posts }: CategoryProps) {
  const t = useTranslations("en");
  return (
    <section className="container mx-auto py-10 px-5 md:px-12 xl:px-48">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl dark:text-white">
          {t("category.title")(category)}
        </h1>

        <div className="flex flex-wrap gap-8 text-neutral-600">
          {posts.map((p: PostProps) => (
            <div className="my-8 w-full max-w-xs rounded-lg shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:scale-105">
              {/* @ts-ignore */}
              <Post post={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
