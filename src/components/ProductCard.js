import React from "react";
import { redirect } from "react-router-dom";
import { useLocalStorage } from '@uidotdev/usehooks';
import { Link } from 'react-router-dom';

function ProductCard({ data }) {
    const [favourites, setFavourites] = useLocalStorage('favourites')

    const handleDeleteFromFavourites = e => {
      const id = e.target.getAttribute('movie-id')
      setFavourites(favourites.filter(m => m.id != id))
      return redirect("/favourites")
    }
  
  return (
    <div>

          <div className="card">
            <div className="card-pill">Sale</div>
            <img
              className="card-img"
              src={data.image}
              alt="product-image"
            />
            <p className="product-name"> {data.title.substring(0, 20)}...</p>
            <div className="flex-row">
              <p className="price"> 
                $<span>{data.price}</span>
              </p>
            </div>
            <div className="btn-col">
                <Link to={`/product/${data.id}/details`} className="icon-link">
                    View
                    <i className="bi bi-arrow-up-right-circle"></i>
                </Link>
            </div>
          </div>
    </div>
  );
}

export default ProductCard;
