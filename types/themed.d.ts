import '@rneui/themed';

declare module '@rneui/themed' {
  export interface CustomFont {
    regular: string;
    bold: string;
    italic: string;
    // ... add other font styles as needed
  }

  export interface Theme {
    fonts: CustomFont;
  }
}
