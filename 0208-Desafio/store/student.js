// Constantes
const INCREASE_TIME = "student/INCREASE_TIME";
const DECREASE_TIME = "student/DECREASE_TIME";
const MODIFY_EMAIL = "student/MODIFY_EMAIL";

// Action Creators
export const increaseTime = () => ({ type: INCREASE_TIME });
export const decreaseTime = () => ({ type: DECREASE_TIME });
export const modifyEmail = (email) => ({ type: MODIFY_EMAIL, payload: email });

// Estado Inicial
const initialState = {
  name: "Anderson",
  email: "anderson@mail.com",
  daysRemaining: 120,
};

// Reducer
const reducer = immer.produce((state, action) => {
  switch (action.type) {
    case INCREASE_TIME:
      state.daysRemaining++;
      break;

    case DECREASE_TIME:
      state.daysRemaining--;
      break;

    case MODIFY_EMAIL:
      state.email = action.payload;
      break;
  }
}, initialState);

export default reducer;
