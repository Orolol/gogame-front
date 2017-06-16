import React                from 'react';
import ReactDOM             from 'react-dom';
import {translate}          from 'react-i18next';
import ListEditableItem     from './ListEditableItem.jsx';

class ListEditableList extends React.Component {

    constructor(props) {
        super(props);

        console.log('Loading Items');
        console.log(props.items);
        this.state = {
            items: props.items,
        };

        this.submitForm     = this.submitForm.bind(this);
        this.deleteItem     = this.deleteItem.bind(this);
        this.getAllItems    = this.getAllItems.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ items: nextProps.items, schema: nextProps.schema });
    }

    componentWillMount() {

    }

    componentWillUnmount() {
    }


    submitForm(){
        this.props.createElements( this.state.items );
    }

    addItem(event){
        if (event)
            event.preventDefault();

        let newItem = {};
        this.props.schema.forEach(function(field){
            newItem[field.field] = field.value;
        });
        let newItemsList =  this.state.items;
        newItemsList.unshift(newItem);
        console.log('ADD ITEM'); console.log(newItemsList);
        this.setState({
            items: newItemsList,
        });
    }

    deleteItem(itemToDelete){
        let newItemList = this.state.items;

        if ( this.props.onDelete && typeof(this.props.onDelete) === 'function')
            this.props.onDelete(itemToDelete.id);

        newItemList.forEach(function(item, index){
            if(item.id === itemToDelete.id){
                newItemList.splice(index, 1);
            }
        });
        this.setState({
            items: newItemList,
        })
    }

    getAllItems(){
        return this.state.items;
    }

    render() {
        const {t}           = this.props;

        let addButton       = '';
        let button          = '';
        let content         = '';

        if ( ! this.props.readOnly ) {
            button = (<button
                className   = "c-btn c-btn--modal c-modal__button"
                onClick     = {this.submitForm}
                >  {t('form:ok')}  </button>);
            addButton = (
                <button className="c-btn c-btn--modal-2" onClick={(event) => this.addItem(event)}>
                    <span>+</span> {t('form:add')}
                </button>
            );
        }

        if (this.state.items && this.state.items.length) {
            content = this.state.items.map((item, index) => {
                console.log('MAPPING ITEMS');
                console.log(item);
                let classContainer = 'o-flex-block c-form-line';
                if(item.id) {
                    classContainer += "_existing"
                }

                return (
                    <div key={index} className={classContainer}>
                        <div className="c-form-deleteButton">
                               <button className="c-btn c-btn-modal__delete" onClick={() => this.deleteItem(item)}>
                                   {t('form:delete')}
                                   <span className="icon-remove"></span>
                               </button>
                          </div>
                          <ListEditableItem
                              elementId           =   {index}
                              item                =   {item}
                              schema              =   {this.props.schema}
                              checkFieldUnicity   =   {this.checkFieldUnicity}
                              handleChange        =   {this.props.handleChange}
                              getAllItems         =   {this.getAllItems}
                          />
                    </div>
                );
            });
            // Show an empty line if no data
        } else {
            if (! this.props.readOnly) {
                this.addItem(null);
            }
        }

        return (

            <div className="c-modal__inlineForm">
                <div className="c-inlineForm-create-item">
                    {addButton}
                </div>
                <div className="c-inlineForm-list">
                    {content}
                </div>
                <div className="o-flex-block--rev c-btn-modal-wrapper">{button}</div>

            </div>

        );
    }

}

export default translate([
], {wait: true})(ListEditableList);
