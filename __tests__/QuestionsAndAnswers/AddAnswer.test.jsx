import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddAnswer from '../../client/src/components/questionsandanswers/AddAnswer.jsx';
import { Button, Modal, Form, FloatingLabel} from 'react-bootstrap';
Enzyme.configure({ adapter: new Adapter()});

describe('<AddAnswer />', () => {
  const wrapper = shallow(<AddAnswer product_name='Camo Onesie' question_id={426448} question_body='Can I wash it?'/>);
  it('render an add answer button', () => {
    expect(wrapper.find('.answer_add')).toContainMatchingElements(1, 'Button');
  })
  it('render title', () => {
    expect(wrapper.find('#question_modal_title')).toContainMatchingElements(1, 'h3');
    expect(wrapper.find('#question_modal_title').text()).toContain('Submit your Answer');
  });
  it('render subtitle', () => {
    expect(wrapper.find('#question_modal_subtitle')).toContainMatchingElements(1, 'h6');
    expect(wrapper.find('#question_modal_subtitle').text()).toContain('Camo Onesie: Can I wash it?');
  });
  it('render a form', () => {
    expect(wrapper).toContainMatchingElements(1, 'Form');
  });
});

describe('form component', () => {
  const wrapper = shallow(<AddAnswer product_name='Camo Onesie' question_id={426448} question_body='Can I wash it?'/>);
  const form = wrapper.find('Form');
  it('should have input for answer body', () => {
    expect(form.find('.add_answer_body_input')).toHaveLength(1);
  });
  it('should have input for name', () => {
    expect(form.find('.add_answer_name_input')).toHaveLength(1);
  });
  it('should have input for email', () => {
    expect(form.find('.add_answer_email_input')).toHaveLength(1);
  });
  it('should have a submit button', () => {
    expect(wrapper.find('.addA_submit_btn')).toHaveLength(1);
  });
  it('should have a cancel button', () => {
    expect(wrapper.find('.addA_cancel_btn')).toHaveLength(1);
  });
});

describe('Button click test', () => {
  const wrapper = shallow(<AddAnswer product_name='Camo Onesie' question_id={426448} question_body='Can I wash it?' onClick={mockCallBack}/>);
  const mockCallBack = jest.fn();
  it('Add Answer Test click', () => {
    wrapper.find('.answer_add').at(0).simulate('click');
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
  it('cancel button in Modal Test click', () => {
    wrapper.find('.addA_cancel_btn').at(0).simulate('click');
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
  it('submit button in Modal Test click', () => {
    wrapper.find('.addA_submit_btn').at(0).simulate('click');
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});

