import { useState } from "react";
import "../styles/BookDetails.css";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { requireAuth, isAuthorized } from "../utils";
import { getBook, deleteBook } from "../api/bookApi";

export async function loader({ params }) {
  await requireAuth();
  return getBook(params.id);
}

function BookDetails() {
  const book = useLoaderData();
  const navigate = useNavigate();
  const isAdmin = isAuthorized();

  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    deleteBook(book.id)
      .then((data) => {
        navigate("/books", { replace: true });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="book-details-container">
      <button className="back-btn" onClick={() => navigate("/books")}>
        ← Back to Books
      </button>

      <h1 className="book-title">{book.title}</h1>
      <h3 className="book-author">by {book.author.name}</h3>

      <section className="book-meta">
        <p>
          <strong>Published:</strong>{" "}
          {new Date(book.bookDetails.publishedDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Total pages:</strong> {book.bookDetails.totalPages}
        </p>
      </section>

      <section className="book-description">
        <h4>Description</h4>
        <p>{book.bookDetails.description}</p>
      </section>

      <section className="book-genres">
        <h4>Genres</h4>
        <div className="genres">
          {book.genres.map((genre) => (
            <span key={genre.id} className="genre-badge">
              {genre.name}
            </span>
          ))}
        </div>
      </section>

      {isAdmin && (
        <div className="book-actions">
          <button
            className="edit-btn"
            onClick={() => navigate(`/books/${book.id}/edit`)}
          >
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
