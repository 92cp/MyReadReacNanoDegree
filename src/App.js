import React from 'react'

import './App.css'
import  BookList from './BookList'
import { Route } from 'react-router-dom'
import SearchPage from "./SearchPage";
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom'

const ListTitle = {
    currentlyReading: 'Currently Reading',
    wantReads: 'Want to Read',
    read: 'Read',
};

const TAG = "[ APP ]: ";

class BooksApp extends React.Component {
  state = {
      books: []
  };

  addBook = (book) => {
      console.log(TAG + "addBook");
  };

  /*componentDidMount() {
     ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts })
        })
  }*/
  fabClickHandler = () => {
      console.log(TAG + "fabClickHandler Fired!");
      this.props.history.push("/search");
  };
  render() {
    return (
        <div className="app">

            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <BookList listTitle={ListTitle.currentlyReading} books={this.state.books} />
                    <BookList listTitle={ListTitle.wantReads} books={this.state.books}/>
                    <BookList listTitle={ListTitle.read} books={this.state.books}/>
                    <div className="open-search">
                        <button onClick={this.fabClickHandler} />
                    </div>
                </div>
            )}/>

            <Route exact path='/search' render={({ history }) => (
                <SearchPage
                    onBookSelected={(selectedBook) => {
                        this.addBook(selectedBook);
                        history.push('/')
                    }}
                />
            )}/>

        </div>
    )
  }
}

export default withRouter(BooksApp)
