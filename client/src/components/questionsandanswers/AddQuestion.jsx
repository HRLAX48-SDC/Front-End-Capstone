import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  closeButton,
  Form,
  Row,
  Col,
  FloatingLabel,
} from 'react-bootstrap';
import API_KEY from '../../config/config.js';

const AddQuestion = (props) => {
  const [showModal, setModal] = useState(false);
  const handleShow = () => setModal(true);
  const handleClose = () => setModal(false);
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const postQuestion = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    const question_info = {
      body: body,
      name: name,
      email: email,
      product_id: props.product_id,
    };
    if (
      body.length > 1 &&
      name.length > 1 &&
      email.length > 1 &&
      email.includes('@')
    ) {
      axios
        .post(
          `http://54.219.72.194/qa/${props.product_id}/questions`,
          question_info
        )
        .then((response) => {
          //console.log(response);
          alert('your question is successfully post.');
          props.getAllQuestions(props.product_id);
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
      alert('You must enter the all mandatory field.');
    }
  };

  return (
    <div id='add_question_button'>
      <label className='mb-3'>Don't see the question you're looking for?</label>{' '}
      <Button
        className='question_add'
        variant='outline-secondary'
        onClick={handleShow}
      >
        ADD A QUESTION +
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 id='question_modal_title'>Ask your question</h3>
            <h6 id='question_modal_subtitle'>About the {props.product_name}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form novalidatie='true' validated={validated}>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridQuestion'>
                <Form.Label>
                  Post your question here<span id='q_mandatory'>*</span>
                </Form.Label>
                <FloatingLabel
                  controlId='floatingquestion'
                  label='Why did you like the product or not?'
                >
                  <Form.Control
                    as='textarea'
                    type='text'
                    name='body'
                    placeholder='Why did you like the product or not?'
                    style={{ height: '100px' }}
                    maxLength='1000'
                    onChange={(e) => setBody(e.target.value)}
                    className='add_question_body_input'
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    Please enter text for question
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridNickname'>
                <Form.Label>
                  What is your nickname?<span id='q_mandatory'>*</span>
                </Form.Label>
                <FloatingLabel
                  controlId='floatingnickname'
                  label='Example: jackson11!'
                >
                  <Form.Control
                    type='text'
                    name='name'
                    placeholder='Example: jackson11!'
                    maxLength='60'
                    onChange={(e) => setName(e.target.value)}
                    className='add_question_name_input'
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a username
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Form.Text className='text-muted'>
                  For privacy reasons, do not use your full name or email
                  address
                </Form.Text>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId='formGridNickname'>
                <Form.Label>
                  What is your email?<span id='q_mandatory'>*</span>
                </Form.Label>
                <FloatingLabel
                  controlId='floatingemail'
                  label='Example: jack@email.com'
                >
                  <Form.Control
                    type='email'
                    name='email'
                    placeholder='Example: jack@email.com'
                    maxLength='60'
                    onChange={(e) => setEmail(e.target.value)}
                    className='add_question_email_input'
                    pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a username
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Form.Text className='text-muted'>
                  For authentication reasons, you will not be emailed
                </Form.Text>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='addQ_cancel_btn'
            variant='secondary'
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            className='addQ_submit_btn'
            type='submit'
            onClick={postQuestion}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddQuestion;
