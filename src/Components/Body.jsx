import React, { useEffect,useRef } from 'react'
import '../style.scss'
import Cart from './Cart';
import { useContext } from 'react';
import { ShopContext } from './../context';
import GoodsList from './GoodsList';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './ProductPage';

let API_KEY = process.env.REACT_APP_API_KEY

function Body() {
    const { page, setGameList, nameOfJustAddedProduct,
        isGettingData, isGoodJustAdded, setIsGoodjustAdded, addToCart } = useContext(ShopContext)
   
    const timeoutID = useRef()

    const manageCart = (item) => {
        showMiniPopup()
        addToCart(item)
    }
    const showMiniPopup = () => {
        if (isGoodJustAdded === false) {
            timeoutID.current = setTimeout(() => {
                setIsGoodjustAdded(false)
            }, 2500)
            setIsGoodjustAdded(true)
        } else {
            clearTimeout(timeoutID.current)
            timeoutID.current = setTimeout(() => {
                setIsGoodjustAdded(false)
            }, 2500)
        }
    }
    useEffect(() => {
        if (isGettingData) {
            fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2015-01-01,2021-12-31&ordering=-added&page=${page}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setGameList([...data.results])
                })

        }
    }, [isGettingData])

    /* games-shop-react */
    return (
        <div className='body'>
            <Routes>
                <Route path='/' element={<GoodsList manageCart={manageCart}/>} />
                <Route path='/:slug' element={<ProductPage manageCart={manageCart} />} />
            </Routes>
            {
                isGoodJustAdded ?
                    <div className="cart-flag">{nameOfJustAddedProduct} was added to cart</div>
                    :
                    null
            }
            <Cart />
        </div>
    )
}

export default Body