import React, { useEffect, useRef, useState } from 'react'
import '../style.scss'
import Card from './Card'
import Preloader from './UI/Preloader';
import ReactPaginate from 'react-paginate';
import Cart from './Cart';
import { useContext } from 'react';
import { ShopContext } from './../context';

let API_KEY = process.env.REACT_APP_API_KEY

function Body() {

    const { page, setGameList, nameOfJustAddedProduct, paginate,
        isCartOpen, isGoodJustAdded, setIsGoodjustAdded, addToCart,
        isGettingData, gameList } = useContext(ShopContext)
    const timeoutID = useRef()

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
    const manageCart = (item) => {
        showMiniPopup()
        addToCart(item)
    }

    useEffect(() => {
        if (isGettingData) {
            fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2015-01-01,2021-12-31&ordering=-added&page=${page}`)
                .then((response) => response.json())
                .then((data) => {
                    setGameList([...data.results])
                })

        }
    }, [isGettingData])


    return (
        <div className='body'>
            <div className={"container " + (isCartOpen ? 'blur' : '')} >
                <div className="warn__text">
                    *Prices are not real, and were made up for demonstration
                </div>
                {gameList
                    ?
                    <>
                        <div className="list">
                            {gameList.map((item) => <Card manageCart={manageCart} key={item.id} item={item} />)}
                        </div>

                    </>

                    :
                    <Preloader />
                }
                <div style={gameList ? { display: 'block' } : { display: 'none' }} className="pagination-container">
                    <ReactPaginate
                        breakLabel="..."
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={1}
                        previousLabel={'prev'}
                        nextLabel={'next'}
                        pageCount={99}
                        onPageChange={paginate}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>

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