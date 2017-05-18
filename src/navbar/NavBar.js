import {connect} from 'react-redux'
import NavBarUI from './NavBarUI'

const mapStateToProps = (state) => {
  const user = state.user;
  if (user.state) {
    return {username: user.username};
  }
  return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
};

const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUI);

export default NavBar