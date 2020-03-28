import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import  ListBooks from './ListBooks'

const ListTitle = {
    currentlyReading: 'Currently Reading',
    wantReads: 'Want to Read',
    read: 'Read',
};

const TAG = "[ APP ] :";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  fabButtonHandler = () => {
      console.log("Fab Button handler");
  };

  render() {
    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <ListBooks listTitle={ListTitle.currentlyReading}/>
                <ListBooks listTitle={ListTitle.wantReads}/>
                <ListBooks listTitle={ListTitle.read}/>
            </div>
            <div className="open-search">
                <button onClick={this.fabButtonHandler}>Add a book</button>
            </div>
        </div>
    )
  }
}

export default BooksApp
