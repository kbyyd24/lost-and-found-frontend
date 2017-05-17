import {connect} from 'react-redux'
import NavBarUI from './NavBarUI'

const mapStateToProps = (state) => {
  return {
    userState: state.userState
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onButtonClick: () => {
      dispatch({
        type: 'CHANGE_STATE',
        userState: !ownProps.userState
      })
    }
  }
};

const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUI);

export default NavBar