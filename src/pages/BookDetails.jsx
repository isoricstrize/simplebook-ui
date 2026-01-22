import { useState } from "react";
import "../styles/BookDetails.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { requireAuth } from "../utils";
import { getBook } from "../api";

export async function loader({ params }) {
  await requireAuth();
  return getBook(params.id);
}

function BookDetails() {
  const book = useLoaderData();
  console.log(book);
  const navigate = useNavigate();
  const isAdmin = true;

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
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
