import React        from 'react';
import Formsy       from 'formsy-react';

import DatePicker   from 'react-datepicker';
import moment       from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


const FormInputDate = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    getInitialState() {
        let date = this.props.date;

        return {
            date : date,
            readOnly: this.props.readOnly || false,
        };
    },


    changeDate(date) {
        this.setState({ date: date.format('YYYY-MM-DD') });
        console.log('CHANGE DATE = '+date.format('YYYY-MM-DD'));
        let dateTime = date.format('YYYY-MM-DD')  + ' 00:00:00';
        this.props.handleChange(
            dateTime,
            this.props.field,
            false
        );
    },

    componentWillReceiveProps(nextProps) {
        console.log ('New props = ' + nextProps.date);

        let date = nextProps.date;
        this.setState({
            date        : date,
            readOnly    : nextProps.readOnly,
        });
    },

    componentDidMount(){
        if(this.props.initialisationFunction){
            this.props.initialisationFunction(this.state.valueField);
        }
    },

    render() {
        console.log(this.state.date);
        const className = 'c-input' + (this.props.className || ' ') +
          (this.showRequired() ? 'required' : this.showError() ? 'has-error' : '');

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
        const pictoLocked =
            (this.props.locked) ?
                (
                    <div className="c-input__locked">
                        <svg className="icon-locked">
                           <use xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-locked"}/>
                        </svg>
                    </div>
                ) : "";

        // Display label
        const label = (this.props.title)
                        ? (<label htmlFor={this.props.name} className="c-label">{this.props.title}</label>)
                        : '';


        return (
            <div className="c-input-wrapper">
                {label}
                <div className="c-input__group">
                    <DatePicker selected={ this.state.date ? moment(this.state.date) : moment() } onChange={this.changeDate} dateFormat="YYYY-MM-DD" timeFormat={false} />
                </div>
                {errorMessage}
            </div>
        );
    }
});
export default (FormInputDate);
