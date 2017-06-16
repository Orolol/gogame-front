import React            from 'react';
import ReactDOM         from 'react-dom';
import {translate}      from 'react-i18next';
import ListEditableList from './ListEditableList.jsx';

class ListEditableContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ListContainer">
                <ListEditableList
                    schema       = {this.props.schema}
                    readOnly     = {this.props.readOnly}
                    items        = {this.props.list}
                    createElements
                                 = {this.props.createElements}
                    onDelete     = {this.props.onDelete}
                />
            </div>
        );
    }

}

export default (ListEditableContainer);
