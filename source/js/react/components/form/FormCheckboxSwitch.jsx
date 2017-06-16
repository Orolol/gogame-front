import React    from 'react';
import Formsy   from 'formsy-react';


const FormCheckboxSwitch = React.createClass({

    getInitialState() {
        let state = {
            id      : this.props.id,
            checked : this.props.checked
        }
        console.log(state);
        return state;
    },

    componentWillReceiveProps(nextProps) {
        let value;
        if ( nextProps.checked.toUpperCase() === "YES" ) {
            value = true;
        } else if ( nextProps.checked.toUpperCase() === "NO" ) {
            value = false;
        } else {
            value = nextProps.checked;
        }

        this.setState({ checked: value });
    },

    changeValue(value) {
        this.props.handleChange(
            value,
            this.props.field,
            false
        );
        this.setState({ checked : value });
    },


    render() {
        const className = 'c-input-radio';
        return (
            <div className="c-input-wrapper c-switch-wrapper" onClick={ () => this.changeValue(!this.state.checked) }>
                <input id={this.props.id} className={className} checked={this.state.checked} type='checkbox'
                       name={this.props.name} onChange={function() { }} />
                <label htmlFor={this.props.id} className="c-switch-toggle">
                    <span className="c-switch-toggle__handler"></span>
                </label>
            </div>
        );
    }
});
export default (FormCheckboxSwitch);
