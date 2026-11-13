import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { AD_OFFERS, SALON_INFO } from '@/constants/beauty-data';

interface HeroAdvertBannerProps {
  onClaimOffer: (code: string) => void;
  onExploreServices: () => void;
}

export const HeroAdvertBanner: React.FC<HeroAdvertBannerProps> = ({
  onClaimOffer,
  onExploreServices,
}) => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  // Auto-advance offer banner
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveOfferIndex((prev) => (prev + 1) % AD_OFFERS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const offer = AD_OFFERS[activeOfferIndex];

  return (
    <View style={styles.container}>
      {/* Top Tagline & Trust Pillars */}
      <View style={styles.heroIntro}>
        <View style={styles.pillBadge}>
          <Ionicons name="sparkles" size={13} color="#E6A4B4" />
          <ThemedText style={styles.pillText}>PREMIER BEAUTY & AESTHETICS</ThemedText>
        </View>

        <ThemedText style={styles.headline}>
          Reveal Your Natural{' '}
          <ThemedText style={styles.headlineHighlight}>Glow & Elegance</ThemedText>
        </ThemedText>

        <ThemedText style={styles.subheadline}>
          Welcome to {SALON_INFO.name}. A modern sanctuary for advanced skin care, VIP nail artistry, hair perfection, and certified organic cosmetics — all customized for you.
        </ThemedText>

        <View style={styles.trustRow}>
          <View style={styles.trustItem}>
            <Ionicons name="star" size={14} color="#D4AF37" />
            <ThemedText style={styles.trustText}>
              <ThemedText style={styles.boldText}>4.9/5</ThemedText> (15k+ Reviews)
            </ThemedText>
          </View>
          <View style={styles.bulletDot} />
          <View style={styles.trustItem}>
            <Ionicons name="shield-checkmark" size={14} color="#50C878" />
            <ThemedText style={styles.trustText}>100% Hygienic</ThemedText>
          </View>
          <View style={styles.bulletDot} />
          <View style={styles.trustItem}>
            <Ionicons name="medal" size={14} color="#E6A4B4" />
            <ThemedText style={styles.trustText}>12+ Yrs Artistry</ThemedText>
          </View>
        </View>
      </View>

      {/* Dynamic Advertisement Card */}
      <View style={styles.adCard}>
        <View style={styles.adCardTop}>
          <View style={styles.badgeRow}>
            <View style={styles.adBadge}>
              <ThemedText style={styles.adBadgeText}>{offer.badge}</ThemedText>
            </View>
            <ThemedText style={styles.expiresText}>⏳ {offer.expiresIn}</ThemedText>
          </View>

          <ThemedText style={styles.discountText}>{offer.discount}</ThemedText>
          <ThemedText style={styles.offerTitle}>{offer.title}</ThemedText>
          <ThemedText style={styles.offerSubtitle}>{offer.subtitle}</ThemedText>
        </View>

        <View style={styles.adCardBottom}>
          <View style={styles.couponContainer}>
            <ThemedText style={styles.couponLabel}>PROMO CODE</ThemedText>
            <View style={styles.couponBox}>
              <ThemedText style={styles.couponCode}>{offer.code}</ThemedText>
            </View>
          </View>

          <View style={styles.ctaGroup}>
            <Pressable
              onPress={() => onClaimOffer(offer.code)}
              style={({ pressed }) => [styles.claimButton, pressed && styles.pressed]}>
              <ThemedText style={styles.claimButtonText}>Claim Offer</ThemedText>
              <Ionicons name="arrow-forward" size={14} color="#0A0A0E" />
            </Pressable>

            <Pressable
              onPress={onExploreServices}
              style={({ pressed }) => [styles.exploreButton, pressed && styles.pressed]}>
              <ThemedText style={styles.exploreButtonText}>Services</ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Carousel indicator dots */}
        <View style={styles.dotsRow}>
          {AD_OFFERS.map((item, idx) => (
            <Pressable
              key={item.id}
              onPress={() => setActiveOfferIndex(idx)}
              style={[
                styles.dot,
                idx === activeOfferIndex ? styles.activeDot : undefined,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  heroIntro: {
    marginBottom: 16,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.35)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  pillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#38BDF8',
    letterSpacing: 1,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 34,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headlineHighlight: {
    color: '#38BDF8',
  },
  subheadline: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 21,
    marginBottom: 14,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  trustText: {
    fontSize: 12,
    color: '#C6C6D6',
  },
  boldText: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bulletDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#4A4A60',
  },
  adCard: {
    backgroundColor: '#0A1325',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#1C355F',
    padding: 18,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  adCardTop: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  adBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  adBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 0.8,
  },
  expiresText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  discountText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#38BDF8',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
  adCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#16284D',
    paddingTop: 14,
  },
  couponContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  couponLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  couponBox: {
    backgroundColor: '#0D1B36',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  couponCode: {
    fontSize: 13,
    fontWeight: '800',
    color: '#7DD3FC',
    letterSpacing: 1,
  },
  ctaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#38BDF8',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
  },
  claimButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#060E1C',
  },
  exploreButton: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E3A6A',
    backgroundColor: '#111E38',
  },
  exploreButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1E3A6A',
  },
  activeDot: {
    width: 18,
    backgroundColor: '#38BDF8',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
