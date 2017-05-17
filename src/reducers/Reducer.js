const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_STATE':
      return {userState: !state.userState};
    default:
      return state
  }
};

export default reducer;