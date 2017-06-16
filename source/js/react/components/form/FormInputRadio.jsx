import React    from 'react';
import Formsy   from 'formsy-react';


const FormInputRadio = React.createClass({


    getInitialState(props) {
        let state = {
            divClassName: this.props.className || '',
            elements    : this.props.elements,
            field       : this.props.field,
            title       : this.props.title,
            valueChecked
                        : this.props.valueChecked,
            readOnly    : this.props.readOnly,
        };
        return state;
    },

    componentWillReceiveProps(nextProps) {
        this.setState({ elements: nextProps.elements, valueChecked: nextProps.valueChecked });
    },


    render() {
        let radioElementsHTML = [];

        for (let i=0; i < this.state.elements.length; i++ ) {
            let el          = this.state.elements[i];
            let ID          = "radioElement_" + el.id;
            let GroupName   = "RadioElementName_"+this.state.field;
            let label   = (
                <label className='o-flex-block c-checkbox-toggle c-input-line--label' htmlFor={ID}>
                    <span className="c-checkbox-toggle__handler"></span>
                    <span className="c-label-category-name">{el.label}</span>
                </label>
            );

            let isChecked = el.label.toLowerCase() == this.state.valueChecked.toLowerCase() || this.state.valueChecked.toLowerCase() === el.id.toLowerCase();

            let disabled  = this.state.readOnly ? true : false;
            let radioButton = (
                <input className="hidden" disabled={disabled} checked={isChecked} id={ID} type="radio" name={GroupName}
                onChange={ () => this.props.handleChange( el.id, this.state.field, false ) } />
            );

            let HTMLOnDeliveryType = (
                <div key={ID} className="o-flex-block c-checkbox-wrapper c-input-radio">
                    {radioButton}
                    {label}
                </div>
            );
            radioElementsHTML.push( HTMLOnDeliveryType );
        }

        return (
            <div className="c-input-wrapper c-input-wrapper__radio">
                <div className="c-label">{this.state.title}</div>
                <div className={"o-flex-block "+this.state.divClassName}>
                    {radioElementsHTML}
                </div>
            </div>
        );

    }

});

export default (FormInputRadio);
