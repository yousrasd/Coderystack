import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import Post, { type PostProps } from "../Post";

interface CategoryProps {
  category: string;
  posts: PostProps["post"][];
}
export default function Category({ category, posts }: CategoryProps) {
  const t = useTranslations("en");
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-12 py-10">
      <h1 className="text-3xl font-bold text-text-heading dark:text-text-heading-dark mb-10 text-center">
        {t("category.title")(category)}
      </h1>

      <div>
        {posts.map((p) => (
          <Post key={p.id} post={p as any} />
        ))}
      </div>
    </section>
  );
}
