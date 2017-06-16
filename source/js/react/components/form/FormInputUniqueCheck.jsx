import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import ValidationStore from '../../stores/ValidationStore';


const FormInputUniqueCheck = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    getInitialState() {
        return {
            isValid:        'waiting',
            value:          '',
            valueValidated: '',
            isTyping:       0,
        };
    },
    componentWillMount() {
        ValidationStore.addChangeListener(this.onValidationChange);
    },

    componentDidMount(){
        if (this.props.autofocus) ReactDOM.findDOMNode(this.refs.formInputUniqueCheck).focus();
    },

    componentWillUnmount() {
        ValidationStore.removeChangeListener(this.onValidationChange);
    },

    onValidationChange(){
        let data;
        data = ValidationStore.getResult(this.props.urlToCheckUnicity);

        this.setState({
            isValid: (this.getValue() && this.getValue() != "" && data == null) ? true : false,
        });
        this.props.handleChange(this.getValue() , this.props.field, !this.state.isValid );
    },

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
        this.setValue( event.currentTarget['value']);
        this.validateOnTimer(event.currentTarget['value']);
    },


    validateOnTimer(value){
        this.setState({
            isTyping: this.state.isTyping + 1,
        });

        var timer = setTimeout(function(){
            if(this.state.isTyping == 1 && this.state._value && this.state._value !== ''){
                this.validation(this.state._value);
            }

            this.setState({
                isTyping: this.state.isTyping - 1,
            });
        }.bind(this), 300);

    },

    delay(){
          var timer = 0;
          return function(callback, ms){
          clearTimeout (timer);
          timer = setTimeout(callback, ms);
         };
     },

    validate(){
        return this.state.isValid != 'waiting' ? this.state.isValid : true;
    },

    validation(value){
        this.setState({
            isValid: 'waiting',
        });

        let data = {};
        if(this.props.additionnalParamsToCheck) {
            data = this.props.additionnalParamsToCheck;
        }
        data[this.props.paramToCheck] = value;

        ValidationStore.getValidation(this.props.urlToCheckUnicity, data);
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

        // Display label
        const label = (this.props.title) ? (<label className="c-label" htmlFor={this.props.name}>{this.props.title}</label>) : '';

        return (
            <div className="c-input-wrapper">
                {label}
                <div className="c-input__group">
                    <input
                        className={className}
                        ref="formInputUniqueCheck"
                        type={this.props.type || 'text'}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChange={this.changeValue}
                        value={this.getValue()}
                        checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
                        required
                    />
                    <div className="c-input__required"></div>
                </div>
                {errorMessage}
            </div>
        );
    }
});
export default (FormInputUniqueCheck);
