import { useRouter } from "next/router";

interface ButtonProps {
  url?: string;
  onClick?: Function;
  priority: "default" | "outline";
  children?: string | JSX.Element;
  type?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const router = useRouter();
  const hasCallback = () => {
    return (
      (!props.disabled && props.onClick !== null) ||
      (!props.disabled && props.url)
    );
  };

  const isUrlAbsolute = (url: string) =>
    url.indexOf("://") > 0 || url.indexOf("//") === 0;

  const goToUrl = () => {
    if (props.url) {
      if (isUrlAbsolute(props.url)) {
        window.open(props.url, "_blank");
      } else {
        router.push(props.url);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
     // if passed, execute callback.
    e.currentTarget.blur();
    if (props.type !== "submit") {
      if (props.onClick) {
        props.onClick(e); // if no callback was passed, go to url.
      } else if (props.url) {
        goToUrl();
      }
      e.preventDefault();
    }
  };

  return (
    <>
      {props.priority === "default" && (
        <button
          onClick={hasCallback() ? (e) => handleClick(e) : () => {}}
          className="mx-1 inline-block bg-neon border-2 border-solid  border-black hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded"
        >
          {props.children}
        </button>
      )}
      {props.priority === "outline" && (
        <button
          onClick={hasCallback() ? (e) => handleClick(e) : () => {}}
          className="mx-1 inline-block bg-transparent border-2 border-solid border-slate-800 text-black font-bold py-2 px-4 rounded"
        >
          {props.children}
        </button>
      )}
    </>
  );
}

Button.defaultProps = {
  priority: "default",
  type: "button",
};
