import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Stack, Row } from 'react-bootstrap';
import axios from 'axios';
import API_KEY from '../../config/config.js';
import AnswerPhotos from './AnswerPhotos.jsx';

const IndividualAnswer = (props) => {
  const answer_id = props.answer.answer_id;
  const [a_helpful_count, setACount] = useState(() => {
    return props.answer.helpfulness;
  });
  const [markHelp, setMark] = useState(false);
  const markHelpful = () => {
    axios
      .put(`http://54.219.72.194/qa/answers/${answer_id}/helpful`)
      .then((response) => {
        setACount(a_helpful_count + 1);
        setMark(true);
      })
      .catch((err) => console.error(err));
  };

  const [reported, setReported] = useState(false);
  const markReport = () => {
    axios
      .put(`http://54.219.72.194/qa/answers/${answer_id}/report`)
      .then((response) => {
        setReported(true);
      })
      .catch((err) => console.error(err));
  };
  const photos = props.answer.photos;

  const [isSeller, setIsSeller] = useState(
    props.answer.answerer_name === 'Seller' ||
      props.answer.answerer_name === 'seller'
  );

  return (
    <div key={props.answer.answer_id}>
      <div id='q-individual_a_container'>
        <div id='q_a_row1'>{props.answer.body}</div>
        <Row id='q_a_row2'>
          <Stack direction='horizontal' gap={2}>
            <div id='q_a_row2_name'>
              {isSeller ? (
                <div>
                  by <b>Seller</b>,{' '}
                  {moment(props.answer.date).format('MMMM Do YYYY')}
                </div>
              ) : (
                <div>
                  by {props.answer.answerer_name},{' '}
                  {moment(props.answer.date).format('MMMM Do YYYY')}
                </div>
              )}
            </div>
            <div className='vr' />
            <div id='q_a_row2_markAHelpful'>
              {!markHelp ? (
                <div>
                  <label> Helpful? </label>
                  <u id='q_helpful' onClick={() => markHelpful()}>
                    Yes
                  </u>
                  <span>({a_helpful_count})</span>
                </div>
              ) : (
                <div className='a_help_afterclick'>
                  <label> Helpful? </label>
                  <label>Yes({a_helpful_count})</label>
                </div>
              )}
            </div>
            <div className='vr' />
            <div id='q_a_row2_markAReport'>
              {!reported ? (
                <u id='q_report' onClick={() => markReport()}>
                  Report
                </u>
              ) : (
                <label className='a_reported'>Reported</label>
              )}
            </div>
          </Stack>
        </Row>
        <Row id='q_a_row3'>
          {photos.length > 0 && (
            <div>
              <label>Yes, as you can see in these photos.</label>
              <AnswerPhotos photos={photos} />
            </div>
          )}
        </Row>
        <br></br>
      </div>
    </div>
  );
};

export default IndividualAnswer;
