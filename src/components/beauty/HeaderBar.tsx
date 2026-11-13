import React from 'react';
import { View, StyleSheet, Pressable, Platform, Linking } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { SALON_INFO } from '@/constants/beauty-data';

interface HeaderBarProps {
  onOpenLogin: () => void;
  onOpenBooking: () => void;
  isLoggedIn: boolean;
  userName?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onOpenLogin,
  onOpenBooking,
  isLoggedIn,
  userName = 'VIP Guest',
}) => {
  const handleCall = () => {
    Linking.openURL(`tel:${SALON_INFO.phone}`).catch(() => {});
  };

  return (
    <View style={styles.header}>
      {/* Brand & Logo */}
      <View style={styles.brandContainer}>
        <View style={styles.logoRing}>
          <Image
            source={require('@/assets/images/iswari-logo.png')}
            style={styles.logo}
            contentFit="cover"
          />
        </View>
        <View style={styles.titleColumn}>
          <View style={styles.nameRow}>
            <ThemedText style={styles.brandName}>Iswari Beautician</ThemedText>
            <View style={styles.verifiedBadge}>
              <Ionicons name="sparkles" size={10} color="#D4AF37" />
            </View>
          </View>
          <ThemedText style={styles.brandSubtitle}>
            Luxury Salon & Cosmetics
          </ThemedText>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {/* Call button */}
        <Pressable
          onPress={handleCall}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          accessibilityLabel="Call Salon">
          <Ionicons name="call-outline" size={17} color="#38BDF8" />
        </Pressable>

        {/* Quick Booking */}
        <Pressable
          onPress={onOpenBooking}
          style={({ pressed }) => [styles.bookButton, pressed && styles.pressed]}>
          <Ionicons name="calendar-outline" size={14} color="#060E1C" />
          <ThemedText style={styles.bookButtonText}>Book Now</ThemedText>
        </Pressable>

        {/* Expo Login / VIP Status */}
        <Pressable
          onPress={onOpenLogin}
          style={({ pressed }) => [
            styles.loginBadge,
            isLoggedIn && styles.loggedInBadge,
            pressed && styles.pressed,
          ]}>
          <Ionicons
            name={isLoggedIn ? 'person-circle' : 'finger-print-outline'}
            size={16}
            color={isLoggedIn ? '#D4AF37' : '#38BDF8'}
          />
          <ThemedText style={[styles.loginText, isLoggedIn && styles.loggedInText]}>
            {isLoggedIn ? userName : 'Expo VIP'}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(7, 12, 24, 0.96)',
    borderBottomWidth: 1,
    borderBottomColor: '#12203B',
    zIndex: 100,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logoRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 2,
    backgroundColor: '#0F1E3A',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  titleColumn: {
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  verifiedBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderRadius: 10,
    padding: 2,
  },
  brandSubtitle: {
    fontSize: 11,
    color: '#38BDF8',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0B172E',
    borderWidth: 1,
    borderColor: '#1E3A6A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#38BDF8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  bookButtonText: {
    color: '#060E1C',
    fontSize: 12,
    fontWeight: '800',
  },
  loginBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#0B172E',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  loggedInBadge: {
    borderColor: 'rgba(212, 175, 55, 0.5)',
    backgroundColor: '#1A1810',
  },
  loginText: {
    fontSize: 12,
    color: '#7DD3FC',
    fontWeight: '600',
  },
  loggedInText: {
    color: '#F4CA64',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
});
