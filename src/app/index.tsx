import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Linking,
  Pressable,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { HeaderBar } from '@/components/beauty/HeaderBar';
import { HeroAdvertBanner } from '@/components/beauty/HeroAdvertBanner';
import { AdvertisementStrip } from '@/components/beauty/AdvertisementStrip';
import { ServicesSection } from '@/components/beauty/ServicesSection';
import { CosmeticsSection } from '@/components/beauty/CosmeticsSection';
import { AboutSalonSection } from '@/components/beauty/AboutSalonSection';
import { ExpoLoginModal } from '@/components/beauty/ExpoLoginModal';
import { BookingConsultationModal } from '@/components/beauty/BookingConsultationModal';
import { ThemedText } from '@/components/themed-text';
import { SALON_INFO, ServiceItem } from '@/constants/beauty-data';

export default function HomeScreen() {
  const [loginVisible, setLoginVisible] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string>('ISWARI40');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('VIP Guest');

  const handleClaimOffer = (code: string) => {
    setAppliedPromo(code);
    setBookingVisible(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setBookingVisible(true);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${SALON_INFO.name}! I would like to inquire about your beauty services and cosmetics.`
    );
    Linking.openURL(`https://wa.me/${SALON_INFO.whatsapp.replace('+', '')}?text=${text}`).catch(() => {});
  };

  const handleCall = () => {
    Linking.openURL(`tel:${SALON_INFO.phone}`).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      {/* Luxury Black Header */}
      <HeaderBar
        onOpenLogin={() => setLoginVisible(true)}
        onOpenBooking={() => setBookingVisible(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentConstraint}>
          {/* Advertisement Strip */}
          <AdvertisementStrip onPress={() => setBookingVisible(true)} />

          {/* Hero Advertisement Carousel */}
          <HeroAdvertBanner
            onClaimOffer={handleClaimOffer}
            onExploreServices={() => {}}
          />

          {/* Services & Treatment Packages Grid */}
          <ServicesSection onSelectService={handleSelectService} />

          {/* Cosmetics & Step-by-Step Usage Routine Section */}
          <CosmeticsSection />

          {/* Salon Showcase & Credentials with User's Uploaded Images */}
          <AboutSalonSection onOpenBooking={() => setBookingVisible(true)} />

          {/* Footer Brand Note */}
          <View style={styles.footerNote}>
            <ThemedText style={styles.footerBrand}>
              {SALON_INFO.name}
            </ThemedText>
            <ThemedText style={styles.footerSub}>
              {SALON_INFO.tagline} • All rights reserved
            </ThemedText>
            <ThemedText style={styles.footerPolicy}>
              Cruelty-Free • 100% Organic Extracts • Certified Artists
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar (Call & WhatsApp) */}
      <View style={styles.stickyBar}>
        <Pressable
          onPress={handleCall}
          style={({ pressed }) => [styles.stickyCallBtn, pressed && styles.pressed]}>
          <Ionicons name="call" size={16} color="#38BDF8" />
          <ThemedText style={styles.stickyCallText}>Call Now</ThemedText>
        </Pressable>

        <Pressable
          onPress={handleOpenWhatsApp}
          style={({ pressed }) => [styles.stickyWaBtn, pressed && styles.pressed]}>
          <Ionicons name="logo-whatsapp" size={17} color="#FFFFFF" />
          <ThemedText style={styles.stickyWaText}>WhatsApp Inquire</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => setBookingVisible(true)}
          style={({ pressed }) => [styles.stickyBookBtn, pressed && styles.pressed]}>
          <Ionicons name="calendar" size={15} color="#060E1C" />
          <ThemedText style={styles.stickyBookText}>Book VIP</ThemedText>
        </Pressable>
      </View>

      {/* Expo VIP Login Modal */}
      <ExpoLoginModal
        visible={loginVisible}
        onClose={() => setLoginVisible(false)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginSuccess={(name) => {
          setIsLoggedIn(true);
          setUserName(name);
        }}
        onLogout={() => {
          setIsLoggedIn(false);
          setUserName('VIP Guest');
        }}
      />

      {/* VIP Booking / Consultation Modal */}
      <BookingConsultationModal
        visible={bookingVisible}
        onClose={() => setBookingVisible(false)}
        preselectedService={selectedService}
        promoCode={appliedPromo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#07080D',
  },
  scrollContainer: {
    paddingBottom: 110,
    backgroundColor: '#07080D',
  },
  contentConstraint: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  footerNote: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#12203B',
    backgroundColor: '#07080D',
  },
  footerBrand: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  footerSub: {
    fontSize: 12,
    color: '#8A9BB8',
    marginBottom: 4,
  },
  footerPolicy: {
    fontSize: 11,
    color: '#D4AF37',
  },
  stickyBar: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 70 : 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'rgba(10, 19, 37, 0.96)',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E3A6A',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
    maxWidth: 760,
    alignSelf: 'center',
    width: Platform.OS === 'web' ? '92%' : undefined,
  },
  stickyCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#0F1E3A',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  stickyCallText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  stickyWaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#25D366',
    paddingVertical: 10,
    borderRadius: 14,
  },
  stickyWaText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stickyBookBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#38BDF8',
    paddingVertical: 10,
    borderRadius: 14,
  },
  stickyBookText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#060E1C',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
