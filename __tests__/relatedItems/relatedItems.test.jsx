import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RelatedItems from '../../client/src/components/relateditems/RelatedItems.jsx';

Enzyme.configure({ adapter: new Adapter() });

const relatedItems = [];

test('Renders no carousel', () => {
  const wrapper = mount(<RelatedItems productid={null} featuredProd={{}} chooseProduct={{}}/>);
  expect(wrapper).toHaveProp({relatedItems: []});
})