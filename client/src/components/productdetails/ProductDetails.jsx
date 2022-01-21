import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../config/config.js';
import Navbar from './Navbar.jsx';
import ProductInfo from './ProductInfo.jsx';

function ProductDetails(props) {
  const [id, setId] = useState(42366);
  useEffect(() => {
    setId(props.product.id);
  }, [props]);

  const [style, setStyle] = useState({
    product_id: 0,
    results: [],
  });

  const [ratings, setRatings] = useState({});

  useEffect(() => {
    getStyle(id);
    getReviewsMeta(id);
  }, [id]);

  const getStyle = (id) => {
    axios
      .get(`http://13.57.182.185/api/products/${id}/styles`)
      .then((response) => {
        setStyle(response.data);
      })
      .catch((err) => {
        return;
      });
  };

  const getReviewsMeta = (id) => {
    axios
      .get(`http://54.163.77.29/api/product/${id}/reviews/meta`)
      .then((response) => {
        setRatings(response.data.ratings);
      })
      .catch((err) => {
        return;
      });
  };

  return (
    <div>
      <Navbar />
      <div className='p_announcement'>
        SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT{' '}
        <span className='p_offer'>OFFER</span> --{' '}
        <span className='p_highlight'>NEW PRODUCT HIGHLIGHT</span>
      </div>
      <ProductInfo
        info={props.product}
        style={style.results}
        ratings={ratings}
      />
    </div>
  );
}

export default ProductDetails;
