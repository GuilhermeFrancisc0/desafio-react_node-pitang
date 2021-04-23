/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';
import Card from '../../../components/Card';

test('Card renders', () => {
  const { asFragment } = render(<Card />);

  expect(asFragment()).toMatchSnapshot();
});
