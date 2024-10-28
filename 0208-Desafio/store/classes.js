// Constantes
const COMPLETE_CLASS = "classes/COMPLETE_CLASS";
const COMPLETE_COURSE = "classes/COMPLETE_COURSE";
const RESET_COURSE = "classes/RESET_COURSE";

// Action Creators
export const completeClass = (id) => ({ type: COMPLETE_CLASS, payload: id });
export const completeCourse = () => ({ type: COMPLETE_COURSE });
export const resetCourse = () => ({ type: RESET_COURSE });

// Estado Inicial
const initialState = [
  {
    id: 1,
    name: "UX/UI Design",
    complete: true,
  },
  {
    id: 2,
    name: "HTML",
    complete: false,
  },
  {
    id: 3,
    name: "CSS",
    complete: false,
  },
  {
    id: 4,
    name: "JavaScript",
    complete: false,
  },
];

// Reducer
const reducer = immer.produce((state, action) => {
  switch (action.type) {
    case COMPLETE_CLASS:
      const index = state.findIndex(({ id }) => id === action.payload);
      if (!isNaN(index) && state[index]) state[index].complete = true;
      break;

    case COMPLETE_COURSE:
      state.forEach((item) => (item.complete = true));
      break;

    case RESET_COURSE:
      state.forEach((item) => (item.complete = false));
      break;
  }
}, initialState);

export default reducer;
