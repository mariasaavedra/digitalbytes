interface TagProps {
  label: string;
}

export default function Tag(props: TagProps) {
  return (
    <span className="bg-black rounded mr-2 p-1 text-sm">{props.label}</span>
  );
}
