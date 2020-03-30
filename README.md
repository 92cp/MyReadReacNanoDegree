# MyReads Project

The aim of this Web application is to realize a book shelf. The application allow you to find a book and to keep track the reading status.
The reading status are represented by three different shelves: currently reading, want to read, read.

In this application, the main page displays a list of shelves (i.e. categories), each of which contains a number of books.

Each book has a control that lets you select the shelf for that book. 
When you select a different shelf, the book moves there. 

When you click the floating button located on bottom-right you will be redirected to search page.
The search page has a text input which it should be used to find books. 
The books that match that your input are displayed on the this page, along with a control that lets you add the book to your library (main page)
## Installation

To run the application you have to follow this command in your preferred terminal

* install all project dependencies with `npm install`
* start the development server with `npm start`

and then go to http://localhost:3000/

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.
