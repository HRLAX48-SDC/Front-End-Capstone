import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Card, Stack } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import ReviewBody from './ReviewBody.jsx';

function ReviewTile(props) {
  const [reviewHelpfulNum, setReviewHelpfulNum] = useState(
    () => props.review.helpfulness
  );
  const [helpfulSelection, setHelpfulSelection] = useState(false);
  const [reported, setReported] = useState(false);

  const selectHelpful = () => {
    if (!helpfulSelection) {
      axios
        .put(
          `http://54.163.77.29/api/reviews/${props.review.reviews_id}/helpful`
        )
        .then((res) => {
          setReviewHelpfulNum(reviewHelpfulNum + 1);
          setHelpfulSelection(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const reportReview = () => {
    axios
      .put(`http://54.163.77.29/api/reviews/${props.review.reviews_id}/report`)
      .then((res) => {
        console.log('review reported');
        setReported(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Stack direction='horizontal' gap={3}>
            <Rating
              readonly={true}
              ratingValue={props.review.rating * 20}
              initialValue={props.review.rating * 20}
              allowHalfIcon={true}
              size={25}
            />
            {props.review.email ? (
              <>
                <div className='verified-user ms-auto'>✔ verified user</div>
                <div>{props.review.reviewer_name}</div>
              </>
            ) : (
              <div className='ms-auto'>{props.review.reviewer_name}</div>
            )}
            <div className='review-tile-date'>
              {moment(props.review.date).format('MMMM Do, YYYY')}
            </div>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.review.title}</Card.Title>
          <Card.Text>{props.review.summary}</Card.Text>
          <ReviewBody review={props.review} />
          <Stack direction='horizontal' gap={2}>
            <div>Was this review helpful?</div>
            <div className='review-helpful' onClick={() => selectHelpful()}>
              Yes
            </div>
            <div>({reviewHelpfulNum})</div>
            <div className='review-report' onClick={() => reportReview()}>
              Report
            </div>
            {props.review.recommend && (
              <div className='ms-auto'>I recommend this product. ✔</div>
            )}
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
}
export default ReviewTile;
