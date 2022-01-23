// reducers/search.js
const initialState = {
   search: null
}

const searchReducer = (state, action) => {
   switch (action.type) {
      case 'SET_SEARCH': {
         return {
            search: action.payload.searchString,
         }
      }
      default:
         return state;
   }
};
export default searchReducer;