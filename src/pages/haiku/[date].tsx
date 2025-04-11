// pages/haiku/[date].tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface Props {
  title: string;
  content: string;
  author: string;
  image_url: string;
  date: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { date } = context.params!;
  const res = await fetch(`http://127.0.0.1:8000/haiku/${date}`);
  const data = await res.json();

  return {
    props: {
      title: data.title || "Daily Haiku",
      content: Array.isArray(data.haiku) ? data.haiku.join(" / ") : data.haiku,
      author: data.author,
      image_url: data.image_url,
      date: date as string,
    },
  };
};

const DailyHaikuPage = ({ title, content, author, image_url, date }: Props) => {
  const fullTitle = `${title} – ${author}`;
  const url = `https://dailyhaiku.app/haiku/${date}`;

  return (
    <>
      <Head>
          <title>{fullTitle}</title>
          <meta name="description" content={content} />

          {/* Open Graph */}
          <meta property="og:title" content={fullTitle} />
          <meta property="og:description" content={content} />
          <meta property="og:image" content={image_url} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={url} />
          <meta property="og:site_name" content="Daily Haiku" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={fullTitle} />
          <meta name="twitter:description" content={content} />
          <meta name="twitter:image" content={image_url} />

          {/* Optional: favicon/meta */}
          <meta name="theme-color" content="#000000" />
        </Head>


      <main className="min-h-screen bg-black text-white flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-3xl mb-4">{title}</h1>
          <p className="text-xl italic text-gray-300 mb-2">{author}</p>
          <p className="text-lg text-gray-400">{content}</p>
          <img src={image_url} alt="Haiku image" className="mt-8 max-w-md mx-auto rounded-lg" />
        </div>
      </main>
    </>
  );
};

export default DailyHaikuPage;
