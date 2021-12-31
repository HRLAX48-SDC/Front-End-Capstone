import React, {useState} from 'react';
import axios from 'axios';
import { Button, Modal, closeButton, Form, Row, Col, FloatingLabel, Image} from 'react-bootstrap';
import API_KEY from '../../config/config.js';

const AddAnswer = (props) => {
  const [showModal, setModal] = useState(false);
  const handleShow = () => setModal(true);
  const handleClose = () => setModal(false);
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setphotos] = useState([]);

  const onFileChangeCapture = (e) => {
    const preview = document.querySelector('#q_ans_uploads_previews');
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      setphotos([...photos, preview.src]);
    };
    if(file) {
      reader.readAsDataURL(file);
    };
  };
  const postAnswer = (e) => {
    e.preventDefault();
    const answer_info = {
      body: body,
      name: name,
      email: email,
      photos: photos
    }
    console.log(answer_info);
    if(body.length > 1 && name.length > 1 && email.length > 1 && email.includes('@')) {
      console.log(answer_info);
      axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${props.question_id}/answers`, answer_info, {
        headers: { 'Authorization': `${API_KEY}` }
      })
        .then(response => {
          //console.log(response);
          alert('your question is successfully post.')
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
      if(!email.includes('@')) {
        alert('Please check your email format.')
      } else {
        alert('You must enter the all mandatory field.');
      };
    };
  };

  return (
    <div id='add_answer_button'>
      {' '}
      <Button  variant="outline-secondary" onClick={handleShow}>ADD A ANSWER</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 id='question_modal_title'>Submit your Answer</h3>
            <h6 id='question_modal_subtitle'>[Product Name]: [Question Body]</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridQuestion'>
                <Form.Label>Post your answer here</Form.Label>
                <Form.Control
                  as='textarea'
                  type='text'
                  name='body'
                  placeholder='Please enter a answer.'
                  style={{ height: '100px'}}
                  maxlength='1000'
                  onChange={(e) => setBody(e.target.value)}
                  ></Form.Control>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridNickname'>
                <Form.Label>What is your nickname?</Form.Label>
                <FloatingLabel controlId='floatingnickname' label='Example: jackson543!'>
                  <Form.Control
                    type='text'
                    name='name'
                    placeholder='Example: jackson543!'
                    maxlength='60'
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </FloatingLabel>
                <Form.Text className='text-muted'>
                  For privacy reasons, do not use your full name or email address
                </Form.Text>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridNickname'>
                <Form.Label>What is your email?</Form.Label>
                <FloatingLabel controlId='floatingemail' label='Example: jack@email.com'>
                  <Form.Control
                    type='email'
                    name='email'
                    placeholder='Example: jack@email.com'
                    maxlength='60'
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
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
                  onChange={onFileChangeCapture}/>
                {/* {photos.length > 0 && <img id='answer_photo' src='' height='200'>} */}
                <br/>
                <Image id='q_ans_uploads_previews' height='100' width='100'/>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleClose()}>Cancel</Button>
          <Button type='submit' onClick={postAnswer}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddAnswer;