import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Stack:
    | {
        url: string;
        title?: string;
        headerShown?: boolean;
      }
    | undefined;
  FullStack:
    | {
        url: string;
        title?: string;
      }
    | undefined;
};
export type StackProps = NativeStackScreenProps<RootStackParamList, 'Stack'>;
export type FullStackProps = NativeStackScreenProps<
  RootStackParamList,
  'FullStack'
>;
