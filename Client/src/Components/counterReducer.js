export const counterReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { ...state, count: action.count };
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "MYSET":
      return { ...state, myCount: action.myCount };
    case "MYINCREMENT":
      return { ...state, myCount: state.myCount + 1 };
    case "MYDECREMENT":
      return { ...state, myCount: state.myCount - 1 };
    default:
      return state;
  }
};
