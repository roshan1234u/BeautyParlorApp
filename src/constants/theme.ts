/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#08090E',
    backgroundElement: '#111420',
    backgroundSelected: '#192238',
    textSecondary: '#9EA3B8',
    accent: '#E6A4B4',
    accentGold: '#D4AF37',
    border: '#1F2942',
    card: '#101726',
    cardElevated: '#162035',
    cardDarkBlue: '#0C1527',
    cardDarkBlueElevated: '#111E38',
    cardDarkBlueDeep: '#080E1B',
    borderDarkBlue: '#1E3A6A',
    borderDarkBlueSubtle: '#142342',
    accentBlue: '#38BDF8',
    accentBlueGlow: 'rgba(56, 189, 248, 0.22)',
    badgeBlue: '#122549',
    badgeBlueText: '#7DD3FC',
    glow: 'rgba(230, 164, 180, 0.25)',
  },
  dark: {
    text: '#FFFFFF',
    background: '#07080D',
    backgroundElement: '#0E1322',
    backgroundSelected: '#162036',
    textSecondary: '#989FB3',
    accent: '#E6A4B4',
    accentGold: '#D4AF37',
    border: '#1C2740',
    card: '#0E1628',
    cardElevated: '#142038',
    cardDarkBlue: '#0A1325',
    cardDarkBlueElevated: '#0F1C36',
    cardDarkBlueDeep: '#060B17',
    borderDarkBlue: '#1C355F',
    borderDarkBlueSubtle: '#12203B',
    accentBlue: '#38BDF8',
    accentBlueGlow: 'rgba(56, 189, 248, 0.22)',
    badgeBlue: '#102242',
    badgeBlueText: '#7DD3FC',
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
