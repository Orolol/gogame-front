import React, { PropTypes } from 'react'
import Account from './Account'

class AccountList extends React.Component {

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

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired

}

export default AccountList
