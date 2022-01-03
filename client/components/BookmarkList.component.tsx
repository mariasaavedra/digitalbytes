import axios from "axios";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { useEffect, useState } from "react";
import styles from "../styles/components/Bookmark.module.scss";
import Bookmark from "./Bookmark.component";
import Tag from "./Tag.component";

interface BookmarkListProps {
  isAdmin: boolean;
  cover_url?: string;
  url?: string;
  title?: string;
  description?: string;
}

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

export default function BookmarkList(props: BookmarkListProps) {
  const url = "http://api.digitalbytes.com:1337/api";
  const [bookmarks, setBookmarks] = useState<Array<BookmarksResponse>>([]);
  
  const refetch = () => {
    axios.get(`${url}/bookmarks/?populate=*`).then((response) => {
      setBookmarks(response.data.data);
    });
  }
  
  const refetchById = (id: string | number) => {
    axios.get(`${url}/bookmarks/${id}`).then((response) => {
      console.log("from ID", response)
      // a singuar bookmark.
      const data = response.data.data;
      const bookmark  = bookmarks.find(b => b.id === id);
      if (bookmark) {
        bookmark.attributes = data.attributes;
      }
    });
  }

  useEffect(() => {
    axios.get(`${url}/bookmarks/?populate=*`).then((response) => {
      setBookmarks(response.data.data);
    });
  }, []);
  if (!bookmarks) return null;
  
  return (
    <>
      {Boolean(bookmarks.length > 0) &&
        bookmarks.map((b, i) => {
          return (
            <Bookmark
              key={i}
              refetch={refetch}
              refetchById={refetchById}
              id={b.id}
              isAdmin={props.isAdmin}
              url={b.attributes.url}
              title={b.attributes.title}
              categories={b.attributes.categories?.data}
              cover_url={b.attributes.cover_url}
              description={b.attributes.description}
            ></Bookmark>
          );
        })}
    </>
  );
}
BookmarkList.defaultProps = {
  isAdmin: false,
};
