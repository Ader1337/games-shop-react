import React, { useEffect, useRef, useState } from 'react'
import '../style.scss'
import Card from './Card'
import Preloader from './UI/Preloader';
import ReactPaginate from 'react-paginate';

import Cart from './Cart';
function Body() {
    const [gameList, setGameList] = useState()
    const [isGettingData, setIsGettingData] = useState(true)
    const [isGoodjustAdded, setIsGoodjustAdded] = useState(false)
    const [cart, setCart] = useState([])
    const [page, setPage] = useState(1)
    const timeoutID = useRef()

    const showMiniPopup = () => {
        if (isGoodjustAdded === false) {
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
    const addToCart = (item) => {
        let indexEl = cart.findIndex((el) => el.id === item.id)

        if (indexEl !== -1) {
            //addDublicateToCart(indexEl)
            setCart(cart.map((item, index) => index === indexEl ? { ...item, count: item.count + 1 } : item))
        } else {
            setCart([...cart, { ...item, count: 1 }])
        }
    }
    const paginate = (event) => {
        setPage(event.selected + 1)
        setIsGettingData(true)
    }


    useEffect(() => {
        if (isGettingData) {

            fetch('https://api.rawg.io/api/games?key=36f8d32955554c34a72966f03056c842&dates=2015-01-01,2021-12-31&ordering=-added&page=' + page)
                .then((response) => response.json())
                .then((data) => {
                    setGameList([...data.results])
                    console.log(data)
                })

            setIsGettingData(false)
        }
    }, [isGettingData])



    return (
        <div className='body'>
            <div className="container">
                <div className="warn__text">
                    *Prices are not real, and were made up for demonstration
                </div>
                {gameList
                    ?
                    <>
                        <div className="list">
                            {gameList.map((item) => <Card manageCart={manageCart} key={item.id} item={item} />)}
                        </div>
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
                    </>

                    :
                    <Preloader />
                }

            </div>
            {
                isGoodjustAdded ?
                    <div className="cart-flag">Product was added to cart</div>
                    :
                    null
            }
            <Cart
                setCart={setCart}
                cart={cart} />

        </div>
    )
}

export default Body