import { getArticle, getArticles, Article } from "../_components";

const Page = async ({ params }: { params: { slug: string } }) => {
  const article = await getArticle(params.slug);
  return <Article article={article} />
};

export const generateStaticParams = async () => {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string },
}) => {
  const article = await getArticle(params.slug);
  return {
    title: `tuna2134 | ${article.title}`,
    description: article.description,
  }
}

export default Page;