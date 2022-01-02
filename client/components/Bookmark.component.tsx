import styles from "../styles/components/Bookmark.module.scss";
import Tag from "./Tag.component";

interface BookmarkProps {
  isAdmin: boolean;
  cover_url?: string;
  url?: string;
  title?: string;
  description?: string;
  tags?: Array<string>;
}

export default function Bookmark(props: BookmarkProps) {
  const getPreviewFromUrl = () => {};
  const getBookmarkPreview = () => {
    return props.cover_url
      ? `url(${props.cover_url})`
      : `url('https://source.unsplash.com/random/300x300')`;
  };
  return (
    <div
      className={styles.BookmarkComponent + " rounded-lg"}
      style={{
        height: "300px",
        background: getBookmarkPreview(),
        backgroundSize: "cover",
      }}
    >
      {props.isAdmin && (
        <div className={styles.admin}>
          <i className="fas fa-pen text-white"></i>
          <i className="fa fa-times text-white"></i>
        </div>
      )}
      {Boolean(props.title) && (
        <div className={styles.meta}>
          <a href={`${props.url}`}>
            <h1 className="font-medium text-3xl">{props.title} </h1>
            <p className="text-lg">{props.description}</p>
            <div className="pt-2 pb-2">
              <Tag label="Business"></Tag>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
Bookmark.defaultProps = {
  isAdmin: false,
};
