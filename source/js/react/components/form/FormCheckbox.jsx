import React    from 'react';
import Formsy   from 'formsy-react';


const FormCheckbox = React.createClass({

    getInitialState() {
        return { id: this.props.id, checked: this.props.checked };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({ checked: nextProps.checked });
    },

    changeValue(event) {
        let value = event.currentTarget.checked;
        this.setState({ checked: value });
        this.props.handleChange(
            value,
            this.props.field,
            false
        );
    },


    render() {
        const className = 'c-input';

        return (
            <div className="c-checkbox-wrapper">
                <input
                    id            = {this.props.id}
                    className     = {className}
                    type          = 'checkbox'
                    name          = {this.props.name}
                    onChange      = {this.changeValue}
                    placeholder   = {this.props.placeholder || ''}
                    checked       = {this.state.checked}
                />
                <label htmlFor={this.props.id} className="o-flex-block--rev c-checkbox-toggle c-label_inline">
                    <span className="c-label-automaticDate">{this.props.label}</span>
                    <span className="c-checkbox-toggle__handler"></span>
                </label>
            </div>
        );
    }
});
export default (FormCheckbox);
