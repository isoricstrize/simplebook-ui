import "../styles/Home.css";
import { requireAuth } from "../utils";

export async function loader() {
  await requireAuth();
  return "This is ok.";
}

function Books() {
  return (
    <>
      <h1>This is Books page.</h1>
    </>
  );
}

export default Books;
