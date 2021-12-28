import React, { useState, useEffect } from 'react';
import ActionButton from './ActionButton.jsx';
import axios from 'axios';
import API_KEY from '../../config/config.js';

//sample data. Need to make /products/:id/styles query to retrieve
import styleCall from './data/sampleDataProductCard.js';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: this.props.product.category.toUpperCase(),
      imageUrl: '',
      // styleCall.results[0].photos[0].thumbnail_url;
      expandedProductName: this.props.product.name + ' - ' + styleCall.results[0].name,
      price: this.props.product.default_price,
      rating: (Number(this.props.ratings[1]) * 1 + Number(this.props.ratings[2]) * 2 + Number(this.props.ratings[3]) * 3 + Number(this.props.ratings[4]) * 4 + Number(this.props.ratings[5]) * 5)/ (Number(this.props.ratings[1]) + Number(this.props.ratings[2]) + Number(this.props.ratings[3]) + Number(this.props.ratings[4]) + Number(this.props.ratings[5]))
    }
  }

  componentDidMount(){
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${this.props.product.id}/styles`, {
    headers: {
      'Authorization': `${API_KEY}`
      }
    })
    .then((product) => (
      this.setState({
        imageUrl: product.data.results[0].photos[0].thumbnail_url
      })
    ))
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <div className="imageContainer">
          <img src={this.state.imageUrl}/>
        </div>
        <div className="buttonContainer">
          <ActionButton />
        </div>
        <div>
          <div>{this.state.category}</div>
          <div>{this.state.expandedProductName}</div>
          <div>${this.state.price}</div>
          <div>{this.state.rating}</div>
        </div>
      </div>
    )
  }
}

export default ProductCard;