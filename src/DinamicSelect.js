import React from 'react';
import PropTypes from 'prop-types';
const TAG = "[ DinamicSelect ]: ";
class DinamicSelect extends React.Component{

    static propTypes = {
        elements: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired,
        onSelectedElement: PropTypes.func.isRequired
    };


    valueChangeHandler = (event) => {
        console.log(TAG + "valueChangeHandler Fired!");
        this.props.onSelectedElement(event.target.value);
    };

    render() {
        const { elements, shelf} = this.props;
        let options = elements.map( (data) => (
            <option
                key={data.id}
                value={data.value}>
                {data.string}
            </option>
        ));
        let currentValue = shelf || 'none';
        return (
            <div className="book-shelf-changer">
                <select name="actions"  onChange={this.valueChangeHandler}  value={currentValue} >
                    <option key="move" value="move" disabled>Move to...</option>
                    {options}
                </select>
            </div>
        );
    }
}



export default DinamicSelect;
