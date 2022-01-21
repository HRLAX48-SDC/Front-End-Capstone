import React, { useState, useEffect } from 'react';
import Answers from './Answers.jsx';
import { Button, Stack, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import API_KEY from '../../config/config.js';

const IndividualQuestion = (props) => {
  const question_id = props.question.question_id;

  const [q_helpful_count, setQCount] = useState(() => {
    return props.question.question_helpfulness;
  });
  const [markHelp, setMark] = useState(false);
  const markHelpful = () => {
    axios
      .put(`http://54.219.72.194/qa/questions/${question_id}/helpful`)
      .then((response) => {
        setQCount(q_helpful_count + 1);
        setMark(true);
      })
      .catch((err) => console.error(err));
  };

  const [reported, setReported] = useState(false);
  const markReport = () => {
    axios
      .put(`http://54.219.72.194/qa/questions/${question_id}/report`)
      .then((response) => {
        setReported(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container className='q_individual_q_grid' fluid='md'>
      <Row id='q_grid_row1'>
        <Col id='q_grid_row1_col1' xs={1}>
          <strong className='q_title'>Q:</strong>
        </Col>
        <Col id='q_grid_row1_col2'>
          <strong className='q_body'>{props.question.question_body}</strong>
        </Col>
        <Col id='q_grid_row1_col3' md={4}>
          <Stack direction='horizontal' gap={2}>
            <div className='ms-auto'>
              {!markHelp ? (
                <div>
                  <label>Helpful? </label>
                  <u id='q_helpful' onClick={() => markHelpful()}>
                    Yes
                  </u>
                  <span>({q_helpful_count})</span>
                </div>
              ) : (
                <div className='q_help_afterclick'>
                  <label>Helpful?</label>
                  <label>Yes({q_helpful_count})</label>
                </div>
              )}
            </div>
            <div className='vr' />
            <div>
              {!reported ? (
                <u id='q_report' onClick={() => markReport()}>
                  Report
                </u>
              ) : (
                <label className='q_reported'>Reported</label>
              )}
            </div>
          </Stack>
        </Col>
      </Row>
      <Answers question={props.question} product_name={props.product_name} />
      <br></br>
    </Container>
  );
};

export default IndividualQuestion;
