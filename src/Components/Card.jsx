import React from 'react'
import MyButton from './UI/MyButton';
import { Link  } from 'react-router-dom';

function Card(props) {
    const { name, background_image, reviews_count, metacritic,id } = props.item
    return (
        <div className='card-item'>
            <Link className='card-item__link' to={"/" + id}>
                {
                    background_image ?
                        <figure> <img alt="wasn't found" src={background_image} className="card-item__img" /></figure>
                        :
                        <figure><img alt="wasn't found" src={`https://dummyimage.com/320x350/cfcdcf/272a54&text=Img+weren't+found`} className="card-item__img" /></figure>
                }
                <div  className="card-item__name">
                    {name}
                </div>
            </Link>
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