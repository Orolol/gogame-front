import React from 'react';
import Formsy from 'formsy-react';


const FormInputEmail = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    getInitialState() {
        let regexp_email
            = /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        let state = {
            regexp_email    : regexp_email,
            email           : this.props.value ||  '',
        }
        return state;
    },

    componentWillReceiveProps(nextProps) {
        this.setState({ email : nextProps.value || '' });
    },


    changeValue(event) {
        let newEmailValue = event.currentTarget.value.trim();

        let validValue = ( newEmailValue.length > 254 ) ? false : this.state.regexp_email.test(newEmailValue);


        this.props.handleChange(
            newEmailValue,
            this.props.field,
            !validValue
        );

    },
    render() {

        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid
        const className = 'c-input' + (this.props.className || ' ')
            + (this.showRequired()
                ? 'required'
                : this.showError() ? 'has-error' : ''
            );

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        let errorMessage = this.showRequired() ? "This is required" : (
            ( this.getErrorMessage() ) ? this.getErrorMessage() : ""
        );
        if ( errorMessage !== "" )
            errorMessage = (<span className='validation-error'>{errorMessage}</span>);

        // Display a required icon
        const pictoRequired = (<div className="c-input__required"></div>);

        // Display a locker icon
        const pictoLocked = this.props.locked
            ? (
                <div className="c-input__locked">
                    <svg className="icon-locked">
                       <use xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-locked"}/>
                    </svg>
                </div>
            ) : "";

        // Display label
        const label = this.props.title
            ? (<label htmlFor={this.props.name} className="c-label">{this.props.title}</label>)
            : '';


        return (
            <div className="c-input-wrapper">
                {label}
                <div className="c-input__group">
                    <input
                        className     = {className}
                        type          = 'email'
                        name          = {this.props.name}
                        onChange      = {this.changeValue}
                        placeholder   = {this.props.placeholder}
                        value         = {this.state.email}
                    />
                    {pictoRequired}
                    {pictoLocked}
                </div>
                {errorMessage}
            </div>
        );
    }
});
export default (FormInputEmail);
