# React Native Inherit

Adds style inheritance to React Native.

Allows you to style text components in groups as you would in regular CSS by applying styles to a higher up component.

Example use cases:

- Apply a global font family, size, and weight to all `<Text>` components by wrapping your whole app in `<StyleProvider>`
- If your global font color is black, but inside e.g. your `<Card>` component all text should be gray, you can set the color of the card component to gray and it will cascade to only the `<Text>` components inside the `<Card>` component

## Installation

```
npm i react-native-inherit
```

## Usage

The main thing to note is you need to use the exported `<Text>` component from `react-native-inherit` instead of the one exported from `react-native` (the api is exactly the same). This allows us to pull inherited styles from higher up context.

Then to have styles cascade down, use either the `<StyleProvider>` component, or our re-exported React Native components such as `View` or `TouchableOpacity` that contain a special `styleProvider` prop.

```tsx
import { Text, StyleProvider, View } from 'react-native-inhert';

// note that Text and View are imported from react-native-inherit

export default function App() {
  return (
    <View>
      <StyleProvider style={{ color: 'green', fontWeight: 'bold' }}>
        <View styleProvider={{ color: 'red', fontSize: 32 }}>
          <Text>Some Red Text</Text>
          <Text style={{ color: 'blue' }}>Some Blue Text</Text>
        </View>
        <Text>Some green text</Text>
      </StyleProvider>
    </View>
  );
}
```

## How it works

Both the `<StyleProvider>` component and the re-exported React Native components with the `styleProvider` prop simply wrap a context that accepts the following styles:

```typescript
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
```

> Inheritable styles are influenced from the DOM
> https://web.dev/learn/css/inheritance/#which-properties-are-inheritable

Then in our `<Text>` component we merge all (including nested) provided styles and forward them onto the base React Native `<Text>` component.
