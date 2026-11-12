import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Image } from 'expo-image';
import { Pressable, View, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home & Offers</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Services & Products</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...(props as any)} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={[
          styles.tabButtonView,
          isFocused ? styles.tabButtonActive : undefined,
        ]}>
        <ThemedText
          type="smallBold"
          style={isFocused ? { color: '#F3A6B2' } : { color: '#9E9EB2' }}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <View style={styles.brandRow}>
          <Image
            source={require('@/assets/images/iswari-logo.png')}
            style={styles.logoImage}
            contentFit="cover"
          />
          <View>
            <ThemedText type="smallBold" style={styles.brandTitle}>
              Iswari Beautician
            </ThemedText>
            <ThemedText type="small" style={styles.brandSub}>
              Luxury Salon & Studio
            </ThemedText>
          </View>
        </View>

        <View style={styles.tabButtonsGroup}>
          {props.children}
        </View>

        <View style={styles.badgePill}>
          <ThemedText type="smallBold" style={styles.badgeText}>
            ★ 4.9 Rated VIP Care
          </ThemedText>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 999,
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: 900,
    backgroundColor: 'rgba(18, 18, 24, 0.94)',
    borderWidth: 1,
    borderColor: '#262636',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E6A4B4',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  brandSub: {
    color: '#D4AF37',
    fontSize: 11,
  },
  tabButtonsGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButtonView: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#171722',
  },
  tabButtonActive: {
    borderColor: '#E6A4B4',
    borderWidth: 1,
    backgroundColor: '#261C26',
  },
  badgePill: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  badgeText: {
    color: '#F4CA64',
    fontSize: 11,
  },
  pressed: {
    opacity: 0.7,
  },
});
