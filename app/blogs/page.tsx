import { Article, getArticles } from "./_components";

const Page = async () => {
  const article = (await getArticles())[0];
  return <Article article={article} />
}

export default Page;