import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/components/Article.module.scss";
import Drawer from "./Drawer.component";
import Modal from "./Modal.component";
import Tag from "./Tag.component";

interface CategoryAttributes {
  name: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  attributes: CategoryAttributes
}

interface ArticleProps {
  id: number;
  isAdmin: boolean;
  cover_url?: string;
  url?: string;
  title?: string;
  content?: string;
  categories: Array<Category>;
  refetch?: Function;
}

export default function Article(props: ArticleProps) {
  const url = "http://api.digitalbytes.com:1337/api";
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  console.log("tags!", props.categories)

  const handleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
    try {
      axios.delete(`${url}/articles/${props.id}`).then(() => {
        if (props.refetch) {
          props.refetch();
          toast.success("Deleted successfully", {
            position: "bottom-right",
            theme: "light",
          });
        }
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
     {showDrawer && (
        <Drawer isOpen={showDrawer} handleClose={() => setShowDrawer(false)}>
        <>
          <h1 className="font-medium text-3xl">{props.title} </h1>
          <p className="mt-2 leading-relaxed">{props.content}</p>
        </>
      </Drawer>
     )}

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
            <i onClick={() => setShowDrawer(true)} className="fas fa-pen text-black"></i>
            <i
              onClick={() => setShowDeleteModal(true)}
              className="fa fa-trash text-black"
            ></i>
          </div>
        )}
        {Boolean(props.title) && (
          <div className={styles.meta}>
            <a href={`/articles/${props.id}`}>
              <h1 className="font-medium text-3xl">{props.title} </h1>
              <p className="mt-2 leading-relaxed">{description()}</p>
              <div className="pt-2 mt-2 pb-2">
                {props.categories.map((c) => {
                  return (<Tag key={c.id} label={c.attributes.name}></Tag>);
                })}
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
