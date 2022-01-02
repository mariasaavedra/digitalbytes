import Dropzone from "react-dropzone";
import styles from "../styles/components/BookmarkForm.module.scss";
interface BookmarkForm {}

export default function BookmarkForm(props: BookmarkForm) {
  return (
    <>
      <div className={styles.placeholder}>
        <div>
          <Dropzone>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop a photo here, or click to select</p>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      <form className="w-full mt-4 mx-auto">
        <div className="flex items-center border-2 rounded border-black py-2">
          <input
            className="appearance-none bg-transparent block  border-none w-100 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Title"
            aria-label="Title"
          />
        </div>
        <div className="mt-4 flex items-center border-2 rounded border-black py-2">
        <input
            className="appearance-none bg-transparent block  border-none w-100 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="URL"
            aria-label="URL"
          />
        </div>
        <div className="mt-4 flex items-center border-2 rounded border-black py-2">
          <textarea
            className="appearance-none bg-transparent border-none block w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Description"
            aria-label="Description"
          />
        </div>
      </form>
    </>
  );
}

BookmarkForm.defaultProps = {};
