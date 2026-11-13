import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

interface AdvertisementStripProps {
  onPress: () => void;
}

export const AdvertisementStrip: React.FC<AdvertisementStripProps> = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.strip, pressed && styles.pressed]}>
      <View style={styles.content}>
        <View style={styles.flashBadge}>
          <Ionicons name="flash" size={11} color="#060E1C" />
          <ThemedText style={styles.flashText}>OFFER</ThemedText>
        </View>
        <ThemedText style={styles.messageText} numberOfLines={1}>
          Flat 40% OFF Bridal & Nails | Use code{' '}
          <ThemedText style={styles.codeText}>ISWARI40</ThemedText>
        </ThemedText>
      </View>
      <View style={styles.arrowRow}>
        <ThemedText style={styles.claimNow}>Claim</ThemedText>
        <Ionicons name="chevron-forward" size={13} color="#38BDF8" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  strip: {
    backgroundColor: '#0A1325',
    borderColor: '#1C355F',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  flashBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#38BDF8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  flashText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#060E1C',
  },
  messageText: {
    fontSize: 12,
    color: '#CBD5E1',
    flex: 1,
  },
  codeText: {
    fontWeight: '700',
    color: '#F4CA64',
  },
  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  claimNow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38BDF8',
  },
  pressed: {
    opacity: 0.85,
  },
});
