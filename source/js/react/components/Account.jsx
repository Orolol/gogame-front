import React, { PropTypes } from 'react'

class Account extends React.Component {

    constructor(props) {
        super(props);

    }
    componentWillMount(){

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

Account.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Account
