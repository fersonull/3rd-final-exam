import { useParams } from "react-router-dom";

export default function TestParam() {
  const { pid } = useParams();
  console.log(pid);

  return (
    <>
      <p>Check params</p>
    </>
  );
}
