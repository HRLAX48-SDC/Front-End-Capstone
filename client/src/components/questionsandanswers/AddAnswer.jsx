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
  Image,
} from 'react-bootstrap';
import API_KEY from '../../config/config.js';
import AddAnswerPreview from './AddAnswerPreview.jsx';

const AddAnswer = (props) => {
  const [showModal, setModal] = useState(false);
  const handleShow = () => setModal(true);
  const handleClose = () => setModal(false);
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setphotos] = useState([]);
  const [file, setFile] = useState('');
  const [validated, setValidated] = useState(false);
  const [photomax, setPhotomax] = useState(false);

  const onFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setPhotomax(true);
    } else {
      files.forEach((image) => {
        uploadImage(image);
      });
    }
  };
  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rp7rer9y');
    fetch('https://api.cloudinary.com/v1_1/dtnikmimx/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setphotos((photos) => [...photos, res.secure_url]);
      });
  };

  const postAnswer = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    const answer_info = {
      body: body,
      name: name,
      email: email,
      photos: photos,
    };
    if (
      body.length > 1 &&
      name.length > 1 &&
      email.length > 1 &&
      email.includes('@')
    ) {
      axios
        .post(
          `http://54.219.72.194/qa/questions/${props.question_id}/answers`,
          answer_info
        )
        .then((response) => {
          alert('your answer is successfully post.');
          props.getAllAnswers();
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
      alert('You must enter the all mandatory field.');
    }
  };

  return (
    <div id='add_answer_button'>
      {' '}
      <Button
        className='answer_add'
        variant='outline-secondary'
        size='sm'
        onClick={handleShow}
      >
        ADD AN ANSWER
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 id='question_modal_title'>Submit your Answer</h3>
            <h6 id='question_modal_subtitle'>
              {props.product_name}: {props.question_body}
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form novalidatie='true' validated={validated}>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridQuestion'>
                <Form.Label>
                  Post your answer here<span id='q_mandatory'>*</span>
                </Form.Label>
                <Form.Control
                  as='textarea'
                  type='text'
                  name='body'
                  placeholder='Please enter a answer.'
                  style={{ height: '100px' }}
                  maxLength='1000'
                  onChange={(e) => setBody(e.target.value)}
                  className='add_answer_body_input'
                  value={body}
                  required
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Please enter text for answer
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridNickname'>
                <Form.Label>
                  What is your nickname?<span id='q_mandatory'>*</span>
                </Form.Label>
                <FloatingLabel
                  controlId='floatingnickname'
                  label='Example: jackson543!'
                >
                  <Form.Control
                    type='text'
                    name='name'
                    placeholder='Example: jackson543!'
                    maxLength='60'
                    onChange={(e) => setName(e.target.value)}
                    className='add_answer_name_input'
                    value={name}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a username<span id='q_mandatory'>*</span>
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Form.Text className='text-muted'>
                  For privacy reasons, do not use your full name or email
                  address
                </Form.Text>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
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
                    className='add_answer_email_input'
                    value={email}
                    pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a valid email
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Form.Text className='text-muted'>
                  For authentication reasons, you will not be emailed
                </Form.Text>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId='formGridphotos'>
                <Form.Label>Upload photos here</Form.Label>
                <Form.Control
                  type='file'
                  accept='image/png, image/jpeg'
                  className='add_answer_photo_input'
                  onChange={onFileChange}
                  multiple
                />
                {photomax && <span>Sorry, maximum 5 photos</span>}
                <br />
                <AddAnswerPreview photos={photos} />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='addA_cancel_btn'
            variant='secondary'
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            className='addA_submit_btn'
            type='submit'
            onClick={postAnswer}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddAnswer;
