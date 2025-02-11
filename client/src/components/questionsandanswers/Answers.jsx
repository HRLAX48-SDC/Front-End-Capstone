import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../config/config.js';
import IndividualAnswer from './IndividualAnswer.jsx';
import { Container, Row, Col, Stack, Button } from 'react-bootstrap';
import AddAnswer from './AddAnswer.jsx';

const Answers = (props) => {
  const [question_id, setQId] = useState(() => props.question.question_id);
  useEffect(() => {
    if (props.question.question_id) {
      setQId(props.question.question_id);
    }
  }, [props.question.question_id]);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    getAllAnswers();
  }, [question_id]);
  const getAllAnswers = () => {
    axios
      .get(`http://54.219.72.194/qa/questions/${question_id}/answers`)
      .then((response) => {
        setAnswers(response.data.results);
      })
      .catch((err) => console.error(err));
  };
  const ansLength = answers.length;
  const [ansPerPage, setAnsPerPage] = useState(2);
  const loadMoreAns = () => {
    //setAnsPerPage(ansPerPage + 2);
    setAnsPerPage(ansLength);
  };
  const collapse = () => {
    setAnsPerPage(2);
  };
  const sliceAns = answers.slice(0, ansPerPage);
  const changeBtnMode = () => {
    if (ansPerPage < ansLength) {
      return (
        <strong id='a_loadBtn' onClick={() => loadMoreAns()}>
          LOAD MORE ANSWERS({answers.length - sliceAns.length})
        </strong>
      );
    } else {
      return (
        <strong id='a_collapseBtn' onClick={() => collapse()}>
          COLLAPSE ANSWERS
        </strong>
      );
    }
  };
  return (
    <div>
      <Row id='q_grid_row2'>
        <Col id='q_grid_row2_col1' xs={1}>
          <strong>A:</strong>
        </Col>
        <Col className='q_answerslist' id='q_grid_row2_col2'>
          {sliceAns.map((answer, index) => (
            <IndividualAnswer answer={answer} key={answer.answer_id} />
          ))}
          <Col>
            <Stack direction='horizontal' gap={2}>
              {answers.length > 2 && changeBtnMode()}
              <AddAnswer
                question_id={question_id}
                question_body={props.question.question_body}
                product_name={props.product_name}
                getAllAnswers={getAllAnswers}
              />
            </Stack>
          </Col>
        </Col>
      </Row>
    </div>
  );
};
export default Answers;
