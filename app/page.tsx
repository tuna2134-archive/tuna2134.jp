import Image from "next/image";
import { getArticles } from "./blogs/_components";

const workLists = [
  {
    title: "dextbird",
    description:
      "dextbirdはdiscord.pyの音声拡張ライブラリです。主にパフォーマンスを向上させたいときに使います(たぶん)",
    url: "http://github.com/tuna2134/discord-ext-songbird",
    image: "/no-image.png",
  },
  {
    title: "voicevox-client",
    description:
      "voicevox-clientはVoiceVoxのAPIををPythonで使いやすくしました。現在書き直し中",
    url: "https://github.com/voicevox-client/python",
    image: "/no-image.png",
  },
  {
    title: "清夏",
    description:
      "清夏はPythonで書いた、メッセージ専門のdiscord botです。いろいろな機能があります。",
    url: "https://sayaka.tuan2134.dev",
    image: "/sayaka-icons.png",
  },
  {
    title: "chromium-docker",
    description: "chromium-dockerはDocker上でchromiumを動かせます。",
    url: "https://github.com/tuna2134/chromium-docker",
    image: "/no-image.png",
  },
  {
    title: "jincms",
    description:
      "microCMSがマークダウン使えなかったので、たてたプロジェクトです(未完成)",
    url: "https://jincms.tuna2134.dev",
    image: "/no-image.png",
  },
];

export default async function Home() {
  const articles = (await getArticles()).slice(0, 6);
  return (
    <div>
      <div className="h-96 flex items-center border-b bg-black text-white">
        <div className="w-full max-w-2xl md:max-w-4xl xl:max-w-6xl mx-auto px-4">
          <h1 className="text-bold text-4xl">tuna2134</h1>
          <p>tuna2134です。最近アニメにはまっている人です</p>
        </div>
      </div>
      <main className="w-full max-w-2xl md:max-w-4xl xl:max-w-6xl mx-auto px-4">
        <div className="py-6">
          <h2 className="text-2xl font-bold underline">Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {workLists.map((work, index) => (
              <div
                className="flex items-center p-4 border rounded-2xl w-full"
                key={index}
              >
                <div className="w-3/4">
                  <h3 className="text-xl font-bold">{work.title}</h3>
                  <p>{work.description}</p>
                </div>
                <div className="ml-auto">
                  <a href={work.url} className="ml-auto">
                    <Image
                      src={work.image}
                      alt="github"
                      width={100}
                      height={100}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-6">
          <h2 className="text-2xl font-bold underline">Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {articles.map((article, index) => (
              <div
                className="flex items-center p-4 border rounded-2xl w-full"
                key={index}
              >
                <div className="w-3/4">
                  <h3 className="text-xl font-bold">{article.title}</h3>
                  <p>{article.description}</p>
                </div>
                <div className="ml-auto">
                  <a href={`/blogs/${article.slug}`} className="ml-auto">
                    <Image
                      src="/no-image.png"
                      alt="github"
                      width={100}
                      height={100}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
