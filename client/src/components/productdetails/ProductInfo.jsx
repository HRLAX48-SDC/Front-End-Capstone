import React, {useState, useEffect} from 'react';
import StarRating from './StarRating.jsx';
import Thumbnail from './Thumbnail.jsx';
import SizeAndQuantity from './SizeAndQuantity.jsx';
import Image from './Image.jsx';
import Cart from './Cart.jsx';
import Favorite from './Favorite.jsx';


function ProductInfo(props) {

  return (
    <div className="row">

      <div className="col-md-6">
        <div className="product-grid">
          <Image style={props.style}/>
        </div>
      </div>
      <div className="product-content col-md-5">
        <StarRating />
        <h4>{props.info.category}</h4>
        <h1 className="p_title"><a href="#">{props.info.name}</a></h1>
        <div className="p_price">
            <span>{props.info.sale_price ? $props.info.sale_price : null}</span>
            ${props.info.default_price}
        </div>
        <div>
          <b>STYLE > </b><span>SELECTED STYLE</span>
          <Thumbnail style={props.style}/>
        </div>
        <SizeAndQuantity />
        <Cart />
        <Favorite />
        <div>
          {props.info.description}
        </div>
        <div>
          <a className="p_share_icon" href="https://www.facebook.com/">
            <i className="fab fa-facebook-square fa-lg"></i>
          </a>
          <a className="p_share_icon" href="https://twitter.com/home">
            <i className="fab fa-twitter-square fa-lg"></i>
          </a>
          <a className="p_share_icon" href="https://www.pinterest.com/">
            <i className="fab fa-pinterest-square fa-lg"></i>
          </a>
        </div>
      </div>

    </div>
  );
};

export default ProductInfo;