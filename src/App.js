import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import  BookList from './BookList'
import { Route } from 'react-router-dom'
import SearchPage from "./SearchPage";
import {withRouter} from 'react-router-dom';

const ListTitle = {
    currentlyReading: 'Currently Reading',
    wantReads: 'Want to Read',
    read: 'Read',
};

const options = [
    { id:"currentlyReading", value:"currentlyReading", string:"Currently Reading"},
    { id:"wantToRead", value:"wantToRead", string:"Want to Read"},
    { id:"read", value:"read", string:"Read"},
    { id:"none", value:"none", string:"None"}
];

const TAG = "[ APP ]: ";

class BooksApp extends React.Component {

    state = {
        currentlyReading:[],
        wantToRead:[],
        read: []
    };

    addBook = (book) => {
        console.log(TAG + "addBook" + JSON.stringify(book));
        let shelf = book.section !== undefined ? book.section : book.shelf;
        let bookId = book.bookId !== undefined ? book.bookId : book.id;
        if (shelf !== options[3].id){
            BooksAPI.get(bookId).then( b => {
                console.log(TAG + "Book from ID: " + JSON.stringify(b));
                if (b !== undefined){
                    this.setState(prevStat =>({
                        [shelf]: prevStat[shelf].concat(b)
                    }));
                    BooksAPI.update(b, book.section).then( result => {
                        console.log(TAG + "Book update successfully!");
                    })
                }
            });
        }



    };

    componentDidMount() {
        BooksAPI.getAll().then((books) =>{
            books.map((item) => (
                this.addBook(item)
            ))
        });
    }

    fabClickHandler = () => {
        console.log(TAG + "fabClickHandler Fired!");
        this.props.history.push("/search");
    };

    bookMovedHandler = (book) => {
        console.log(TAG + "handler moved on App.js fired!");

        this.setState( prevState => ({
            currentlyReading: prevState.currentlyReading.filter( (item) => item.id !== book.bookId),
            wantToRead: prevState.wantToRead.filter( (item) => item.id !== book.bookId),
            read: prevState.read.filter( (item) => item.id !== book.bookId)
        }));

        BooksAPI.get(book.bookId).then( b => {
            console.log(TAG + "Book from ID: " + JSON.stringify(b));
            if (b !== undefined){

                BooksAPI.update(b, book.section).then(result => {
                    console.log(TAG + " database update successfully!");
                    b["shelf"] = book.section;
                    this.addBook(b);
                })
            }
        });
    };

    render() {
        const concat = (...arrays) => [].concat(...arrays.filter(Array.isArray));
        return (
            <div className="app">

                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <BookList
                            listTitle={ListTitle.currentlyReading}
                            books={this.state.currentlyReading}
                            optionElements={options}
                            onBookMoved={this.bookMovedHandler}/>
                        <BookList
                            listTitle={ListTitle.wantReads}
                            books={this.state.wantToRead}
                            optionElements={options}
                            onBookMoved={this.bookMovedHandler}/>
                        <BookList
                            listTitle={ListTitle.read}
                            books={this.state.read}
                            optionElements={options}
                            onBookMoved={this.bookMovedHandler}/>
                        <div className="open-search">
                            <button onClick={this.fabClickHandler} />
                        </div>
                    </div>
                )}/>

                <Route exact path='/search' render={({ history }) => (
                    <SearchPage
                        bookInShelf={concat(this.state.read, this.state.wantToRead, this.state.currentlyReading)}
                        optionElements={options}
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
