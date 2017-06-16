import React            from 'react';
import ReactDOM         from 'react-dom';
import { translate }    from 'react-i18next';
import classNames       from 'classnames';


class SelectFromClientForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list        : this.props.list,
            valueField  : this.props.value,
            hidden      : this.props.hidden,
            isError     : false,
        };
        this.onChangeAction = this.onChangeAction.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            list: nextProps.list
        });
    }

    componentDidMount(){
        if(this.props.initialisationFunction){
            let value = this.state.valueField ? this.state.valueField : this.props.list[0].id;
            this.props.initialisationFunction(value);
        }
    }

    onChangeAction(event) {
        let optionSelected  = event.target.value;
        let isError         = false;
        if(this.props.validations && this.props.validations.isUnique) {
            let valid = this.props.validations.isUnique(event.target.value, this.props.field);
            isError = !valid;
        }

        this.setState({
            valueField  : optionSelected,
            isError     : isError
        });
        console.log('Is Error : '); console.log(isError);
        this.props.handleChange(optionSelected, this.props.field, isError);
    }

    render() {
        let options = [];
        if(this.props.addPlaceHolder){
            options.push( <option key={0} value={null}>{this.props.addPlaceHolder}</option> );
        }
        if(this.state.list && this.state.list.length > 0){
            this.props.list.forEach(function(elt){
                options.push( <option key={elt.id} value={elt.id} disabled={elt.disabled}>{elt.label}</option> );
            });
        }
        let selectedValue = (this.props.selectedValue != null) ? this.props.selectedValue : this.props.value;
        let sltClass = classNames({
        'c-select': true,
        //'hidden': this.state.hidden
        });

        let wrapperClass = classNames({
            'c-input-wrapper': true,
            'hidden': this.state.hidden
        });

        // Display label
        const label = (this.props.title) ? (<label className="c-label" htmlFor={this.props.name}>{this.props.title}</label>) : '';

        let errorMessage = ''
        if ( this.props.errorMessage !== "" && this.state.isError)
           errorMessage = (<span className='validation-error'>{this.props.errorMessage}</span>);

        return (
            <div className={wrapperClass}>
                {label}
                <select className={sltClass} value={selectedValue} onChange={this.onChangeAction}>
                    {options}
                </select>
                {errorMessage}
           </div>
        );
    }
}

export default (SelectFromClientForm);
