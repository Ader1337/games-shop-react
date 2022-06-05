import React from 'react'
import MyButton from './UI/MyButton';

function Card(props) {
    const { name, background_image, reviews_count, metacritic} = props.item
    return (
        <div className='card-item'>
            <img alt="image wasn't found" src={background_image} className="card-item__img"/>
            <div className="card-item__name">
                {name}
            </div>
            <div className="card-item__bottom">
                <div className="card-item__price">{reviews_count} ₴</div>
                <MyButton onClick={() => props.manageCart(props.item)} className="card-item__button">Add to cart</MyButton>
            </div>
            {
                metacritic 
                ?
                    <div className="meta-rate">
                        <div className="meta-value">{metacritic}</div>
                    </div>
                :
                null
            }
            
        </div>
    )
}

export default Card