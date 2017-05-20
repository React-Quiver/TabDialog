jest.unmock('../TabDialog');

import React from 'react';
import { shallow } from 'enzyme';

describe('TabDialog', () => {
  it('should work', () => {
    const TabDialog = require('../TabDialog');
    const wrapper = shallow(
      <TabDialog />
    );
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('div').text()).toContain('Hay.');
  });

  it('should render all the card components', () => {
    const TabDialog = require('../TabDialog');
    const wrapper = shallow(
      <TabDialog text="It works!" />
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div').text()).toContain('It works!');
  });
});
