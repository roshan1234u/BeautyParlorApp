/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#0B0B0F',
    backgroundElement: '#14141B',
    backgroundSelected: '#20202B',
    textSecondary: '#A0A0B5',
    accent: '#E6A4B4',
    accentGold: '#D4AF37',
    border: '#242432',
    card: '#16161F',
    cardElevated: '#1D1D28',
    glow: 'rgba(230, 164, 180, 0.25)',
  },
  dark: {
    text: '#FFFFFF',
    background: '#08080C',
    backgroundElement: '#121218',
    backgroundSelected: '#1C1C26',
    textSecondary: '#9A9AA8',
    accent: '#E6A4B4',
    accentGold: '#D4AF37',
    border: '#22222E',
    card: '#14141C',
    cardElevated: '#1B1B25',
    glow: 'rgba(230, 164, 180, 0.25)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
