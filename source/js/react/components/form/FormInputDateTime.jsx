import React from 'react';
import Formsy from 'formsy-react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


const FormInputDateTime = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    getInitialState() {
        let hours = [];
        for (var i = 0; i < 24; i++) {
            let val = (i < 10) ? '0'+i : i;
            hours.push( <option key={val} value={val} >{val}</option> );
        }
        let mins = [];
        for (var i = 0; i < 60; i++) {
            let val = (i < 10) ? '0'+i : i;
            mins.push( <option key={val} value={val} >{val}</option> );
        }

        let date, hour, min;
        if (!this.props.datetime) {
            date = this.props.date;
            hour = this.props.hour  ? this.props.hour   : '00';
            min  = this.props.min   ? this.props.min    : '00';
        } else {
            let dateSplitByDateTime = this.props.datetime.split(' ');
            let timeSplitByHourMin  = dateSplitByDateTime[1].split(':');

            date = dateSplitByDateTime[0];
            hour = timeSplitByHourMin[0];
            min  = timeSplitByHourMin[1];
        }

        console.log('INIT DATE = '+date);
        return {
            hours: hours,
            mins : mins,
            date : date,
            hour : hour,
            min  : min,
            readOnly: this.props.readOnly || false,
        };
    },


    changeDate(date) {
        this.setState({ date: date.format('YYYY-MM-DD') });
        console.log('CHANGE DATE = '+date.format('YYYY-MM-DD'));
        let dateTime = date.format('YYYY-MM-DD')  +' '+this.state.hour+':'+this.state.min+':00';
        this.props.handleChange(
            dateTime,
            this.props.field,
            false
        );
    },

    changeHour(event) {
        let value = event.currentTarget.value;
        this.setState({ hour: value });

        let dateTime = this.state.date.format('YYYY-MM-DD') +' '+value+':'+this.state.min+':00';
        this.props.handleChange(
            dateTime,
            this.props.field,
            false
        );
    },

    changeMin(event) {
        let value = event.currentTarget.value;
        this.setState({ min: value });

        let dateTime = this.state.date.format('YYYY-MM-DD') +' '+this.state.hour+':'+value+':00';
        this.props.handleChange(
            dateTime,
            this.props.field,
            false
        );
    },

    componentWillReceiveProps(nextProps) {
        console.log ('New props = ' + nextProps.date);

        let date, hour, min;
        if (!nextProps.datetime) {
            date = nextProps.date;
            hour = nextProps.hour  ? nextProps.hour   : '00';
            min  = nextProps.min   ? nextProps.min    : '00';
        } else {
            let dateSplitByDateTime = nextProps.datetime.split(' ');
            let timeSplitByHourMin  = dateSplitByDateTime[1].split(':');

            date = dateSplitByDateTime[0];
            hour = timeSplitByHourMin[0];
            min  = timeSplitByHourMin[1];
        }

        let dateTime =  {
            date        : date,
            hour        : hour,
            min         : min,
            readOnly    : nextProps.readOnly,
            
        };
        this.setState(dateTime);
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

        let inputHours = (
            <select disabled={this.state.readOnly} className='c-select c-input-inline c-date__hours' value={this.state.hour} onChange={this.changeHour}>
                {this.state.hours}
            </select>
        );

        let inputMins = (
            <select disabled={this.state.readOnly} className='c-select c-input-inline c-date__mins' value={this.state.min} onChange={this.changeMin}>
                {this.state.mins}
            </select>
        );

        return (
            <div className="c-input-wrapper">
                {label}
                <div className="c-input__group">
                    <DatePicker selected={ this.state.date ? moment(this.state.date) : moment() } onChange={this.changeDate} dateFormat="YYYY-MM-DD" timeFormat={false} />

                    <span className="text-at">at</span>
                    {inputHours}
                    {inputMins}
                </div>
                {errorMessage}
            </div>
        );
    }
});
export default (FormInputDateTime);
