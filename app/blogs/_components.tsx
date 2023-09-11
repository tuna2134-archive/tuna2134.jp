import { promises as fs } from "fs";
import matter from "gray-matter";
import markdownToHtml from 'zenn-markdown-html';
import React from "react"
import 'zenn-content-css';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: Date;
  content: string;
}

export async function getArticle(slug: string): Promise<Article> {
  const contentData = await fs.readFile(`./blogs/${slug}.md`, "utf8");
  const { data, content } = matter(contentData);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: new Date(data.date),
    content: markdownToHtml(content),
  }
}

export async function getArticles(): Promise<Article[]> {
  const slugs = await fs.readdir("./blogs");
  const articles = await Promise.all(slugs.map(async (slug) => {
    const data = await getArticle(slug.replace(".md", ""));
    return data;
  }))
  // 最新順にソート
  return articles.sort((a, b) => b.date.getTime() - a.date.getTime())
}

export const Article = async ({
  article,
}: {
  article: Article,
}) => {
  return (
    <article>
      <div className="bg-black text-white p-auto">
        <div className="h-22 flex items-center p-4">
          <h2 className="text-2xl">{article.title}</h2>
          <p className="ml-auto">{article.date.toDateString()}</p>
        </div>
      </div>
      <div className="mx-6 mt-4 znc prose prose-code:p-0 max-w-none" dangerouslySetInnerHTML={{ __html: article.content }}></div>
    </article>
  )
}