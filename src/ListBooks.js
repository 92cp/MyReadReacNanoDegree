import React from 'react';
import PropTypes from 'prop-types';

class ListBooks extends React.Component{


    render() {
        const { listTitle } = this.props;

        return (
            <div className="bookshelf">
                 <h2 className="bookshelf-title">{listTitle}</h2>
            </div>
            );
    }
}


export default ListBooks;
