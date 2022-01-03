import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/components/Bookmark.module.scss";
import Article from "./Article.component";
import Bookmark from "./Bookmark.component";
import Tag from "./Tag.component";

interface CategoryAttributes {
  id: string | number;
  name: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface Category {
  data: Array<CategoryAttributes>
}

interface ArticleListProps {
  isAdmin: boolean;
  cover_url?: string;
  url?: string;
  title?: string;
  description?: string;
  categories: any;
}

interface Attributes {
  url: string;
  description?: string;
  cover_url?: string;
  content?: string;
  title?: string;
  categories: any;
}
interface BookmarksResponse {
  id: number;
  attributes: Attributes;
}

export default function ArticleList(props: ArticleListProps) {
  const url = "http://api.digitalbytes.com:1337/api";
  const [articles, setArticles] = useState<Array<BookmarksResponse>>([]);
  const refetch = () => {
    axios.get(`${url}/articles?populate=*`).then((response) => {
      setArticles(response.data.data);
    });
  }

  useEffect(() => {
    console.log("use effect?")
    axios.get(`${url}/articles?populate=*`).then((response) => {
      setArticles(response.data.data);
    });
  }, []);

  if (!articles) return null;
  
  return (
    <>
      {Boolean(articles.length > 0) &&
        articles.map((b, i) => {
          return (
            <Article
              key={i}
              refetch={refetch}
              id={b.id}
              isAdmin={props.isAdmin}
              url={b.attributes.url}
              title={b.attributes.title}
              content={b.attributes.description}
              categories={b.attributes.categories.data}
            ></Article>
          );
        })}
    </>
  );
}
ArticleList.defaultProps = {
  isAdmin: false,
};
