import "../styles/Books.css";
import { requireAuth } from "../utils";
import { getBooks } from "../api";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  await requireAuth();
  return await getBooks();
}

function Books() {
  const books = useLoaderData();

  const booksElements = books.map((book) => (
    <div key={book.id} className="book-row book-item">
      <p>{book.title}</p>
      <p>{book.author.name}</p>
    </div>
  ));

  return (
    <div className="books-container">
      <div className="book-row book-header">
        <span>Title</span>
        <span>Author</span>
      </div>
      {booksElements}
    </div>
  );
}

export default Books;
