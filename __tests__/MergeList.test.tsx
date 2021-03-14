import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import MergeList from '../src/components/MergeList';
import { MergeListProps } from '../src/components/MergeList/generated';

const defaultProps: MergeListProps = {
  appId: 'testing', 
  _fonts: {
    body: '',
    heading: ''
  }, 
  _width: 0,
  _height: 0,
  editor: true
}

it('renders correctly', () => {
  renderer.create(<MergeList {...defaultProps} />);
});
