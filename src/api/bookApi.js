import { apiFetch } from "./apiClient";

export function getBooks() {
  return apiFetch("/Book");
}

export function getBook(id) {
  return apiFetch(`/Book/${id}`);
}

export function addBook(book) {
  return apiFetch("/Book", {
    method: "POST",
    body: book
  });
}

export function deleteBook(id) {
  return apiFetch(`/Book/${id}`, {
    method: "DELETE"
  });
}

export function updateBook(book, id) {
  return apiFetch(`/Book/${id}`, {
    method: "PUT",
    body: book
  });
}

export async function getAuthorsGenres() {
    const books = await getBooks(); 
    const authorMap = new Map();
    const genreMap = new Map();

    books.forEach(book => {
        // authors
        if (book.author && !authorMap.has(book.author.id)) {
            authorMap.set(book.author.id, book.author);
        }

        // genres
        book.genres.forEach(genre => {
            if (!genreMap.has(genre.id)) {
                genreMap.set(genre.id, genre);
            }
        });
    });

    return {
        authors: Array.from(authorMap.values()),
        genres: Array.from(genreMap.values())
    };
}
