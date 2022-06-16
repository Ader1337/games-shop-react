import { createContext, useReducer } from "react";
import { reducer } from './reducer';

export const ShopContext = createContext()

const initialState = {
    gameList: null,
    isGettingData: true,
    isGoodJustAdded: false,
    cart: [],
    page: 1,
    isCartOpen: false,
    nameOfJustAddedProduct: '',
    totalSum: 0
}

export const  ContextProvider = ({children}) => {
    
    const [value, dispatch] = useReducer(reducer, initialState)

    value.changeCartPopupStatus = () => {
        dispatch({type:'CHANGE_POPUP_STATUS'})
    }
    value.deleteGood = (id) => {
        dispatch({type: 'DELETE_GOOD', payload: id})
    }
    value.addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item})
    }
    value.paginate = (event) => {
        dispatch({ type: 'PAGINATE', payload: event.selected })
    }
    value.addDublicateToCart = (id) => {
        dispatch({type: 'ADD_DUBLICATE_TO_CART', payload: id })
    }
    value.removeDublicateFromCart = (id, crrCount) => {
        dispatch({ type: 'REMOVE_DUBLICATE_TO_CART', payload: { id, crrCount } })
    }
    value.closeCart = () => {
        dispatch({ type: 'CLOSE_CART' })
    }
    value.setIsGoodjustAdded = (value) => {
        dispatch({ type: 'SET_IS_GOOD_JUST_ADDED', payload: value})
    }
    value.setGameList = (gameList) => {
        dispatch({ type: 'SET_GAME_LIST', payload: gameList })
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}