import styles from "../styles/components/Article.module.scss";
import Tag from "./Tag.component";

interface ArticleProps {
  id: number;
  isAdmin: boolean;
  cover_url?: string;
  url?: string;
  title?: string;
  content?: string;
  tags?: Array<string>;
}

export default function Article(props: ArticleProps) {
  const description = () => {
    console.log(props.content || 'none')
    if(props.content)
    return props.content.substring(0, 100);
  }
  return (
    <div
      className={styles.ArticleComponent + " rounded-lg"}
      style={{ height: "300px"}}
    >
     {props.isAdmin && (
        <div className={styles.admin}>
        <i className="fas fa-pen text-black"></i>
        <i className="fa fa-times text-black"></i>
      </div>
     )}
      {Boolean(props.title) && (
        <div className={styles.meta}>
          <a href={`/articles/${props.id}`}>
            <h1 className="font-medium text-3xl">{props.title} </h1>
            <p className="mt-2 leading-relaxed">{description()}</p>
            <div className="pt-2 mt-2 pb-2">
              <Tag label="Article"></Tag>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
Article.defaultProps = {
  isAdmin: false,
};
