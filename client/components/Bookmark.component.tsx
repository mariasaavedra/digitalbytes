import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/components/Bookmark.module.scss";
import Modal from "./Modal.component";
import Tag from "./Tag.component";
import { DebounceInput } from "react-debounce-input";

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
}

export default function Bookmark(props: BookmarkProps) {
  const url = "http://api.digitalbytes.com:1337/api";
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleUpdate = () => {
    try {
      axios
        .put(`${url}/bookmarks/${props.id}`, {
          data: {
            title,
            description,
          },
        })
        .then(() => {
          if (props.refetch) {
            props.refetch();
            toast.success("Successfully updated content", {
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
  const handleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
    try {
      axios.delete(`${url}/bookmarks/${props.id}`).then(() => {
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
    //handleUpdate();
  }, [showDeleteModal, title, description]);

  const getBookmarkPreview = () => {
    return props.cover_url
      ? `url(http://api.digitalbytes.com:1337${props.cover_url})`
      : `url('https://source.unsplash.com/random/300x300')`;
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
          background: getBookmarkPreview(),
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
              className="fa fa-times text-white"
            ></i>
          </div>
        )}

        {isEditMode && (
          <div className={styles.meta}>
            <div className="formGroup">
              <DebounceInput
                minLength={2}
                debounceTimeout={500}
                placeholder={props.title}
                value={title}
                style={{ width: "100%" }}
                className="bg-white block p-2 w-100 text-black font-medium text-sm"
                onChange={(event) => { setTitle(event.target.value), handleUpdate()}}
              />

              {/* <input
                id="title"
                type="text"
                style={{ width: "100%" }}
                placeholder={props.title}
                className="bg-white block p-2 w-100 text-black font-medium text-sm"
              /> */}

              <DebounceInput
                minLength={2}
                debounceTimeout={500}
                value={description}
                placeholder={props.description}
                style={{ width: "100%" }}
                className="mt-4 bg-white block p-2 w-100 text-black font-medium text-sm"
                onChange={(event) => { setDescription(event.target.value), handleUpdate()}}
              />
              {/* <textarea
                id="description"
                style={{ width: "100%" }}
                placeholder={props.description}
                className="mt-2 bg-white block p-2 w-100 text-black font-medium text-sm"
              /> */}
            </div>
            <div className="pt-2 pb-2">
              <Tag label="Business"></Tag>
            </div>
          </div>
        )}
        {!isEditMode && (
          <div className={styles.meta}>
            <a target="_blank" href={`${props.url}`}>
              <h1 className="font-medium text-3xl">{props.title} </h1>
              <p className="text-sm">{props.description}</p>
              <div className="pt-2 pb-2">
                <Tag label="Business"></Tag>
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
