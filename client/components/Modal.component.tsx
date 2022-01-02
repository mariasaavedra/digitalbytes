import styles from "../styles/components/Modal.module.scss";
import Button from "./Button.component";
interface ModalProps {
  handleClose?: Function;
  handleSave?: Function;
  children: string | JSX.Element | null;
}

export default function Modal(props: ModalProps) {
  const handleClose = () => {
    if(props.handleClose){
      props.handleClose();
    }
  }
  return (
    <>
    <div className={styles.ModalComponent + " bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"}>
        <div className={styles.dialog + " bg-white p-8 rounded-md text-center"}>
        <i onClick={handleClose} className={styles.close + " fa fa-times"}></i>
          <div className={"p-4"} >{props.children}</div>
          <Button priority="outline">Cancel</Button>
          <Button>Save</Button>
          </div>
        </div>
    </>
  );
}

Modal.defaultProps = {};
