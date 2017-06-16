import React                    from 'react';
import ReactDOM                 from 'react-dom';
import {translate}              from 'react-i18next';
import FormInputText            from '../FormInputText.jsx';
import FormInputUrl             from '../FormInputUrl.jsx';
import FormCheckbox             from '../FormCheckbox.jsx';
import FormCheckboxSwitch       from '../FormCheckboxSwitch.jsx';
import SelectFromClientForm     from '../SelectFromClientForm.jsx';
import InputTagForm             from '../InputTagForm.jsx';

class ListEditableItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
        this.handleItemChange = this.handleItemChange.bind(this);

    }

    componentWillReceiveProps(nextProps) { console.log(nextProps);
        this.setState({
            item: nextProps.item
        });
    }

    submitForm(){

    }

    handleItemChange(value, field, isError) {

        let item = this.state.item;
        item[field] = value;

        console.log('Item change');
        console.log(field + "    " + value);
        console.log(item);

        this.setState({
            item: item
        });
        let element =
            this.props.schema.find(function(fieldSchema) { return fieldSchema.field == field; });
        if ( element.onChangeDo && typeof(element.onChangeDo) === 'function')
            element.onChangeDo( item.id );
    }

    render() {

        let form = [];
        this.props.schema.forEach(function(field){
            let name = field.name + this.props.elementId;
            let validation = {};

            switch(field.type){
                case 'inputText': form.push(
                    <FormInputText
                        title           = {field.title}
                        key             = {field.field}
                        className       = ""
                        name            = {name}
                        value           = {this.state.item[field.field]}
                        field           = {field.field}
                        validations     = {validation}
                        handleChange    = {this.handleItemChange}
                        validationError = {field.errorMessage}
                        required        = {field.isRequired}
                        readOnly        = {field.readOnly}
                    />
                );
                break;

                case 'inputUrl': form.push(
                    <FormInputUrl
                        title           = {field.title}
                        key             = {field.field}
                        className       = ""
                        name            = {name}
                        value           = {this.state.item[field.field]}
                        field           = {field.field}
                        validations     = {validation}
                        handleChange    = {this.handleItemChange}
                        validationError = {field.errorMessage}
                        required        = {field.isRequired}
                        readOnly        = {field.readOnly}
                    />
                );
                break;

                case 'select': form.push(
                    <SelectFromClientForm
                        title           = {field.title}
                        key             = {field.field}
                        name            = {name}
                        value           = {this.state.item[field.field]}
                        field           = {field.field}
                        list            = {field.list}
                        validations     = {validation}
                        handleChange    = {this.handleItemChange}
                        errorMessage    = {field.errorMessage}
                        required        = {field.isRequired}
                        readOnly        = {field.readOnly}
                    />
                );
                break;

                case 'radio': form.push(
                    <FormInput
                        title           = {field.title}
                        key             = {field.field}
                        className       = "-radio"
                        name            = {name}
                        type            = "checkbox"
                        checked         = {this.state.item[field.field]}
                        field           = {field.field}
                        handleChange    = {this.handleItemChange}
                        validationError = {field.errorMessage}
                        required        = {field.isRequired}
                        readOnly        = {field.readOnly}
                    />
                );
                break;

                case 'radio-switch': form.push(
                    <FormCheckboxSwitch
                        id              = {this.state.elementId}
                        name            = {name}
                        key             = {field.field}
                        checked         = {this.state.item[field.field]}
                        field           = {field.field}
                        handleChange    = {this.handleItemChange}
                        readOnly        = {field.readOnly}
                    />
                );
                break;

                case 'radio-custom': form.push(
                    <FormCheckbox
                        title           = {field.title}
                        id              = {this.state.elementId}
                        key             = {field.field}
                        className       = "-radio"
                        name            = {name}
                        checked         = {this.state.item[field.field]}
                        field           = {field.field}
                        handleChange    = {this.handleItemChange}
                        readOnly        = {field.readOnly}
                    />
                );
                break;

                case 'tag': form.push(
                    <InputTagForm
                        title           = {field.title}
                        className       = "c-input c-textarea"
                        tags            = {field.list}
                        handleChange    = {this.handleItemChange}
                        suggestions     = {field.suggestions}
                        field           = {field.field}
                        readOnly        = {field.readOnly}
                    />
                );
                break;

            }

        }.bind(this));

        return (
            <div className="o-flex-block display-input-list">{form}</div>
        );
    }

}

export default (ListEditableItem);
