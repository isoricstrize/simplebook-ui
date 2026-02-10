import { Link } from "react-router-dom";
import "../styles/BookNew.css";
import { Form, useLoaderData, useNavigate, redirect } from "react-router-dom";
import { requireAuth, isAuthorized } from "../utils";
import { getAuthorsGenres, addBook } from "../api/authApi";

export async function loader() {
  await requireAuth();
  if (!isAuthorized()) throw redirect("/");

  return await getAuthorsGenres();
}

export async function action({ request }) {
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

  /*console.log("title", title);
  console.log("author", authorId);
  console.log("genres", genres);
  console.log("publishedDate", publishedDate);
  console.log("totalPages", totalPages);
  console.log("description", description);*/

  try {
    const data = await addBook({
      title,
      bookDetails: { description, publishedDate, totalPages },
      authorId,
      author: { id, name },
      genres,
    });
    return redirect("/books");
  } catch (err) {
    return err;
  }
}

function BookNew() {
  const { authors, genres } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="new-book-container">
      <button className="back-btn" onClick={() => navigate("/books")}>
        ← Back to Books
      </button>
      <h2>Add New Book</h2>

      <Form method="post" className="book-form">
        <input name="title" type="text" placeholder="Book title" required />

        <textarea name="description" placeholder="Description" />

        <input name="publishedDate" type="date" />

        <input
          name="totalPages"
          type="number"
          placeholder="Total pages"
          min="1"
        />

        {/* Author */}
        <select name="author" required>
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
              <input type="checkbox" name="genresIds" value={g.id} />
              {g.name}
            </label>
          ))}
        </fieldset>

        <button type="submit">Add book</button>
      </Form>
    </div>
  );
}

export default BookNew;
