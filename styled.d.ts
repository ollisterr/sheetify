// Extend styled-components default theme interface
// https://www.styled-components.com/docs/api#typescript
import 'styled-components';
import { Theme } from 'styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
