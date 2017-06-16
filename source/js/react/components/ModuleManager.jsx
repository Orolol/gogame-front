import React                        from 'react';
import {Link, hashHistory, router}  from 'react-router';
import AccountManager               from './AccountManager.jsx'
import ConfigManager                from './ConfigManager.jsx'
import Homepage                     from './HomeManager.jsx'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'



class ModuleManager extends React.Component {
    constructor(props) {
        super(props);
        console.log('CONST DU MODULE MAN')
    }

    componentDidMount(){
        console.log('MOUNT DU MODULE MAN')
    }

    render() {
        // let category = this.context.params.category;
        // let account_id = this.context.params.account;
        // let renderModule;
        //
        // let isAdmin = true;
        // category = 'account'

        console.log('MODULE');

        // if (category === undefined) {
        //     renderModule = (<Provider store={store}>  <ConfigManager account_id={account_id} /> </Provider>);
        // } else if (category === 'account' && isAdmin=true) {
        //     renderModule = (<Provider store={store}>  <AccountManager/> </Provider>)
        // } else if (category === 'config') {
        //     renderModule = <ConfigManager account_id={account_id} />
        // } else {
        //     renderModule = <Homepage account_id={account_id} />
        // }

        return (
            <div>
                <AccountManager />
            </div>
        );
    }
}

ModuleManager.contextTypes = {
    router  : React.PropTypes.object.isRequired,
    history : React.PropTypes.object,
    location: React.PropTypes.object,
    params  : React.PropTypes.object,
    access  : React.PropTypes.object
};

export default (ModuleManager);
