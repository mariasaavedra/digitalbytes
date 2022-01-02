import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../../components/Header.component";
import styles from "../../styles/Home.module.scss";

interface Attributes {
  content: string;
  createdAt: string;
  publishedAt: string;
  title: string;
  updatedAt: string;
}

interface ArticleResponse {
  id: number;
  attributes: Attributes;
}

const Article: NextPage = () => {
  const url = "http://api.digitalbytes.com:1337/api";
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<ArticleResponse>();
  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchArticle = async () => {
      axios.get(`${url}/articles/${id}`).then((response) => {
        setArticle(response.data.data);
      });
    };
    fetchArticle();
  }, [id]);

  return (
    <div className={styles.container}>
      <main className="container mx-auto">
        <Header/>
        <h1 className="mt-10 text-2xl">{article?.attributes.title}</h1>
        {article?.attributes.content}
      </main>
    </div>
  );
};

export default Article;
