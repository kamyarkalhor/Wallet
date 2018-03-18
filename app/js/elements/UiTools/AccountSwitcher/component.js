import React, { PropTypes } from 'react';

class AccountSwitcher extends React.Component {
  render() {
    const { resetAccount } = this.props;

    return (
      <button className="btn gray" onClick={resetAccount}>Change account</button>
    );
  }
}

AccountSwitcher.propTypes = {
  resetAccount: PropTypes.func.isRequired,
};

export default AccountSwitcher;
