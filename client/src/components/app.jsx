import React from 'react';
import ProductDetails from './productdetails/ProductDetails.jsx';
import axios from 'axios';
import RelatedItems from './relateditems/RelatedItems.jsx';
import QuestionsAndAnswers from './questionsandanswers/QuestionsAndAnswers.jsx';
import RatingAndReviews from './ratingandreviews/RatingAndReviews.jsx';
// import withClick from './withClick.jsx';

// const ProductDetailsWithClick = withClick(ProductDetails);
// const RelatedItemsWithClick = withClick(RelatedItems);
// const QuestionsAndAnswersWithClick = withClick(QuestionsAndAnswers);
// const RatingAndReviewsWithClick = withClick(RatingAndReviews);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {
        id: 42366,
        campus: '',
        name: '',
        slogan: '',
        description: '',
        category: '',
        default_price: '',
        created_at: '',
        updated_at: '',
      },
      ratings: {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
      },
      metaData: {},
    };
    this.getProductViaId = this.getProductViaId.bind(this);
    this.getReviewsMeta = this.getReviewsMeta.bind(this);
  }

  componentDidMount() {
    this.getProductViaId(42366); //placeholder number
    this.getReviewsMeta(42366);
  }

  getProductViaId(id) {
    //  /products/:product_id

    axios
      .get(`http://13.57.182.185/api/products/${id}`)
      .then((response) => {
        this.setState({
          product: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getReviewsMeta(id) {
    //  /reviews/meta
    axios
      .get(`http://54.163.77.29/api/product/${id}/reviews/meta`)
      .then((response) => {
        this.setState({
          ratings: response.data.ratings,
          metaData: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div id='main-app-container'>
        <ProductDetails
          product={this.state.product}
          ratings={this.state.ratings}
        />
        <RelatedItems
          productid={this.state.product.id}
          featuredProd={this.state.product}
          chooseProduct={this.getProductViaId}
        />
        <QuestionsAndAnswers product={this.state.product} />
        <RatingAndReviews
          product={this.state.product}
          metaData={this.state.metaData}
        />
      </div>
    );
  }
}

export default App;
