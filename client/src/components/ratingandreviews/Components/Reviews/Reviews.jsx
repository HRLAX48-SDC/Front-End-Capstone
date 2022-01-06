import React, { useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js'
import { Button, Card, Stack } from 'react-bootstrap';
import ReviewTile from './ReviewTile.jsx';
import SortDropdown from './SortDropdown.jsx';
import SubmitReview from './SubmitReview.jsx';
import Search from './Search.jsx';


function Reviews (props) {
    const [reviewNum, setReviewNum] = useState(2);
    const slicedReviews = props.reviewList.slice(0, reviewNum);
    const [search, setSearch] = useState('');


    const searchReviews = (reviewList, input) => {
        if(!input || input.length < 3) {
            return reviewList;
        }
        return reviewList.filter((review) => {
            const summary = review.summary.toLowerCase();
            const body = review.body.toLowerCase();
            return summary.includes(input.toLowerCase()) || body.includes(input.toLowerCase())
        });
    }

    const loadMore = () => {
        setReviewNum(reviewNum + 2);
    }

    const searchResults = searchReviews(slicedReviews, search);

    return (
        <>
        {/* { props.reviewList ?  */}
        { searchResults ?
        <>
        <Card>
        <Card.Title>
            <Stack direction="horizontal" gap={2} className="reviews-dropdown-stack">
                <div>Displaying</div>
                <div>{searchResults.length} / {props.reviewList.length}</div>
                <div>reviews, sorted by:</div>
                <SortDropdown sortBy={props.sortBy}/>
                <div className="ms-auto" >
                    <SubmitReview product={props.product} metaData={props.metaData}/>
                </div>
            </Stack>
            <div className="search-bar">
                <Search search={search} setSearch={setSearch}/>
            </div>
        </Card.Title>
        </Card>
        <Card className="reviews-list">
        <Card.Body>
            <Stack gap={3}>
                {searchResults.map(review => (
                    <ReviewTile key={review.review_id} review={review}/>
                ))}
                {props.reviewList.length > 2 && reviewNum <= props.reviewList.length &&
                <Button variant="outline-secondary" onClick={() => loadMore()}>Show more reviews</Button>
                }
            </Stack>
        </Card.Body>
        </Card>
        </>
        :   <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
      </>
    )
};
export default Reviews;