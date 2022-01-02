import styles from "../styles/components/Banner.module.scss";

interface BannerProps {
  label: string;
}

export default function Banner(props: BannerProps) {
  return (
    <span className={styles.BannerComponent + " bg-black text-white text-center mr-2 p-1 text-sm"}>{props.label}</span>
  );
}
