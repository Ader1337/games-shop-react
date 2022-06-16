import React, { useContext, useRef } from 'react'
import { ShopContext } from './../context';
import '../style.scss'
import Card from './Card';
import Preloader from './UI/Preloader';
import  ReactPaginate  from 'react-paginate';

function GoodsList(props) {
    const { paginate, gameList, isCartOpen } = useContext(ShopContext)

   
    return (
        <div className={"body__inner container " + (isCartOpen ? 'blur' : '')} >
            <div className="warn__text">
                *Prices are not real, and were made up for demonstration
            </div>
            {gameList
                ?
                <>
                    <div className="list">
                        {gameList.map((item) => <Card  manageCart={props.manageCart} key={item.id} item={item} />)}
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
    )
}

export default GoodsList