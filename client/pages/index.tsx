import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Bookmark from "../components/Bookmark.component";
import Article from "../components/Article.component";
import Header from "../components/Header.component";

interface Attributes {
  url: string;
  content?: string;
  description?: string;
  title?: string;
}
interface BookmarksResponse {
  attributes: Attributes;
}
interface ArticlesResponse {
  id: number;
  attributes: Attributes;
}

const Home: NextPage = () => {
  const url = "http://api.digitalbytes.com:1337/api";
  const [bookmarks, setBookmarks] = useState<Array<BookmarksResponse>>();
  const [articles, setArticles] = useState<Array<ArticlesResponse>>();

  useEffect(() => {
    axios.get(`${url}/bookmarks`).then((response) => {
      setBookmarks(response.data.data);
    });
    axios.get(`${url}/articles`).then((response) => {
      setArticles(response.data.data);
    });
  }, []);

  if (!bookmarks || !articles) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto">
        <Header/>
        <div className="mt-4 grid lg:grid-cols-3 sm:grid-cols-1 sm:gap-1 gap-4">
          {Boolean(bookmarks.length > 0) &&
            bookmarks.map((b, i) => {
              return (
                <Bookmark
                  key={i}
                  url={b.attributes.url}
                  title={b.attributes.title}
                  description={b.attributes.description}
                ></Bookmark>
              );
            })}

            {Boolean(articles.length > 0) &&
            articles.map((b, i) => {
              return (
                <Article
                  key={i}
                  id={b.id}
                  title={b.attributes.title}
                  content={b.attributes.content}
                ></Article>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default Home;
