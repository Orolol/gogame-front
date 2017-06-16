import React                    from 'react';
import ReactDOM                 from 'react-dom';


class PlayerBoard extends React.Component {

    constructor(props) {
        super(props);

    }
    componentWillMount(){

    }

    componentWillUnmount(){

    }

    sendCreate(){
        console.log("SEND CREATE");
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/CreateGame",
            data: '{"GameType":"test","NbPlayers":2,"PlayerIDS":[1,0]}'
        });
    }


    render() {
        var playerBoard = <div></div>
        if(this.props.newGameState){
            console.log(this.props.newGameState);
            console.log( JSON.parse( this.props.newGameState ));
            var objGameState = JSON.parse( this.props.newGameState );
            let me = objGameState["ListPlayers"][0]
            let him = objGameState["ListPlayers"][1]
            playerBoard = (
                <div>
                    <div>Turn {objGameState["CurrentTurn"]}</div>
                    <div>MOI</div>
                    <div>Army
                        <div> NbSoldier {me["Army"]["NbSoldier"]} </div>
                        <div> NbLigtTank {me["Army"]["NbLigtTank"]} </div>
                        <div> NbHvyTank {me["Army"]["NbHvyTank"]} </div>
                        <div> NbArt {me["Army"]["NbArt"]} </div>
                    </div>
                    <div> Pop {me["NbPop"]}</div>

                    <div>LUI</div>
                    <div>Army
                        <div> NbSoldier {him["Army"]["NbSoldier"]} </div>
                        <div> NbLigtTank {him["Army"]["NbLigtTank"]} </div>
                        <div> NbHvyTank {him["Army"]["NbHvyTank"]} </div>
                        <div> NbArt {him["Army"]["NbArt"]} </div>
                    </div>
                    <div> Pop {him["NbPop"]}</div>
                </div>
            )
        }


        return (
            <div>
            Test interface Gogame
                <div>
                  <button value="OK" onClick={this.sendCreate} >CREATE</button>
                  {playerBoard}
                </div>
            </div>
        );
    }

}

export default (PlayerBoard);
