import { useInheritedStyles } from '../style-provider';
import { forwardRef } from 'react';
import { Text as RNText, TextProps } from 'react-native';

const Text = forwardRef<RNText, TextProps>((props, ref) => {
  const style = useInheritedStyles(props.style);

  return <RNText {...props} style={style} ref={ref} />;
});

export default Text;
