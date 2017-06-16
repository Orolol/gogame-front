import BaseStore                from './BaseStore';
import AppDispatcher            from '../dispatchers/AppDispatcher';



var AccountStore = Object.assign({}, BaseStore, {

/***** Attributes *****/
    accounts                 : [],
    base_url                 : "http://localhost:8080/v1/",

/***** Store Variables accessors *****/
    getAccounts() {
        let accounts  = this.accounts;
        if( ! this.accounts.length){
            let onSuccess, onError;
            [ onSuccess, onError ] = this.getOnSuccessOnErrorforAccountList();
            this.updateAccountsList( onSuccess, onError );
        }
        return accounts;
    },

    getAccountsUpdated() {
        let accounts           = this.accountUpdated;
        this.accountUpdated    = null;
        return accounts;
    },

/***** API Request to fill store variables *****/

    updateAccountsList( onSuccess, onError, projects = null) {
        let data = null
        this.post({
            url         : this.base_url + 'accounts',
            data        : data,
            onSuccess   : onSuccess,
            onError     : onError,
            method      : 'GET'
        });
    },


    /**
    * Call API to update a account
    * input : Data, onSuccess function and onError function
    * ouput : None (Note, perform OnSuccess/OnError function after the API returned a result)
    */
    createOrUpdateAccount( data, onSuccess, onError ) {

        this.post({
            url       : this.base_url + 'accounts',
            data      : data,
            onSuccess : onSuccess,
            onError   : onError,
            method    : 'PUT'
        });
    },

    /**
    * Call API to remove a account
    * input : Data, onSuccess function and onError function
    * ouput : None (Note, perform OnSuccess/OnError function after the API returned a result)
    */
    removeAccount( data, onSuccess, onError ) {
        this.post({
            url       : this.base_url + 'accounts',
            data      : data,
            onSuccess : onSuccess,
            onError   : onError,
            method    : 'DELETE'
        });
    },


/***** onSuccess/onError logic on API result received *****/

    /**
    * Return the function onSuccess/onError to do on ajax request to get accounts list
    * input : None
    * ouput : functions onSuccess, onError
    */
    getOnSuccessOnErrorforAccountList() {
        let onSuccess;
        let onError;

        onSuccess   = function(data) {
            if(data){
                this.accounts = data;
            } else {
                this.accounts = [];
            }
            this.selectedAccounts = [];
            this.emitChange();
        }.bind(this);

        onError = function(message) {
            this.emitError({action: 'list', message: message});
            throw new Error(`Fetching accounts for account ${accountId}. - ${message}`);
        }.bind(this);

        return [ onSuccess, onError ];

    },


    /**
    * Return the function onSuccess/onError to do on ajax request to CREATE_ACCOUNT event
    * input : None
    * ouput : functions onSuccess, onError
    */
    getOnSuccessOnErrorforCreateAccount() {
        let onSuccess;
        let onError;

        onSuccess = function(data) {
            this.accountUpdated = data;
            if (data) {
                let onSuccessUpdateListAccount;
                let onErrorUpdateListAccount;

                [onSuccessUpdateListAccount, onErrorUpdateListAccount]
                    = this.getOnSuccessOnErrorforAccountList();
                this.updateAccountsList( onSuccessUpdateListAccount, onErrorUpdateListAccount );
            }
        }.bind(this);

        onError = function(message) {
            this.emitError({action: 'create', message: message});
            throw new Error(`Creating account ${label} on account ${accountId}. - ${message}`);
        }.bind(this);

        return [ onSuccess, onError ];

    },

    /**
    * Return the function onSuccess/onError to do on ajax request to UPDATE_ACCOUNT event
    * input : None
    * ouput : functions onSuccess, onError
    */
    getOnSuccessOnErrorforUpdateAccount() {
        let onSuccess;
        let onError;

        onSuccess = function(data) {
            this.accountUpdated = data;
            if (data) {
                let onSuccessUpdateListAccount;
                let onErrorUpdateListAccount;

                [onSuccessUpdateListAccount, onErrorUpdateListAccount]
                    = this.getOnSuccessOnErrorforAccountList();
                this.updateAccountsList( onSuccessUpdateListAccount, onErrorUpdateListAccount );
            }
        }.bind(this);

        onError = function(message) {
            this.emitError({action: 'create', message: message});
            throw new Error(`Updating account ${accountId} on account ${accountId}. - ${message}`);
        }.bind(this);

        return [ onSuccess, onError ];
    },

    /**
    * Return the function onSuccess/onError to do on ajax request to REMOVE_ACCOUNT event
    * input : None
    * ouput : functions onSuccess, onError
    */
    getOnSuccessOnErrorforRemoveAccount() {
        let onSuccess;
        let onError;

        onSuccess = function(data) {
            this.accountUpdated = data;
            if (data) {
                let onSuccessUpdateListAccount;
                let onErrorUpdateListAccount;

                [onSuccessUpdateListAccount, onErrorUpdateListAccount]
                    = this.getOnSuccessOnErrorforAccountList();
                this.updateAccountsList( onSuccessUpdateListAccount, onErrorUpdateListAccount );
            }
        }.bind(this);

        onError = function(message) {
            this.emitError({action: 'remove', message: message});
            throw new Error(`Removing account ${accountId} on account ${accountId}. - ${message}`);
        }.bind(this);

        return [ onSuccess, onError ];
    },


/***** EVENT DISPATCHER REGISTER For this Store *****/
    dispatcherIndex: AppDispatcher.register(
        function(action) {

            let onSuccess;
            let onError;
            let data;

            switch (action.actionType) {
                case StoreActionsConstants.CREATE_ACCOUNT:
                    data = action.data;
                    [ onSuccess, onError ] = AccountStore.getOnSuccessOnErrorforCreateAccount();
                    AccountStore.createAccount( data, onSuccess, onError );
                    break;

                case StoreActionsConstants.REMOVE_ACCOUNT:
                    data = { 'id'   : action.accountId };
                    [ onSuccess, onError ] = AccountStore.getOnSuccessOnErrorforRemoveAccount();
                    AccountStore.removeAccount( data, onSuccess, onError );
                    break;

                case StoreActionsConstants.UPDATE_ACCOUNT:
                    data = action.data;
                    [ onSuccess, onError ] = AccountStore.getOnSuccessOnErrorforUpdateAccount();
                    AccountStore.updateAccount( data, onSuccess, onError );
                    break;
            }
            return true; // No errors. Needed by promise in Dispatcher.
        }
    )

});
export default AccountStore;
