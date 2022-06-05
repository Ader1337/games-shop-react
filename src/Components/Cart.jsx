import React, { useState, useEffect } from 'react'
import MyButton from './UI/MyButton';
import CartItem from './CartItem';
function Cart(props) {
    const { cart, setCart } = props
    const [totalSum, setTotalSum] = useState(0)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const changeCartPopupStatus = () => {
        setIsCartOpen(!isCartOpen)
    }
    const deleteGood = (id) => {
        setCart(cart.filter((item) => item.id !== id))
    }

   

    const addDublicateToCart = (id) => {
        let indexEl = cart.findIndex((el) => el.id === id)
        setCart(cart.map((item, index) => index === indexEl ? { ...item, count: item.count + 1 } : item))
    }
    const removeDublicateFromCart = (id, crrCount) => {
        let indexEl = cart.findIndex((el) => el.id === id)
        if (crrCount !== 1) {
            setCart(cart.map((item, index) => index === indexEl ? { ...item, count: item.count - 1 } : item))
        }
    }
    useEffect(()=> {
        if (isCartOpen){
            document.body.style.marginRight = "17px"
            document.body.style.overflow = 'hidden';
        }else {
            document.body.style.marginRight = "0px"
            document.body.style.overflow = 'unset';
        }
    }, [isCartOpen])
    useEffect(() => {
        let total = 0

        if (cart.length === 0) {
            setIsCartOpen(false)
        }
        cart.forEach((item) => total += item.reviews_count * item.count)
        setTotalSum(total)
    }, [cart])


    return (
        <div className="cart-wrapper">
            {
                cart.length > 0 ?
                    <button onClick={changeCartPopupStatus} className="cart-button">
                        <svg fill='#fff' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </button>
                    :
                    null
            }
            {
                isCartOpen ?
                    <div className="cart">
                        <div className="cart__inner">
                            <div className="cart__top">
                                <div className="cart__title">
                                    Your cart
                                </div>
                                <div onClick={changeCartPopupStatus} className="cart__close">
                                    ×
                                </div>
                            </div>
                            <div className="cart__body">
                                {cart.map((item) => <CartItem 
                                    key={item.id}
                                    removeDublicateFromCart={removeDublicateFromCart}
                                    addDublicateToCart={addDublicateToCart}
                                    deleteGood={deleteGood}
                                    item={item} />)}
                            </div>
                            <div className="cart__total">Total sum: {totalSum} ₴</div>
                            <MyButton className="cart__buy">Сheckout</MyButton>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Cart