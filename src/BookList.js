import React from 'react';
import PropTypes from 'prop-types';

class BookList extends React.Component{

    static propTypes = {
        listTitle: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
    };

    state = {
    };

    render() {
        const { listTitle, books } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{listTitle}</h2>
            </div>
        );
    }
}



export default BookList;
