// import styles from "../styles/components/EditSettingsForm.module.scss";
interface EditSettingsForm {}

export default function EditSettingsForm(props: EditSettingsForm) {
  return (
    <>
      <img src="https://placehold.co/400x200"></img>
      <form className="text-left">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="URL">
        URL
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="text" type="text"/>
    </div>
  </form>
    </>
  );
}

EditSettingsForm.defaultProps = {}