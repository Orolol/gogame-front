import React    from 'react';
import Formsy   from 'formsy-react';


const FormInputNumber = React.createClass({

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
        let value = event.currentTarget.value;
        let validValue = ( this.props.required && value === '' ) ? false :  true;
        this.setValue(value);

        this.props.handleChange(
            value,
            this.props.field,
            !validValue
        );
    },

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    },

    render() {
        const className = 'c-input' + (this.props.className || ' ');

        // Display a required icon
        const pictoRequired = (<div className="c-input__required"></div>);

        // Display a locker icon
        const pictoLocked = (this.props.locked)
            ? (
                <div className="c-input__locked">
                    <svg className="icon-locked">
                        <use xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-locked"}/>
                    </svg>
                </div>
              )
            : "";

        // Display label
        const label = (this.props.title) ? (<label htmlFor={this.props.name} className="c-label">{this.props.title}</label>) : '';


        return (
            <div className="c-input-wrapper">
                {label}
                <div className="c-input__group">
                    <input
                        className     = {className}
                        type          = {'number'}
                        name          = {this.props.name}
                        onChange      = {this.changeValue}
                        placeholder   = {this.props.placeholder}
                        value         = {this.props.value}
                        min           = {this.props.min}
                        max           = {this.props.max}
                    />
                    {pictoRequired}
                    {pictoLocked}
                </div>
            </div>
        );
    }
});
export default (FormInputNumber);
