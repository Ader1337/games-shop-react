import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context';
import MyButton from './UI/MyButton';
import Preloader from './UI/Preloader';
function ProductPage(props) {
    let API_KEY = process.env.REACT_APP_API_KEY
    let { slug } = useParams();
    const [productData, setProductData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    
    const { isCartOpen } = useContext(ShopContext)

    useEffect(() => {

        fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data)
                console.log(data)
                setIsLoading(false)
            })
    }, [])

    return (
        <div className={"container " + (isCartOpen ? 'blur' : '')}>
            {isLoading ?
                <Preloader />
                :
                <div className='product'>
                    <div className="product__top">
                        <div className="product__left">
                            {<img src={productData.background_image} alt="" className="product__main-img" />}

                        </div>
                        <div className="product__right">
                            <div className="product__name">{productData.name}</div>
                            <div className="product__genres">
                                {
                                    productData.genres.map((el) => {
                                        return (
                                            <div className="product__genre">
                                                {el.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="product__info">
                                <div className="product__info-cell">
                                    <div className="product__info-info">
                                        Developers:
                                    </div>
                                    <div className="product__info-value">
                                        {
                                            productData.developers.map((el, index) => {
                                                if (productData.developers.length > 1) {
                                                    if (index === productData.developers.length - 1)
                                                        return <span key={el.slug} className='product__info-value-item'> {el.name}</span>
                                                    return <span key={el.slug} className='product__info-value-item'> {el.name + ",  "}</span>
                                                } else {
                                                    return <span key={el.slug} className='product__info-value-item'>{el.name}</span>

                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                {
                                    productData.metacritic ?
                                        <div className="product__info-cell">
                                            <div className="product__info-info">
                                                Metacritic rate:
                                            </div>
                                            <div className="product__info-value">
                                                {productData.metacritic}
                                            </div>
                                        </div>
                                    :
                                    null
                                }
                                {
                                    productData.platforms ?
                                        <div className="product__info-cell">
                                            <div className="product__info-info">
                                                Platforms:
                                            </div>
                                            <div className="product__info-value">
                                                {productData.platforms.map((el, index) => {
                                                    if (productData.platforms.length > 1) {
                                                        if (index === productData.platforms.length - 1)
                                                            return <span key={el.platform.slug} className='product__info-value-item'> {el.platform.name}</span>
                                                        return <span key={el.platform.slug} className='product__info-value-item'> {el.platform.name + ",  "}</span>
                                                    } else {
                                                        return <span key={el.platform.slug} className='product__info-value-item'>{el.platform.name}</span>

                                                    }
                                                })}
                                            </div>
                                        </div>
                                    :
                                    null
                                }
                                
                                <div className="product__info-cell">
                                    <div className="product__info-info">
                                        Released:
                                    </div>
                                    <div className="product__info-value">
                                        {productData.released}
                                    </div>
                                </div>
                               
                                <div className="product__price">
                                    {productData.ratings_count} ₴
                                </div>
                                <MyButton onClick={() => props.manageCart(productData)}>Add to cart</MyButton>
                            </div>
                        </div>
                    </div>
                    <div className="product__bottom">
                        <div className="product__dscr-title">
                            Description: 
                        </div>
                        <p className="product__dscr">
                            {productData.description_raw}             
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductPage