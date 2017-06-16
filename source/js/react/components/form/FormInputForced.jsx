import React from 'react';
import Formsy from 'formsy-react';


const FormInputForced = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  // Here we check if the value will be valid BEFORE set the value.
  // Meaning the field will only accept correct value.
  // Use carefully as it won't work with complex validator like email ou URL or
  // minimum length
  changeValue(event) {
    if(this.isValidValue(event.currentTarget.value)
    || event.currentTarget.value == ''
    || event.currentTarget.value == null){
      this.setValue(event.currentTarget.value);
      this.props.handleChange(
          value,
          this.props.field,
          !this.isValidValue(value)
      );
    }
  },
  render() {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = 'c-input' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'has-error' : '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = (this.getErrorMessage()) ?
      (<span className='validation-error'>{this.getErrorMessage()}</span>) :
      '';

    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          className={className}
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          placeholder={this.props.placeholder}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        {errorMessage}
      </div>
    );
  }
});
export default (FormInputForced);
