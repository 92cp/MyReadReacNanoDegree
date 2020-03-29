import React from "react";
import PropTypes from 'prop-types';
import DinamicSelect from "./DinamicSelect";

const TAG = "[ BOOK-ITEM ]: ";

const BookItem = props => {
    let bacgroundImage = props.book.imageLinks !== undefined ? props.book.imageLinks.thumbnail : "https://i.pinimg.com/236x/c1/a9/35/c1a9352469f464ac420cc8a8078a4795.jpg";
    return (

        <li >
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: "url(\'" + bacgroundImage +"\')" }}>
                    </div>
                    <DinamicSelect
                        onSelectedElement={ (element) => (
                            props.onBookMoved({
                                section: element,
                                bookId: props.book.id
                            })
                        )}
                        elements={props.optionElements}
                        shelf={props.book.shelf}
                    />
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
