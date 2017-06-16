import React                    from 'react';
import ReactDOM                 from 'react-dom';


class Chat extends React.Component {

    constructor(props) {
        super(props);

    }
    appendLog(item) {
        var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
        log.appendChild(item);
        if (doScroll) {
            log.scrollTop = log.scrollHeight - log.clientHeight;
        }
    }

    componentDidMount(){
        var msg = document.getElementById("msg");
        var log = document.getElementById("log");

        document.getElementById("form").onsubmit = function () {
            if (!this.conn) {
                return false;
            }
            if (!msg.value) {
                return false;
            }
            this.conn.send(msg.value);
            msg.value = "";
            return false;
        };
    }

    componentWillUnmount(){

    }

    submitMsg() {
        if (!this.conn) {
            return false;
        }
        if (!msg.value) {
            return false;
        }
        this.conn.send(msg.value);
        msg.value = "";
        return false;
    };


    render() {

        console.log("RERENDER CHAT");
        console.log(this.props);
        return (
            <div>
                Chat
                <div id="log">{this.props.newChatMsg}</div>
                <form id="form" onsubmit={this.submitMsg}>
                    <input type="submit" value="Send" />
                    <input type="text" id="msg" size="64"/>
                </form>
            </div>
        );
    }

}

export default (Chat);
