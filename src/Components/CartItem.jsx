import React from 'react'
import '../style.scss'
import MyButton from './UI/MyButton';
function CartItem(props) {
  const { name, reviews_count, id, count } = props.item
  console.log(props.item)
  return (
    <div className='cart-item'>
      <div className="cart-item__top">
        <div className="cart-item__name">{name}</div>
        <div className="cart-item__top-left">
          <div className="cart-item__count">
            <MyButton onClick={() => props.addDublicateToCart(id)}>+</MyButton>
            <div className="cart-item__count-value">{count}</div>
            <MyButton onClick={() => props.removeDublicateFromCart(id,count)}>-</MyButton>
          </div>
          <div onClick={() => props.deleteGood(id)} className="cart-item__delete"> ×</div>
        </div>
      </div>
      <div className="cart-item__bottom">
        <div className="cart-item__price">Price: {reviews_count * count}₴</div>
      </div>

    </div>
  )
}

export default CartItem