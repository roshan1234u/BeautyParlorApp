import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { SALON_INFO, TESTIMONIALS } from '@/constants/beauty-data';

interface AboutSalonSectionProps {
  onOpenBooking: () => void;
}

export const AboutSalonSection: React.FC<AboutSalonSectionProps> = ({ onOpenBooking }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const handleOpenMaps = () => {
    const query = encodeURIComponent(`${SALON_INFO.name} ${SALON_INFO.address}`);
    Linking.openURL(`https://maps.google.com/?q=${query}`).catch(() => {});
  };

  return (
    <View style={styles.container}>
      {/* Editorial Header */}
      <View style={styles.header}>
        <View style={styles.subtitleRow}>
          <ThemedText style={styles.subtitleScript}>About Iswari Beautician</ThemedText>
        </View>
        <ThemedText style={styles.title}>
          Where Calm Rituals Meet Modern Beauty Science
        </ThemedText>
        <ThemedText style={styles.caption}>
          Founded with a passion for transforming natural beauty into extraordinary elegance. Our studio pairs timeless pampering rituals with dermatologically verified cosmetic care.
        </ThemedText>
      </View>

      {/* Showcase Visual Cards Row */}
      <View style={[styles.visualCardsContainer, isTablet && styles.visualCardsRow]}>
        {/* Card 1: Maison Rosé / Spa Sanctuary */}
        <View style={[styles.visualCard, isTablet && styles.visualCardHalf]}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('@/assets/images/banner-spa.png')}
              style={styles.showcaseImage}
              contentFit="cover"
            />
            <View style={styles.imageOverlayBadge}>
              <Ionicons name="sparkles" size={12} color="#D4AF37" />
              <ThemedText style={styles.overlayBadgeText}>Aesthetics & Spa Care</ThemedText>
            </View>
          </View>
          <View style={styles.visualCardBody}>
            <ThemedText style={styles.cardHeading}>
              Dermal Radiance & Facial Sanctuary
            </ThemedText>
            <ThemedText style={styles.cardDesc}>
              Signature enzyme treatments, hydra-infusion facials, and anti-aging phototherapy designed to awaken your inner glow.
            </ThemedText>
          </View>
        </View>

        {/* Card 2: VIP Nail Studio & Hand Spa */}
        <View style={[styles.visualCard, isTablet && styles.visualCardHalf]}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('@/assets/images/banner-nail-salon.png')}
              style={styles.showcaseImage}
              contentFit="cover"
            />
            <View style={styles.imageOverlayBadge}>
              <Ionicons name="hand-left" size={12} color="#F3A6B2" />
              <ThemedText style={styles.overlayBadgeText}>VIP Nail Studio</ThemedText>
            </View>
          </View>
          <View style={styles.visualCardBody}>
            <ThemedText style={styles.cardHeading}>
              Artistic Nails & Luxury Foot Therapy
            </ThemedText>
            <ThemedText style={styles.cardDesc}>
              Custom acrylic sculpted sets, long-lasting shellac, French gels, and therapeutic herbal foot baths.
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Parlor Metrics & Features */}
      <View style={styles.metricsBox}>
        <View style={styles.metricItem}>
          <ThemedText style={styles.metricNumber}>12+</ThemedText>
          <ThemedText style={styles.metricLabel}>Years of Artistry</ThemedText>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <ThemedText style={styles.metricNumber}>15,000+</ThemedText>
          <ThemedText style={styles.metricLabel}>Happy Clients</ThemedText>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <ThemedText style={styles.metricNumber}>4.9 ★</ThemedText>
          <ThemedText style={styles.metricLabel}>Google Rated</ThemedText>
        </View>
      </View>

      {/* Client Testimonials Carousel */}
      <View style={styles.testimonialContainer}>
        <ThemedText style={styles.testimonialSectionTitle}>
          What Our Clients Say
        </ThemedText>
        <View style={styles.testimonialCardsRow}>
          {TESTIMONIALS.map((t) => (
            <View key={t.id} style={styles.testimonialCard}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name="star" size={12} color="#D4AF37" />
                ))}
              </View>
              <ThemedText style={styles.commentText}>
                "{t.comment}"
              </ThemedText>
              <View style={styles.clientInfo}>
                <ThemedText style={styles.clientName}>{t.name}</ThemedText>
                <ThemedText style={styles.clientService}>{t.service}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Location & Appointment Card */}
      <View style={styles.contactCard}>
        <View style={styles.contactRow}>
          <View style={styles.contactIcon}>
            <Ionicons name="location-outline" size={20} color="#E6A4B4" />
          </View>
          <View style={styles.contactInfo}>
            <ThemedText style={styles.contactTitle}>Visit Our Studio</ThemedText>
            <ThemedText style={styles.contactSub}>{SALON_INFO.address}</ThemedText>
            <ThemedText style={styles.contactTiming}>{SALON_INFO.timing}</ThemedText>
          </View>
        </View>

        <View style={styles.contactActions}>
          <Pressable
            onPress={handleOpenMaps}
            style={({ pressed }) => [styles.mapButton, pressed && styles.pressed]}>
            <Ionicons name="navigate-outline" size={14} color="#D4AF37" />
            <ThemedText style={styles.mapButtonText}>Directions</ThemedText>
          </Pressable>

          <Pressable
            onPress={onOpenBooking}
            style={({ pressed }) => [styles.reserveButton, pressed && styles.pressed]}>
            <Ionicons name="calendar-outline" size={14} color="#0A0A0E" />
            <ThemedText style={styles.reserveButtonText}>Book Visit</ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#07090E',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitleRow: {
    marginBottom: 4,
  },
  subtitleScript: {
    fontSize: 13,
    color: '#38BDF8',
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  caption: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 580,
    lineHeight: 19,
  },
  visualCardsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  visualCardsRow: {
    flexDirection: 'row',
  },
  visualCard: {
    backgroundColor: '#0A1325',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1C355F',
  },
  visualCardHalf: {
    flex: 1,
  },
  imageWrapper: {
    position: 'relative',
    height: 220,
    backgroundColor: '#070E1C',
  },
  showcaseImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlayBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(6, 12, 24, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  overlayBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  visualCardBody: {
    padding: 16,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 12.5,
    color: '#94A3B8',
    lineHeight: 18,
  },
  metricsBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0B172E',
    borderRadius: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#1E3A6A',
    marginBottom: 24,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#38BDF8',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },
  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#1E3A6A',
  },
  testimonialContainer: {
    marginBottom: 24,
  },
  testimonialSectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  testimonialCardsRow: {
    gap: 12,
  },
  testimonialCard: {
    backgroundColor: '#0A1325',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1C355F',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 8,
  },
  commentText: {
    fontSize: 12.5,
    color: '#CBD5E1',
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  clientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clientName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  clientService: {
    fontSize: 11,
    color: '#D4AF37',
  },
  contactCard: {
    backgroundColor: '#0B172E',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#102244',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  contactSub: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 17,
    marginBottom: 2,
  },
  contactTiming: {
    fontSize: 11,
    color: '#D4AF37',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 10,
  },
  mapButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#070F1E',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  mapButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  reserveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#38BDF8',
    paddingVertical: 10,
    borderRadius: 12,
  },
  reserveButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#060E1C',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
