const initialState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "updateCart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "change":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "delete":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };

      case 'show_loading':
        return{
            ...state,
            loading:true
        };
        case 'hide_loading':
        return{
            ...state,
            loading:false
        }

    default:
      return state;
  }
};
