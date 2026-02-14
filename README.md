# Simple Book Library React UI

A React frontend for browsing and managing books, connected to a backend API ([SIMPLE BOOK WEB API](https://github.com/isoricstrize/SimpleBookWebApi.git)). Users can view books, while admins can add, edit or delete books.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![React Router](https://img.shields.io/badge/React_Router-7.12.0-red?logo=react-router)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-orange?logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-blue?logo=css3)
![Vite](https://img.shields.io/badge/Vite-7.2.4-lightgrey?logo=vite)

## Features

- Browse a list of books with their authors.
- View detailed information for each book including description, published date, genres, and total pages.
- Admin features: add, edit, and delete books.
- User authentication (login).
- User registration.

## Technologies Used

- React 19
- React Router DOM 7
- JavaScript (ES6+)
- HTML5 & CSS3
- Vite 7

## Future Improvements

- Add search, filtering, sorting, and pagination for books.
- Allow admins to create new authors instead of only choosing from existing authors.
- Improve security by moving tokens from localStorage to HttpOnly cookies.
- Improve UI.
- Add unit and integration tests.

## Screenshots

<details>
<summary>Show more</summary>

**Login Page**
![Login Page](./screenshots/login-page.png)

**Books List Page**
![Books List Page](./screenshots/books-page.png)

**Book Details Page**
![Book Details Page](./screenshots/book-details-page.png)

**Add New Book Page**
![Add New Book Page](./screenshots/add-new-book-page.png)

**Edit Book Page**
![Edit Book Page](./screenshots/edit-book-page.png)

**Profile Page**
![Profile Page](./screenshots/profile-page.png)

</details>

## Setup

### Run Locally

```
git clone https://github.com/isoricstrize/simplebook-ui.git
cd simplebook-ui
npm install
npm run dev
```

**Note:** Make sure your backend API is running on http://localhost:5041 (or update API_URL in apiClient.js). Backend repository: [SIMPLE BOOK WEB API](https://github.com/isoricstrize/SimpleBookWebApi.git)

### Admin Credentials

Use these credentials to test admin features:

```
Username: Admin
Password: Admin123
```

**Note:** These credentials are for demo/testing only.
