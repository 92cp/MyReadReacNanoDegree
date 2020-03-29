import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import BookItem from "./BookItem";

const TAG = "[ BOOK-LIST ]: ";
class BookList extends React.Component{

    static propTypes = {
        listTitle: PropTypes.string.isRequired,
        optionElements: PropTypes.array.isRequired,
        books:PropTypes.array.isRequired,
        onBookMoved:PropTypes.func.isRequired
    };

    componentDidMount() {

    }

    bookMovedHandler = (bookAsObject) => {
        console.log(TAG + "bookMovedHandler Fired!" + JSON.stringify(bookAsObject));
        this.props.onBookMoved(bookAsObject);
    };

    render() {
        const { listTitle, books, optionElements } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{listTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.length > 0 ?
                                books.map( b => (
                                    <BookItem book={b} optionElements={optionElements} onBookMoved={this.bookMovedHandler}/>
                                ))
                            :
                                ""
                        }
                    </ol>
                </div>
            </div>
        );
    }
}



export default BookList;
