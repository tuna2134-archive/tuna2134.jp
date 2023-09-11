import { getArticles, Article } from "./_components";
import Link from "next/link";
import React from "react";

const Layout = async ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const articles = await getArticles();
  const article = articles[0];
  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <h2 className="py-2 text-2xl text-center w-full border-b font-bold">記事一覧</h2>
        <div>
          {articles.map((article: Article) => (
            <div className="p-4 border-b">
              <Link href={`/blogs/${article.slug}`}>{article.title}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4">
        /*
        <div className="bg-black text-white p-auto">
          <div className="h-22 flex items-center p-4">
            <h2 className="text-4xl">{article.title}</h2>
            <p className="ml-auto">{article.date.toDateString()}</p>
          </div>
        </div>
        <div className="mx-6" dangerouslySetInnerHTML={{ __html: article.content }}></div>
        */
      </div>
    </div>
  )
};

export default Page;