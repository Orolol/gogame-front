import {EventEmitter}           from 'events';
import EventConstants           from '../constants/EventConstants';

/**
 * Base classe for stores
 */
var BaseStore = Object.assign({}, EventEmitter.prototype, {

    //List of request currently loading
    currentRequest: [],

    /**
    * Add event listener on CHANGE event.
    * @date   2016-01-15
    * @param  {Function} callback Event Listener callback
    */
    addChangeListener(callback, EVENT=EventConstants.CHANGE_EVENT) {
        this.on(EVENT, callback);
    },

    /**
    * Removes event Listener
    * @date   2016-01-18
    * @param  {Function} callback callback
    */
    removeChangeListener(callback, EVENT=EventConstants.CHANGE_EVENT) {
        this.removeListener(EVENT, callback);
    },

    /**
    * Adds error event handler
    * @date   2016-04-19
    * @param  {Function} callback callback
    */
    addErrorListener: function(callback) {
        this.on(ERROR_EVENT, callback);
    },

    /**
    * Removes event listener
    * @date   2016-04-19
    * @param  {Function} callback callback
    */
    removeErrorListener: function(callback) {
        this.removeListener(EventConstants.ERROR_EVENT, callback);
    },

    /**
    * emits event
    * @date   2016-01-14
    */
    emitChange( EVENT=EventConstants.CHANGE_EVENT ) {
        this.emit(EVENT);
    },

  /**
   * Emits an error event
   * @date   2016-04-19
   * @param  {Object}   data error message
   */
    emitError(data) {
        this.emit(EventConstants.ERROR_EVENT, data);
    },

   /**
   * Executes an xhr post request
   * @date   2016-04-20
   * @param  {Object}   userSettings xhr request settings
   */
    post(userSettings) {

        let defaultSettings = {
            dataType: 'json',
            method: 'POST',
            cache: false,
            onError: function() {},
        };

        let settings = {};

        Object.assign(settings, defaultSettings, userSettings);

        if(this.currentRequest.indexOf(settings.url) == -1){
            this.currentRequest.push(settings.url);


            let onError = function(jqXHR, textStatus, errorThrown) {
                let message;
                if (jqXHR.responseJSON !== undefined && jqXHR.responseJSON.msg.length > 0) {
                    message = jqXHR.responseJSON.msg;
                } else {
                    message = errorThrown;
                }
                settings.onError(message);
            };

            let onSuccess = function(data){

                this.currentRequest.splice(this.currentRequest.indexOf(settings.url), 1);
                settings.onSuccess(data);
            }.bind(this);

            $.ajax({
                url: settings.url,
                dataType: settings.dataType,
                data: settings.data,
                type: settings.method,
                beforeSend: settings.beforeSend,
                cache: settings.cache,
                success: onSuccess,
                error: onError,
            });
        } else {
            console.log("Request already in treatment");
            console.log(this.currentRequest);
        }



    },

    /* The AJAX Call To Controller (before going to API) */
    _requestAPI(uri, data, onSuccess, onError) {
        this.post({
          url: base_url + uri,
          data: data,
          onSuccess: onSuccess,
          onError: onError
        });
    }


});

export default BaseStore;
