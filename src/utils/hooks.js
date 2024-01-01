export function formReducer(state, event) {
  return {
    ...state,
    [event.name]: event.value,
  };
}
