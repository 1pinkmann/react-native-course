import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme();
export const isDarkTheme = colorScheme === "dark";

export const colors = {
  PRODUCT_CARD_BG: { light: '#f8f0f0', dark: '#a19999'},
  HEART_ACTIVE: '#e61313',
  BORDER: { dark: '#393434', light: '#e6e6e6' },
  GREY: '#e6e6e6',
  TEXT: { dark: '#fff', light: '#000' },
  MAIN_BACKGROUND: { dark: '#393434', light: '#fff' },
  ICON: { dark: '#fff', light: '#000' },
  SHARE_ICON: '#000',
}

export const BASE_URL = 'https://6081ca5473292b0017cde2ef.mockapi.io/api/v1';