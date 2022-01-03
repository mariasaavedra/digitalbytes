import { useEffect } from "react";
import styles from "../styles/components/Drawer.module.scss";

interface DrawerProps {
  children: string | JSX.Element;
  isOpen: boolean;
  handleClose: Function;
}

export default function Drawer(props: DrawerProps) {
  useEffect(() => {
    // Anything in here is fired on component mount.
    document.documentElement.classList.add('drawer-open');
    document.body.classList.add('drawer-open');
    return () => {
        document.documentElement.classList.remove('drawer-open');
        document.body.classList.remove('drawer-open');
    }
})

  const handleClose = () => {
    if(props.handleClose){
      props.handleClose();
    }
  }
  return (
    <>
    {/* <div className={styles.DrawerComponent +  (props.isOpen === true ? styles.open : null)  + " bg-slate-900 bg-opacity-50 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 "}></div> */}
    {/* <div className={styles.drawer + " " +  (props.isOpen === true ? styles.open : null) +  +  "  p-10 shadow-xl bg-white"}>
      <i onClick={handleClose} className={styles.close + " fa fa-times"}></i>
      {props.children}
    </div> */}
    </>
  );
}
