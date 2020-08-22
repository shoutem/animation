import { View as RNView } from 'react-native';
import connectAnimation from '../components/connectAnimation';
import { animations } from './animations';

// import/prefer-default-export const cannot be default export
// eslint-disable-next-line
export const View = connectAnimation(RNView, animations);
