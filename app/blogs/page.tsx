import { Article, getArticles } from "./_components";

const Page = async () => {
  const article = (await getArticles())[0];
  return <Article article={article} />;
};

export const generateMetadata = async () => {
  const article = (await getArticles())[0];
  return {
    title: article.title,
    description: article.description,
  };
};

export default Page;
