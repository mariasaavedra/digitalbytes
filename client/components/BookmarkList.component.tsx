import axios from "axios";
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
  tags?: Array<string>;
}

interface Attributes {
  url: string;
  description?: string;
  cover_url?: string;
  content?: string;
  title?: string;
}
interface BookmarksResponse {
  id: number;
  attributes: Attributes;
}

export default function BookmarkList(props: BookmarkListProps) {
  const url = "http://api.digitalbytes.com:1337/api";
  const [bookmarks, setBookmarks] = useState<Array<BookmarksResponse>>([]);

  useEffect(() => {
    axios.get(`${url}/bookmarks`).then((response) => {
      console.log(response.data.data);
      setBookmarks(response.data.data);
    });
  }, []);

  if (!bookmarks) return null;
  
  return (
    <>
      {Boolean(bookmarks.length > 0) &&
        bookmarks.map((b, i) => {
          console.log(b);
          return (
            <Bookmark
              key={i}
              isAdmin={props.isAdmin}
              url={b.attributes.url}
              title={b.attributes.title}
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
