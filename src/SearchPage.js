import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from "./BookList";
import BookItem from "./BookItem";

const TAG = "[ SEARCH-PAGE ]: ";

class SearchPage extends React.Component{

    static propTypes = {
        onBookSelected: PropTypes.func.isRequired
    };

    state = {
        booksFound: [],
        query: ''
    };

    inputChangeHandler = (event) => {
        const {  value } = event.target;
        this.setState( prevStat => ({
            query: value,
        }));

        BooksAPI.search(value).then( results => {
            if (results && results.length > 0 ){
                results.map( item => (
                    this.setState( prevState => ({
                        booksFound:[ ...prevState.booksFound, item]
                    }))
                ))
            } else {
                console.log(TAG + "0 results with query string");
                this.setState( prevState =>({
                    booksFound: []
                }))
            }

        });

    };

    render() {
        const { onBookSelected } = this.props;
        const { booksFound, query } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={this.inputChangeHandler} value={query} type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                {
                    //TODO: manage the case if bookFound is 0
                }
                {

                    (booksFound !== undefined && booksFound.length) > 0 ?
                        booksFound.map( bookItem => (
                            <BookItem book={ bookItem }/>
                        ))
                    :
                        ''
                }

            </div>
        );
    }


}


export default SearchPage;
