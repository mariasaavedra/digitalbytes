import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/components/Article.module.scss";
import Modal from "./Modal.component";
import Tag from "./Tag.component";

interface ArticleProps {
  id: number;
  isAdmin: boolean;
  cover_url?: string;
  url?: string;
  title?: string;
  content?: string;
  tags?: Array<string>;
  refetch?: Function;
}

export default function Article(props: ArticleProps) {
  const url = "http://api.digitalbytes.com:1337/api";
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
    try {
      axios.delete(`${url}/articles/${props.id}`).then(() => {
        if(props.refetch){
          props.refetch();
        };
        toast.success("Deleted successfully", {
          position: "bottom-right",
          theme: "light",
        });

      });
    } catch (e) {
      toast.error(e as string, {
        position: "bottom-right",
        theme: "light",
      });
    }



  };

  useEffect(() => {
    if (showDeleteModal) {
      setTimeout(() => {
        setShowDeleteModal(!showDeleteModal);
      }, 10000);
    }
  }, [showDeleteModal]);

  const description = () => {
    if (props.content) return props.content.substring(0, 100);
  };
  return (
    <>
      {showDeleteModal && (
        <Modal
          confirmLabel="Delete"
          handleConfirm={handleDelete}
          handleClose={() => setShowDeleteModal(!showDeleteModal)}
        >
          Are you sure you'd like to delete this?
        </Modal>
      )}
      <div
        className={styles.ArticleComponent + " rounded-lg"}
        style={{ height: "300px" }}
      >
        {props.isAdmin && (
          <div className={styles.admin}>
            <i className="fas fa-pen text-black"></i>
            <i  onClick={() => setShowDeleteModal(true)}  className="fa fa-times text-black"></i>
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
    </>
  );
}
Article.defaultProps = {
  isAdmin: false,
};
