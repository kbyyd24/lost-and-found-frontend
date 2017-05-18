import {connect} from 'react-redux'
import NavBarUI from './NavBarUI'

const mapStateToProps = (state) => {
  return {
    userState: state.userState
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
};

const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUI);

export default NavBar