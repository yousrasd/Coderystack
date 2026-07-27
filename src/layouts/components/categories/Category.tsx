import { useTranslations } from "@/i18n/utils";
import Post, { type PostProps } from "../Post";

interface CategoryProps {
  category: string;
  posts: PostProps["post"][];
}
export default function Category({ category, posts }: CategoryProps) {
  const t = useTranslations("en");
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 md:px-12 md:py-20">
      <div className="border-b border-border-color pb-10 dark:border-border-color-dark">
        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
          Category
        </p>
        <h1 className="max-w-3xl text-5xl font-black leading-[1.02] text-text-heading dark:text-text-heading-dark md:text-6xl">
          {t("category.title")(category)}
        </h1>
        <p className="mt-5 text-lg text-text-body dark:text-text-body-dark">
          {posts.length} {posts.length === 1 ? "note" : "notes"} collected under{" "}
          <span className="font-semibold text-text-heading dark:text-text-heading-dark">
            {category}
          </span>
          .
        </p>
      </div>

      <div>
        {posts.map((p, index) => (
          <Post key={p.id} post={p as any} index={index + 1} />
        ))}
      </div>
    </section>
  );
}
