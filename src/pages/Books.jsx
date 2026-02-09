import "../styles/Books.css";
import { requireAuth } from "../utils";
import { getBooks } from "../api";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  await requireAuth();
  return await getBooks();
}

function Books() {
  const books = useLoaderData();
  const isAdmin = true; //localStorage.getItem("role") === "Admin";

  const booksElements = books.map((book) => (
    <Link key={book.id} to={`/books/${book.id}`} className="book-row book-item">
      <p>{book.title}</p>
      <p>{book.author.name}</p>
    </Link>
  ));

  return (
    <div className="books-container">
      <div className="books-header">
        <h2>Books</h2>

        {isAdmin && (
          <Link to="/books/new" className="add-book-btn">
            + Add Book
          </Link>
        )}
      </div>

      <div className="book-row book-header">
        <span>Title</span>
        <span>Author</span>
      </div>

      {booksElements}
    </div>
  );
}

export default Books;
