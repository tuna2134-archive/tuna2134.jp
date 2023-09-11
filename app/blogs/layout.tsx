import { getArticles, Article } from "./_components";
import Link from "next/link";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const articles = await getArticles();
  return (
    <div className="flex h-screen max-w-6xl my-10 mx-auto border-x-0">
      <div className="w-1/4 overflow-y-auto">
        <h2 className="py-2 text-2xl text-center w-full font-bold">記事一覧</h2>
        <div>
          {articles.map((article: Article, index: number) => (
            <div key={index} className="p-4">
              <Link
                className="flex items-center"
                href={`/blogs/${article.slug}`}
              >
                <p className="text-sm text-gray-900 hover:text-violet-500">
                  {article.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
