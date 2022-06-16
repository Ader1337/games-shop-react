export const reducer = (state,{type, payload}) => {

    switch(type) {
        case 'CHANGE_POPUP_STATUS': {
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        }
        case 'DELETE_GOOD':{
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== payload)
            }
        }
        case 'ADD_TO_CART':{
            let newState = {...state}
            let indexEl = newState.cart.findIndex((el) => el.id === payload.id)
            if (indexEl !== -1) {
                newState = { ...newState, cart: newState.cart.map((item, index) => index === indexEl ? { ...item, count: item.count + 1 } : item) }
            } else {
                newState = { ...newState, cart: [...newState.cart, { ...payload, count: 1 }] }
            }
            return {
                ...newState,
                nameOfJustAddedProduct: payload.name
            }
        }
        case 'PAGINATE': {
            return {
                ...state,
                page: payload + 1,
                gameList: null,
                isGettingData: true
            }
        }
        case 'ADD_DUBLICATE_TO_CART': {
            let indexEl = state.cart.findIndex((el) => el.id === payload)
            return {
                ...state,
                cart: state.cart.map((item, index) => index === indexEl ? { ...item, count: item.count + 1 } : item)
            }
        } 
        case 'REMOVE_DUBLICATE_TO_CART': {
            let indexEl = state.cart.findIndex((el) => el.id === payload.id)
            if (payload.crrCount !== 1) {
                return {
                    ...state,
                    cart: state.cart.map((item, index) => index === indexEl ? { ...item, count: item.count - 1 } : item)
                }
            }else {
                return state
            }
        } 
        case 'CLOSE_CART': {
            return{
                ...state,
                isCartOpen: false
            }
        }
        case 'SET_IS_GOOD_JUST_ADDED': {
            return {
                ...state,
                isGoodJustAdded: payload
            }
        }
        case 'SET_GAME_LIST':{
            return {
                ...state,
                gameList: payload,
                isGettingData: false
            }
        } 
        default : {
            return state
        }
    }
}