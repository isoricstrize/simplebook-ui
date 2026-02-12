import { Link } from "react-router-dom";
import "../styles/BookNew.css";
import { Form, useLoaderData, useNavigate, redirect } from "react-router-dom";
import { requireAuth, isAuthorized } from "../utils";
import { getAuthorsGenres, getBook, updateBook } from "../api/bookApi";

export async function loader({ params }) {
  await requireAuth();
  if (!isAuthorized()) throw redirect("/");

  // Run both API calls in parallel
  const [book, meta] = await Promise.all([
    getBook(params.id),
    getAuthorsGenres(),
  ]);

  // Return everything in one object
  return {
    book,
    authors: meta.authors,
    genres: meta.genres,
  };
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const title = formData.get("title");
  const authorId = Number(formData.get("author"));
  const description = formData.get("description");

  const date = formData.get("publishedDate");
  const publishedDate =
    Number(date) === 0 ? null : new Date(date).toISOString();

  const totalPages = Number(formData.get("totalPages"));

  const genresIds = formData.getAll("genresIds");
  const genres = genresIds.map((id) => ({ id: Number(id), name: "" }));
  const name = "";
  const id = authorId;

  try {
    const data = await updateBook(
      {
        title,
        bookDetails: { description, publishedDate, totalPages },
        authorId,
        author: { id, name },
        genres,
      },
      params.id
    );
    return redirect(`/books/${params.id}`);
  } catch (err) {
    return err;
  }
}

function BookEdit() {
  const { book, authors, genres } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="new-book-container">
      <button
        className="back-btn"
        onClick={() => navigate(`/books/${book.id}`)}
      >
        ← Back to Details
      </button>
      <h2>Edit: {book.title} Book</h2>

      <Form method="post" className="book-form">
        <input
          name="title"
          type="text"
          placeholder="Book title"
          defaultValue={book.title}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          defaultValue={book.bookDetails.description}
        />

        <input
          name="publishedDate"
          type="date"
          defaultValue={
            book.bookDetails.publishedDate
              ? book.bookDetails.publishedDate.split("T")[0]
              : ""
          }
        />

        <input
          name="totalPages"
          type="number"
          placeholder="Total pages"
          min="1"
          defaultValue={book.bookDetails.totalPages}
        />

        {/* Author */}
        <select name="author" defaultValue={book.author.id} required>
          <option value="">Select author</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        {/* Genres */}
        <fieldset className="genres">
          <legend>Genres</legend>

          {genres.map((g) => (
            <label key={g.id}>
              <input
                type="checkbox"
                name="genresIds"
                value={g.id}
                defaultChecked={book.genres.some((bg) => bg.id === g.id)}
              />
              {g.name}
            </label>
          ))}
        </fieldset>

        <button className="edit" type="submit">
          Save Changes
        </button>
      </Form>
    </div>
  );
}

export default BookEdit;
