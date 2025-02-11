import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Radios from '../../radioData/radioData.js';
import { Rating } from 'react-simple-star-rating';
import {
  Button,
  Stack,
  Form,
  Modal,
  Accordion,
  FloatingLabel,
  ToggleButton,
  Image,
  ToggleButtonGroup,
} from 'react-bootstrap';

function SubmitReview(props) {
  const [showModal, setShowModal] = useState(false);
  const [appChars, setAppChars] = useState([]);
  const [stars, setStars] = useState(0);

  const [recommended, setRecommended] = useState(null);
  const [size, setSize] = useState(null);
  const [width, setWidth] = useState(null);
  const [comfort, setComfort] = useState(null);
  const [quality, setQuality] = useState(null);
  const [length, setLength] = useState(null);
  const [fit, setFit] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const findAppChars = () => {
    if (props.metaData.characteristics !== undefined) {
      const charArr = Object.keys(props.metaData.characteristics);
      setAppChars(charArr);
    }
  };
  useEffect(() => {
    findAppChars();
  }, [props.metaData.characteristics]);

  const handleRating = (rate) => {
    setStars(rate);
  };

  const storeImages = (e) => {
    const imagePreview = document.querySelector('#submit-image-previews');
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rp7rer9y');
    fetch('https://api.cloudinary.com/v1_1/dtnikmimx/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setPhotos([res.url]);
      })
      .catch((err) => console.log(err));
  };

  const postReview = (e) => {
    e.preventDefault();
    const factorsObj = {};
    if (props.metaData.characteristics) {
      if (props.metaData.characteristics.Size) {
        const sizeKey = props.metaData.characteristics.Size.id;
        factorsObj[sizeKey] = Number(size);
      }
      if (props.metaData.characteristics.Width) {
        const widthKey = props.metaData.characteristics.Width.id;
        factorsObj[widthKey] = Number(width);
      }
      if (props.metaData.characteristics.Comfort) {
        const comfortKey = props.metaData.characteristics.Comfort.id;
        factorsObj[comfortKey] = Number(comfort);
      }
      if (props.metaData.characteristics.Quality) {
        const qualityKey = props.metaData.characteristics.Quality.id;
        factorsObj[qualityKey] = Number(quality);
      }
      if (props.metaData.characteristics.Length) {
        const lengthKey = props.metaData.characteristics.Length.id;
        factorsObj[lengthKey] = Number(length);
      }
      if (props.metaData.characteristics.Fit) {
        const fitKey = props.metaData.characteristics.Fit.id;
        factorsObj[fitKey] = Number(fit);
      }
    }
    const bodyParams = {
      // product_id: props.product.id,
      rating: stars / 20,
      summary: summary,
      body: body,
      recommend: Boolean(recommended),
      name: nickname,
      email: email,
      photos: photos,
      characteristics: factorsObj,
    };
    if (
      Object.keys(factorsObj).length === Object.values(factorsObj).length &&
      recommended !== null &&
      stars !== 0
    ) {
      axios
        .post(
          `http://54.163.77.29/api/product/${props.product.id}/reviews`,
          bodyParams
        )
        .then((res) => {
          alert('Your review was submitted.');
          props.getReviews();
          handleClose();
        })
        .catch((err) => console.log(err, bodyParams));
    }
  };

  return (
    <div>
      <Button
        className='open-modal'
        variant='outline-secondary'
        onClick={handleShow}
      >
        Submit Review
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop='static'
        size='lg'
        dialogClassName='modal-90w'
      >
        <Modal.Header closeButton>
          <Modal.Title>My Review of "{props.product.name}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='submit-modal' onSubmit={postReview}>
            <Stack gap={3}>
              <Rating
                onClick={handleRating}
                ratingValue={stars}
                showTooltip={true}
                tooltipDefaultText='Your Rating*'
                tooltipArray={['Poor', 'Fair', 'Average', 'Good', 'Great']}
              />

              <b>Do you recommend this product?*</b>
              <ToggleButtonGroup
                className='mb-2'
                name='recommendOptions'
                size='sm'
              >
                {Radios.recommended.map((radio, i) => (
                  <ToggleButton
                    size='sm'
                    key={i}
                    id={`radioRec-${i}`}
                    type='radio'
                    variant={
                      i % 2 === 0 ? 'outline-primary' : 'outline-secondary'
                    }
                    name='radio'
                    value={radio.value}
                    checked={recommended === radio.value}
                    onChange={(e) => setRecommended(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              {appChars.indexOf('Size') > -1 ? (
                <>
                  <b>Size*</b>
                  <ToggleButtonGroup
                    className='mb-2'
                    name='sizeOptions'
                    size='sm'
                  >
                    {Radios.size.map((radio, i) => (
                      <ToggleButton
                        key={i}
                        id={`radioSize-${i}`}
                        type='radio'
                        variant='outline-primary'
                        name='radio'
                        value={radio.value}
                        checked={size === radio.value}
                        onChange={(e) => setSize(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </>
              ) : (
                <></>
              )}
              {appChars.indexOf('Width') > -1 ? (
                <>
                  <b>Width*</b>
                  <ToggleButtonGroup
                    className='mb-2'
                    name='widthOptions'
                    size='sm'
                  >
                    {Radios.width.map((radio, i) => (
                      <ToggleButton
                        key={i}
                        id={`radioWidth-${i}`}
                        type='radio'
                        variant='outline-primary'
                        name='radio'
                        value={radio.value}
                        checked={width === radio.value}
                        onChange={(e) => setWidth(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </>
              ) : (
                <></>
              )}
              {appChars.indexOf('Comfort') > -1 ? (
                <>
                  <b>Comfort*</b>
                  <ToggleButtonGroup
                    className='mb-2'
                    name='comfortOptions'
                    size='sm'
                  >
                    {Radios.comfort.map((radio, i) => (
                      <ToggleButton
                        key={i}
                        id={`radioComfort-${i}`}
                        type='checkbox'
                        variant='outline-primary'
                        name='checkbox'
                        value={radio.value}
                        checked={comfort === radio.value}
                        onChange={(e) => setComfort(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </>
              ) : (
                <></>
              )}
              {appChars.indexOf('Quality') > -1 ? (
                <>
                  <b>Quality*</b>
                  <ToggleButtonGroup
                    className='mb-2'
                    name='qualityOptions'
                    size='sm'
                  >
                    {Radios.width.map((radio, i) => (
                      <ToggleButton
                        key={i}
                        id={`radioQuality-${i}`}
                        type='radio'
                        variant='outline-primary'
                        name='radio'
                        value={radio.value}
                        checked={quality === radio.value}
                        onChange={(e) => setQuality(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </>
              ) : (
                <></>
              )}
              {appChars.indexOf('Length') > -1 ? (
                <>
                  <b>Length*</b>
                  <ToggleButtonGroup
                    className='mb-2'
                    name='lengthOptions'
                    size='sm'
                  >
                    {Radios.width.map((radio, i) => (
                      <ToggleButton
                        key={i}
                        id={`radioLength-${i}`}
                        type='radio'
                        variant='outline-primary'
                        name='radio'
                        required={true}
                        value={radio.value}
                        checked={length === radio.value}
                        onChange={(e) => setLength(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </>
              ) : (
                <></>
              )}
              {appChars.indexOf('Fit') > -1 ? (
                <>
                  <b>Fit*</b>
                  <ToggleButtonGroup
                    className='mb-2'
                    name='fitOptions'
                    size='sm'
                  >
                    {Radios.width.map((radio, i) => (
                      <ToggleButton
                        key={i}
                        id={`radioFit-${i}`}
                        type='radio'
                        variant='outline-primary'
                        name='radioFit'
                        value={radio.value}
                        checked={fit === radio.value}
                        onChange={(e) => setFit(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </>
              ) : (
                <></>
              )}

              <b>Summary</b>
              <FloatingLabel
                controlId='floatingInput'
                label='Example: "Best purchase ever!"'
                className='mb-3'
              >
                <Form.Control
                  type='text'
                  as='textarea'
                  placeholder='Example: "Best purchase ever!"'
                  maxLength='60'
                  onChange={(e) => setSummary(e.target.value)}
                />
              </FloatingLabel>
              <b>Review body*</b>
              <FloatingLabel
                controlId='floatingPassword'
                label='“Why did you like the product or not?”'
                className='mb-3'
              >
                <Form.Control
                  as='textarea'
                  style={{ height: '160px' }}
                  type='text'
                  placeholder='“Why did you like the product or not?”'
                  minLength='50'
                  maxLength='1000'
                  required={true}
                  onChange={(e) => setBody(e.target.value)}
                />
              </FloatingLabel>

              <b>Add Images</b>
              <Accordion>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>Upload Images</Accordion.Header>
                  <Accordion.Body>
                    <Stack gap={2}>
                      <Image
                        id='submit-image-previews'
                        height='20%'
                        width='20%'
                      />
                      <Form.Control
                        type='file'
                        multiple
                        accept='image/png, image/jpeg'
                        onChange={storeImages}
                      />
                    </Stack>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <b>Nickname*</b>
              <FloatingLabel
                controlId='floatingInput'
                label='Example: "jackson11!”'
                className='mb-3'
              >
                <Form.Control
                  type='text'
                  placeholder='Example: "jackson11!”'
                  maxLength='60'
                  required={true}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <Form.Text muted>
                  For privacy reasons, do not use your full name or email
                  address.
                </Form.Text>
              </FloatingLabel>
              <b>Email*</b>
              <FloatingLabel
                controlId='floatingInput'
                label='Example: "jackson11@email.com”'
                className='mb-3'
              >
                <Form.Control
                  type='email'
                  placeholder='Example: "jackson11@email.com”'
                  maxLength='60'
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text muted>
                  For authentication reasons, you will not be emailed.
                </Form.Text>
              </FloatingLabel>
              <Button
                className='ms-auto'
                variant='outline-primary'
                type='submit'
                value='submit'
              >
                Submit
              </Button>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SubmitReview;
