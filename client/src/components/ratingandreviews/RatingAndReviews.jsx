import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Stack } from 'react-bootstrap';
import Ratings from './Components/Ratings/Ratings.jsx';
import Reviews from './Components/Reviews/Reviews.jsx';

function RatingAndReviews(props) {
  const [id, setId] = useState(42366);
  const [metaData, setMetaData] = useState([]);
  const [sort, setSort] = useState('relevant');
  const [reviewList, setReviewList] = useState([]);
  const [filteredReviewList, setFilteredReviewList] = useState([]);
  const [filteredBy, setFilteredBy] = useState({
    five: false,
    four: false,
    three: false,
    two: false,
    one: false,
  });

  useEffect(() => {
    if (props.product.id) {
      setId(props.product.id);
    }
  }, [props.product.id]);

  useEffect(() => {
    getReviews(id, sort);
    getMetaData(id);
  }, [id]);

  useEffect(() => {
    getReviews(id, sort);
  }, [sort]);

  useEffect(() => {
    createFilteredList();
  }, [filteredBy]);

  const sortBy = (option) => {
    setSort(option);
  };

  const resetFiltered = () => {
    setFilteredBy({
      five: false,
      four: false,
      three: false,
      two: false,
      one: false,
    });
  };

  const toggleFiltered = (option) => {
    if (filteredBy[option] === false) {
      setFilteredBy({ ...filteredBy, [option]: true });
    } else if (filteredBy[option] === true) {
      setFilteredBy({ ...filteredBy, [option]: false });
    }
  };

  const createFilteredList = () => {
    const filterNumbers = [];
    const reviewStorage = [];
    if (filteredBy.five) filterNumbers.push(5);
    if (filteredBy.four) filterNumbers.push(4);
    if (filteredBy.three) filterNumbers.push(3);
    if (filteredBy.two) filterNumbers.push(2);
    if (filteredBy.one) filterNumbers.push(1);
    reviewList.forEach((review) => {
      if (filterNumbers.indexOf(review.rating) > -1) {
        reviewStorage.push(review);
      }
    });
    if (reviewStorage.length === 0) {
      setFilteredReviewList(reviewList);
    } else {
      setFilteredReviewList(reviewStorage);
    }
  };

  const getReviews = (id, sort) => {
    axios
      .get(`http://54.163.77.29/api/product/${id}/reviews`)
      .then((response) => {
        setReviewList(response.data[0].results);
        setFilteredReviewList(response.data[0].results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMetaData = (id) => {
    axios
      .get(`http://54.163.77.29/api/product/${id}/reviews/meta`)
      .then((response) => {
        setMetaData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h5 className='rating-reviews-title'>RATINGS AND REVIEWS</h5>
      <div id='rating-reviews-main'>
        <Stack direction='horizontal' gap={3}>
          <Card style={{ width: '26rem' }}>
            <Ratings
              metaData={metaData}
              toggleFiltered={toggleFiltered}
              filteredBy={filteredBy}
              resetFiltered={resetFiltered}
            />
          </Card>
          <Card style={{ width: '55rem' }}>
            <Reviews
              reviewList={filteredReviewList}
              product={props.product}
              metaData={metaData}
              sortBy={sortBy}
              getReviews={getReviews}
            />
          </Card>
        </Stack>
      </div>
    </>
  );
}

export default RatingAndReviews;
