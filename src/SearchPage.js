import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookItem from "./BookItem";

const TAG = "[ SEARCH-PAGE ]: ";

class SearchPage extends React.Component{

    static propTypes = {
        onBookSelected: PropTypes.func.isRequired,
        optionElements: PropTypes.array.isRequired,
        bookInShelf: PropTypes.array.isRequired
    };

    state = {
        booksFound: [],
        query: ''
    };

    inputChangeHandler = (event) => {
        const mergeById = (a1, a2) =>
            a1.map(itm => ({
                ...a2.find((item) => (item.id === itm.id) && item),
                ...itm
        }));
        const {  value } = event.target;
        this.setState( prevStat => ({
            query: value,
            booksFound: []
        }));

        console.log(TAG + JSON.stringify(this.state.booksFound));

        BooksAPI.search(value).then( results => {
            if (results && results.length > 0 ){
                let parsedResult = mergeById(results, this.props.bookInShelf);
                this.setState( prevState => ({
                    booksFound: parsedResult
                }))
            } else {
                console.log(TAG + "0 results with query string");
            }

        });
    };

    bookMovedHandler = ( bookObjec ) => {
        console.log(TAG + "bookMovedHandler FIRED!" + JSON.stringify(bookObjec));
        this.props.onBookSelected(bookObjec);
    };

    render() {
        const { optionElements } = this.props;
        const { booksFound, query } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={this.inputChangeHandler} value={query} type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            (booksFound !== undefined && booksFound.length) > 0 ?
                                    booksFound.map( bookItem => (
                                             <BookItem
                                                 key={bookItem.id}
                                                 onBookMoved={this.bookMovedHandler}
                                                 book={ bookItem }
                                                 optionElements={optionElements}/>
                                    ))

                            :
                                ''
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;
