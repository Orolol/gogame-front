import React from 'react';
import Formsy from 'formsy-react';


const FormInputUrl = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],


    /**
    * getInitialState
    *   input: None
    *   ouput: None
    * React component method. You can see it as a constructor to initialize our state.
    */

    getInitialState() {
        let state =  this.updateURLParts(this.props.value);
        return state;
    },

    componentWillReceiveProps(nextProps) {
        this.setState( this.updateURLParts(nextProps.value) );
    },

    updateURLParts(value) {

        let protocols = [ 'http://', 'https://' ];
        console.log(value);

        let url     = '';
        let address = '';
        let protocolsChosen = protocols[0];
        let valueSelected = 0;
        let protocol;
        if(value) {
            url             = value;
            let urlParts    = url.split('://');
            address         = urlParts[1];
            protocol        = urlParts[0];
        }

        let protocolsOptions = [];
        for (let i = 0; i < protocols.length; i++) {
            if( protocol && protocols[i] === (protocol+'://') ) {
                valueSelected = i;
                protocolsChosen = protocols[i];
            }
            protocolsOptions.push( <option key={i} value={i} >{protocols[i]}</option> );
        }

        return {
            protocols: protocols,
            protocolsOptions
                    : protocolsOptions,


            protocolChosen
                    : protocolsChosen,
            address : address,
            url     : url,
            valueSelected
                    : valueSelected,
        }
    },

    /**
    * onChangeProtocol
    *   input: None
    *   ouput: None
    *
    * The method we call to re render component with the new protocol chosen.
    * The method will change value of url from formular (by concatening protocol and address)
    */
    onChangeProtocol(event) {
        let valueSelected = event.currentTarget.value;
        let protocol    = this.state.protocols[valueSelected];
        let url         = protocol + this.state.address;
        let validValue  = ( this.props.required && url === '' )
                            ? false :  this.isValidValue(url);

        console.log(url);
            // Update component attributes values by the one enter by user
        this.setState({ valueSelected: valueSelected, protocolChosen: protocol, url: url });

            // Call handleChange passed to update object field in parent
        this.props.handleChange(
            url,
            this.props.field,
            !validValue
        );
    },


    /**
    * onChangeAddress
    *   input: None
    *   ouput: None
    *
    * The method we call to re render component with the new address chosen.
    * The method will change value of url from formular (by concatening protocol and address)
    */
    onChangeAddress(event) {
        let address     = event.currentTarget.value;
        let url         = this.state.protocolChosen + address;
        let validValue  = ( this.props.required && url === '' )
                            ? false :  this.isValidValue(url);

        console.log(url);
            // Update component attributes values by the one enter by user
        this.setState({ url: url, address: address });

            // Call handleChange passed to update object field in parent
        this.props.handleChange(
            url,
            this.props.field,
            !validValue
        );
    },



    render() {
        const className = 'c-input c-input__url' + (this.props.className || ' ') +
          (this.showRequired() ? 'required' : this.showError() ? 'has-error' : '');


        let errorMessage = this.showRequired()
                            ? "This is required"
                            : (
                                this.getErrorMessage()
                                    ? this.getErrorMessage()
                                    : ""
                            );

        if ( errorMessage !== "" ) {
            errorMessage = (
                <span className='validation-error'>{errorMessage}</span>
            );
        }

        const pictoRequired = (
            <div className="c-input__required"></div>
        );

        const label = (this.props.title)
                        ? (<label htmlFor={this.props.name} className="c-label">{this.props.title}</label>)
                        : '';


        return (
            <div className="c-input-wrapper">
                {label}
                <div className="c-input__group">
                    <select className="c-select c-select__url"
                        value={this.state.valueSelected} onChange={this.onChangeProtocol}>
                        {this.state.protocolsOptions}
                    </select>
                    <input
                        className     = {className}
                        type          = {this.props.type || 'text'}
                        name          = {this.props.name}
                        onChange      = {this.onChangeAddress}
                        value         = {this.state.address}
                    />
                    {pictoRequired}

                    </div>
                {errorMessage}
            </div>
        );
    }


});


export default (FormInputUrl);
