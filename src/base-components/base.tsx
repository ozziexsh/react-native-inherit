import { InheritableTextStyles, StyleProvider } from '@/style-provider';
import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';

export function createInheritedComponent<T extends ElementType>(Component: T) {
  type StyleProps = { styleProvider?: InheritableTextStyles };
  type Props = ComponentPropsWithoutRef<T> & StyleProps;

  return forwardRef<T, Props>(({ styleProvider, ...props }, ref) => {
    return (
      <StyleProvider style={styleProvider}>
        {/** need to figure our better type than ElementType */}
        {/** @ts-ignore */}
        <Component {...props} ref={ref} />
      </StyleProvider>
    );
  });
}
