import React, {PropTypes, Component} from 'react';
import {Router, Route, Link, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';

/**
* App Component
*/
class App extends React.Component {
  /**
  * Constructs APP component
  * @date   2016-01-27
  * @param  {Object}   props holds location object
  */
  constructor(props) {
    super(props);
    this.account = {};
    this.routingParams = {};
    // Acceptance criterea for routing parameters in the url
    this.acceptedParams = [
      {key: 'account', rename: 'module', criteria: '[\\d]+', valueOptional: true, type: 'string'},
      {key: 'category', rename: 'projectId', criteria: '[\\d]*', valueOptional: true, type: 'string'},
    ];

    this.routingParams = this.handleRoutingParams(props.params);
    this.handleRoutingParams = this.handleRoutingParams.bind(this);
  }
  /**
  * Retruns childContext, loaction Object
  * @date   2016-01-27
  * @return {object}   location
  */
  getChildContext() {
    return {location: this.props.location, params: this.routingParams, access: this.wcm_access};
  }
  /**
  * @date   2016-03-01
  * @param  {Object}   nextProps   Next Properties
  * @param  {Object}   nextContext Next context properties
  */
  componentWillReceiveProps(nextProps, nextContext) {
    this.routingParams = this.handleRoutingParams(nextProps.params);
  }
  /**
  * Handles Routing parameters
  * @date   2016-03-01
  * @param  {Object}   params Routing parameters
  * @return {Object}          URL parameters split into Object
  */
  handleRoutingParams(params) {
    let splitParams;
    if (params.splat !== undefined) {
      splitParams = this.splatToParams(this.acceptedParams, params.splat);
    }
    return Object.assign(params, splitParams);
  }

  /**
  * Converts 'splatted' params as String to params as Object
  * @date   2016-03-01
  * @param  {Object}   acceptedParams Acceptance criteria
  * @param  {String}   splat          Splatted parameters
  * @return {Object}                  Oject with routing params
  */
  splatToParams(acceptedParams, splat) {
    var newParams = {};

    var splitResult = splat.split('\/');
    if(splitResult[0] != '..' && splitResult[0] != '.'){
      newParams.account = splitResult[0];
    } else {
        newParams.account = this.props.params.account
    }
    newParams.module = splitResult[1];

    return newParams;
  }
  /**
  * renders app component
  * @date   2016-01-27
  * @return {Jsx}   things
  */
  render() {
    return (

      <div>
      {this.props.children}
      </div>
    );
  }
}

App.childContextTypes = {
  location: React.PropTypes.object,
  params: React.PropTypes.object,
  access: React.PropTypes.object,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

App.propTypes = {
  params: React.PropTypes.object,
  children: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default App;
