import React                        from 'react';
import {Link, hashHistory, router}  from 'react-router';
import Chat                         from './Chat.jsx'
import Socket                       from './Socket.jsx'
import PlayerBoard                  from './PlayerBoard.jsx'
import Homepage                     from './HomeManager.jsx'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'



class ModuleManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newChatMsg          : "",
            newGameState        : "",
        };
        var conn;
        console.log('CONST DU MODULE MAN')
    }

    componentDidMount(){

        if (window["WebSocket"]) {
            this.conn = new WebSocket("ws://localhost:5001/ws");
            this.conn.onclose = function (evt) {
                item = "Connection closed.";
                this.setState({ newChatMsg: item })
                // appendLog(item);
            }.bind(this);
            this.conn.onmessage = function (evt) {
                var messages = evt.data.split('\n');
                for (var i = 0; i < messages.length; i++) {
                    // var obj = JSON.parse( item );
                    console.log(messages[i]);
                    this.setState({ newGameState: messages[i] });

                    // appendLog(item);
                }
            }.bind(this);
        } else {
            var item = document.createElement("div");
            item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
            this.setState({ newChatMsg: item })
        }
        console.log('MOUNT DU MODULE MAN')
    }

    render() {
        console.log(this.state);
        console.log("this.state");
        return (
            <div>
                <Chat newChatMsg={this.state.newChatMsg} conn={this.conn}/>
                <PlayerBoard newGameState={this.state.newGameState}/>
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
