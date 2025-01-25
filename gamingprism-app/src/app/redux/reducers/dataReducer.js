const initialState = {
    items: [], // Array of items
    favorites: [],
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_ITEMS":
        return {
          ...state,
          items: action.payload,
        };
        case "UPDATE_ITEM":
            return {
              ...state,
              items: state.items.map((item) =>
                item.id === action.payload.id
                  ? { ...item, ...action.payload.updatedData }
                  : item
              ),
            };
      case "SET_FAVORITES":
        return {
          ...state,
          favorites: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dataReducer;
  