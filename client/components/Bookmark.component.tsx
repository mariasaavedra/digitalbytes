import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/components/Bookmark.module.scss";
import Modal from "./Modal.component";
import Tag from "./Tag.component";
import { DebounceInput } from "react-debounce-input";

interface CategoryAttributes {
  name: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  attributes: CategoryAttributes;
}

interface BookmarkProps {
  id: number;
  //isEditMode: boolean;
  isAdmin: boolean;
  cover_url?: string;
  url?: string;
  title?: string;
  description?: string;
  tags?: Array<string>;
  refetch?: Function;
  categories: Array<Category>;
  refetchById?: Function;
}

export default function Bookmark(props: BookmarkProps) {
  const BASE_URL = "http://api.digitalbytes.com:1337/api";
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [url, setUrl] = useState(props.url);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
    try {
      axios.delete(`${BASE_URL}/bookmarks/${props.id}`).then(() => {
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
    const id = props.id;
    try {
      axios
        .put(`${BASE_URL}/bookmarks/${id}/`, {
          data: {
            title,
            url,
            description,
          },
        })
        .then(() => {
          console.log("refetch by id", id);
          if (props.refetchById) props.refetchById(id);
        });
    } catch (e) {
      console.log(e);
    }

    if (showDeleteModal) {
      setTimeout(() => {
        setShowDeleteModal(!showDeleteModal);
      }, 10000);
    }
  }, [showDeleteModal, title, description]);

  const getBookmarkPreview = () => {
    return `url(http://api.digitalbytes.com:1337${props.cover_url})`;
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
        className={styles.BookmarkComponent + " rounded-lg"}
        style={{
          height: "300px",
          backgroundImage: getBookmarkPreview(),
          backgroundSize: "cover",
        }}
      >
        {props.isAdmin && (
          <div className={styles.admin}>
            <i
              onClick={() => setIsEditMode(!isEditMode)}
              className="fas fa-pen text-white"
            ></i>
            <i
              onClick={() => setShowDeleteModal(true)}
              className="fa fa-trash text-white"
            ></i>
          </div>
        )}

        {isEditMode && (
          <div className={styles.meta}>
            <div className="formGroup">
              <input
                id="title"
                type="text"
                style={{ width: "100%" }}
                placeholder={props.title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="mt-2 bg-white block p-2 w-100 text-black font-medium text-sm"
              />
            </div>
            <div className="formGroup">
              <input
                id="url"
                type="text"
                style={{ width: "100%" }}
                placeholder={props.url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                className="mt-2 bg-white block p-2 w-100 text-black font-medium text-sm"
              />
            </div>
            <div className="formGroup">
              <input
                id="description"
                type="text"
                style={{ width: "100%" }}
                placeholder={props.description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="mt-2 bg-white block p-2 w-100 text-black font-medium text-sm"
              />
            </div>
            <div className="pt-2 mt-2 pb-2">
              {props.categories?.map((c) => {
                return <Tag key={c.id} label={c.attributes.name}></Tag>;
              })}
            </div>
          </div>
        )}
        {!isEditMode && (
          <div className={styles.meta}>
            <a target="_blank" href={`${url}`}>
              <h1 className="font-medium text-3xl">{title} </h1>
              <p className="text-sm">{description}</p>

              <div className="pt-2 mt-2 pb-2">
                {props.categories?.map((c) => {
                  return <Tag key={c.id} label={c.attributes.name}></Tag>;
                })}
              </div>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
Bookmark.defaultProps = {
  isAdmin: false,
  isEditMode: false,
};
