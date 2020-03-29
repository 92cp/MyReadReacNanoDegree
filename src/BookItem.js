import React from "react";
import PropTypes from 'prop-types';
import DinamicSelect from "./DinamicSelect";

const TAG = "[ BOOK-ITEM ]: ";

const BookItem = props => {
    return (

        <li key={props.book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: "url(\'" + props.book.imageLinks.thumbnail +"\')" }}>
                    </div>
                    <DinamicSelect onSelectedElement={ (element) => (
                        props.onBookMoved({
                            section: element,
                            bookId: props.book.id
                        })
                    )} elements={props.optionElements} />
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors}</div>
            </div>
        </li>

    );
};

BookItem.propTypes = {
    book: PropTypes.object.isRequired,
    optionElements: PropTypes.array.isRequired,
    onBookMoved: PropTypes.func.isRequired
};

export default BookItem;
