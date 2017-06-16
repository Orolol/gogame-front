import React                    from 'react';
import ReactDOM                 from 'react-dom';
import AccountStore             from '../store/AccountStore'


class AccountManager extends React.Component {

    constructor(props) {
        super(props);

    }
    componentWillMount(){
        let accountsList =  AccountStore.getAccounts()
    }

    onAccountChange(){
        let accountsList =  AccountStore.getAccounts()
        console.log(accountsList);
    }


    componentWillUnmount(){

    }


    render() {


        return (
            <div>
                account
            </div>
        );
    }

}

export default (AccountManager);
