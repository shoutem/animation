import { View as RNView, } from 'react-native';
import { connectAnimation } from '../components/connectAnimation';
import { animations } from './animations';

export const View = connectAnimation(RNView, animations);
