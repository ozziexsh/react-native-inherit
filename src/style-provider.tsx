import { PropsWithChildren, createContext, useContext } from 'react';
import { StyleProp, TextStyle } from 'react-native';

export type InheritableTextStyles = Pick<
  TextStyle,
  | 'color'
  | 'fontSize'
  | 'fontFamily'
  | 'fontWeight'
  | 'fontVariant'
  | 'fontStyle'
  | 'lineHeight'
  | 'letterSpacing'
  | 'textAlign'
  | 'textTransform'
>;

export const StyleContext = createContext<StyleProp<TextStyle>>(null);

export function useInheritedStyles(style?: StyleProp<TextStyle>) {
  const inherited = useContext(StyleContext);
  return [inherited, style];
}

export function StyleProvider({
  children,
  style,
}: PropsWithChildren<{ style: StyleProp<InheritableTextStyles> }>) {
  const inherited = useContext(StyleContext);

  return (
    <StyleContext.Provider value={[inherited, style]}>
      {children}
    </StyleContext.Provider>
  );
}
