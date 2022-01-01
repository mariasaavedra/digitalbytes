interface TagProps {
  label: string;
}

export default function Tags(props: TagProps) {
  return (
    <span className="bg-blue-400 rounded mr-2 p-1 text-sm">{props.label}</span>
  );
}
