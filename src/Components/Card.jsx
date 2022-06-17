import React from 'react'
import MyButton from './UI/MyButton';
import { Link  } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';


function Card(props) {
    const { name, background_image, reviews_count, metacritic,id } = props.item
    return (
        <div className='card-item'>
            <Link className='card-item__link' to={"/" + id}>
                {
                    background_image ?
                             <LazyLoadImage loading="lazy" decoding="async" height='350px' className="card-item__img" src={background_image}/> 
                        :
                            <img alt="wasn't found" src={`https://dummyimage.com/320x350/cfcdcf/272a54&text=Img+weren't+found`} className="card-item__img" />
                }
                
            </Link>
            <Link className='card-item__link card-item__name-link' to={"/" + id}>
                <div className="card-item__name">
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