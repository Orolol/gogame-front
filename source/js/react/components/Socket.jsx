import React                    from 'react';
import ReactDOM                 from 'react-dom';


class PlayerBoard extends React.Component {

    constructor(props) {
        super(props);

    }
    componentWillMount(){
        //
        // var conn;
        // var msg = document.getElementById("msg");
        // var log = document.getElementById("log");
        // function appendLog(item) {
        //     var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
        //     log.appendChild(item);
        //     if (doScroll) {
        //         log.scrollTop = log.scrollHeight - log.clientHeight;
        //     }
        // }
        // if (window["WebSocket"]) {
        //     conn = new WebSocket("ws://localhost:5000/ws");
        //     conn.onclose = function (evt) {
        //         var item = document.createElement("div");
        //         item.innerHTML = "<b>Connection closed.</b>";
        //         appendLog(item);
        //     };
        //     conn.onmessage = function (evt) {
        //         var messages = evt.data.split('\n');
        //         for (var i = 0; i < messages.length; i++) {
        //             // var obj = JSON.parse( item );
        //             // console.log(obj);
        //             var item = document.createElement("div");
        //             item.innerText = messages[i];
        //             appendLog(item);
        //         }
        //     };
        // } else {
        //     var item = document.createElement("div");
        //     item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
        //     appendLog(item);
        // }
    }

    componentWillUnmount(){

    }


    render() {


        return (
            <div>
                Board
            </div>
        );
    }

}

export default (PlayerBoard);
