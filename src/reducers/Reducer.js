const reducer = (state, action) => {
  if (state.userState === undefined || state.userState) {
    return {userState: false}
  }
  return {userState: true}
};

export default reducer;