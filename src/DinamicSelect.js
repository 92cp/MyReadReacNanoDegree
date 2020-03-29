import React from 'react';
import PropTypes from 'prop-types';
const TAG = "[ DinamicSelect ]: ";
class DinamicSelect extends React.Component{

    static propTypes = {
        elements: PropTypes.array.isRequired,
    };

    state = {
    };

    valueChangeHandler = (event) => {
        console.log(TAG + "valueChangeHandler Fired!");
        this.props.onSelectedElement(event.target.value);
    };

    render() {
        const { elements } = this.props;
        let options = elements.map( (data) => (
            <option key={data.id} value={data.value}>
                {data.string}
            </option>
        ));
        return (
            <div className="book-shelf-changer" onChange={this.valueChangeHandler}>
                <select name="actions">
                    <option key="move" value="move" selected disabled>Move to...</option>
                    {options}
                </select>
            </div>
        );
    }
}



export default DinamicSelect;
