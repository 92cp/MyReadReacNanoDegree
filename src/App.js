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
        booksReferences: [],
        currentlyReadingBooks:[],
        wantToReadBooks:[],
        readBooks: []
    };

    addBook = (book) => {
        console.log(TAG + "addBook" + JSON.stringify(book));
        this.setState( prevState => ({
            booksReferences: [...prevState.booksReferences, book ]
        }));

        BooksAPI.get(book.bookId).then( b => {
           console.log(TAG + "Book from ID: " + JSON.stringify(b));
           if (b !== undefined){
                this.addBookInCorrectShelf(b, book.section);
                BooksAPI.update(b, book.section).then( result => {
                    console.log(TAG + "Book update successfully!");
                })
           }
        });


    };

    addBookInCorrectShelf = (book, shelfDestination) => {
        switch (shelfDestination) {
            case  options[0].value:
                this.setState(prevState => ({
                    currentlyReadingBooks: prevState.currentlyReadingBooks.concat(book)
                }));

                break;
            case options[1].value:
                this.setState(prevState => ({
                    wantToReadBooks: prevState.wantToReadBooks.concat(book)
                }));

                break;
            case options[2].value:
                this.setState(prevState => ({
                    readBooks: prevState.readBooks.concat(book)
                }));
                break;
            case options[3].value:
                console.log(TAG + " section is \"None\"....no action required!");
                break;
        }
    };

    componentDidMount() {
        BooksAPI.update("", options[0].value).then(books => {
            Object.keys(books).forEach( (key) => {
                books[key].forEach(entry => {
                    BooksAPI.get(entry).then( result => {
                        //console.log(TAG + "key is: " + key +"result " + JSON.stringify(result));
                        this.addBookInCorrectShelf( result, key);
                    })
                });
            });
        })


    }

    fabClickHandler = () => {
        console.log(TAG + "fabClickHandler Fired!");
        this.props.history.push("/search");
    };

    bookMovedHandler = (book) => {
        console.log(TAG + "handler moved on App.js fired!");

        /*this.setState( prevState => ({
            currentlyReadingBooks: prevState.currentlyReading !== undefined ? prevState.currentlyReading.filter( item => item.id !== book.id) : [],
            wantToReadBooks: prevState.wantToReadBooks !== undefined ? prevState.wantToReadBooks.filter( item => item.id !== book.id) : [],
            readBooks:prevState.readBooks !== undefined ? prevState.readBooks.filter( item => item.id !== book.id) : []
        }));

        BooksAPI.get(book.bookId).then( b => {
            console.log(TAG + "Book from ID: " + JSON.stringify(b));
            if (b !== undefined){
                this.addBookInCorrectShelf(b, book.section);
            }
        });*/
    };

    render() {
        return (
            <div className="app">

                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <BookList
                            listTitle={ListTitle.currentlyReading}
                            books={this.state.currentlyReadingBooks}
                            optionElements={options}
                            onBookMoved={this.bookMovedHandler}/>
                        <BookList
                            listTitle={ListTitle.wantReads}
                            books={this.state.wantToReadBooks}
                            optionElements={options}
                            onBookMoved={this.bookMovedHandler}/>
                        <BookList
                            listTitle={ListTitle.read}
                            books={this.state.readBooks}
                            optionElements={options}
                            onBookMoved={this.bookMovedHandler}/>
                        <div className="open-search">
                            <button onClick={this.fabClickHandler} />
                        </div>
                    </div>
                )}/>

                <Route exact path='/search' render={({ history }) => (
                    <SearchPage
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
