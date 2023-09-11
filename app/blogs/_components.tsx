import { promises as fs } from "fs";
import matter from "gray-matter";
import markdownToHtml from 'zenn-markdown-html';

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