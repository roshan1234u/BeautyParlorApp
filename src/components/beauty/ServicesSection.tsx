import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { SERVICES_LIST, ServiceItem } from '@/constants/beauty-data';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

const CATEGORIES = [
  { key: 'all', label: 'All Services' },
  { key: 'facial', label: 'Facials' },
  { key: 'nail', label: 'Nail Art' },
  { key: 'hair', label: 'Hair Care' },
  { key: 'skin', label: 'Skin Clinic' },
  { key: 'spa', label: 'Body Spa' },
  { key: 'bridal', label: 'Bridal HD' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedCat, setSelectedCat] = useState('all');
  const { width } = useWindowDimensions();

  const isWide = width >= 720;
  const isTablet = width >= 1000;

  const filteredServices = selectedCat === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter((s) => s.category === selectedCat);

  // Dynamic card width for 100% responsiveness
  const cardWidth = isTablet
    ? '31.5%'
    : isWide
    ? '48.5%'
    : '100%';

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'facial':
        return 'happy-outline';
      case 'nail':
        return 'hand-left-outline';
      case 'hair':
        return 'cut-outline';
      case 'skin':
        return 'sparkles-outline';
      case 'spa':
        return 'flower-outline';
      case 'bridal':
        return 'heart-outline';
      default:
        return 'star-outline';
    }
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.subtitleRow}>
          <ThemedText style={styles.subtitleScript}>What We Offer</ThemedText>
        </View>
        <ThemedText style={styles.title}>
          Professional Beauty & Spa Care
        </ThemedText>
        <ThemedText style={styles.caption}>
          From revitalizing facials to custom nail artistry and keratin hair therapies, every treatment is tailored to celebrate your beauty.
        </ThemedText>
      </View>

      {/* Filter Chips */}
      <View style={styles.filterScroll}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCat === cat.key;
          return (
            <Pressable
              key={cat.key}
              onPress={() => setSelectedCat(cat.key)}
              style={[
                styles.filterChip,
                isSelected ? styles.filterChipActive : undefined,
              ]}>
              <ThemedText
                style={[
                  styles.filterChipText,
                  isSelected ? styles.filterChipTextActive : undefined,
                ]}>
                {cat.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      {/* Services Grid (Responsive) */}
      <View style={styles.grid}>
        {filteredServices.map((service) => (
          <View
            key={service.id}
            style={[styles.serviceCard, { width: cardWidth as any }]}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name={getCategoryIcon(service.category) as any}
                  size={20}
                  color="#F3A6B2"
                />
              </View>
              {service.tag && (
                <View style={styles.tagBadge}>
                  <ThemedText style={styles.tagText}>{service.tag}</ThemedText>
                </View>
              )}
            </View>

            {/* Service Title & Price */}
            <ThemedText style={styles.serviceTitle}>{service.title}</ThemedText>
            <View style={styles.priceRow}>
              <ThemedText style={styles.price}>{service.price}</ThemedText>
              <View style={styles.durationPill}>
                <Ionicons name="time-outline" size={12} color="#A0A0B5" />
                <ThemedText style={styles.durationText}>{service.duration}</ThemedText>
              </View>
            </View>

            {/* Description */}
            <ThemedText style={styles.description}>
              {service.description}
            </ThemedText>

            {/* Feature Bullets */}
            <View style={styles.featuresList}>
              {service.features.map((feat, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={13} color="#D4AF37" />
                  <ThemedText style={styles.featureText}>{feat}</ThemedText>
                </View>
              ))}
            </View>

            {/* Action Button */}
            <Pressable
              onPress={() => onSelectService(service)}
              style={({ pressed }) => [styles.bookButton, pressed && styles.pressed]}>
              <ThemedText style={styles.bookButtonText}>Book Treatment</ThemedText>
              <Ionicons name="chevron-forward" size={14} color="#F3A6B2" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    textAlign: 'center',
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
    fontSize: 24,
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
  filterScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#0A1325',
    borderWidth: 1,
    borderColor: '#1C355F',
  },
  filterChipActive: {
    backgroundColor: '#1E40AF',
    borderColor: '#60A5FA',
  },
  filterChipText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'flex-start',
  },
  serviceCard: {
    backgroundColor: '#0A1325',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1C355F',
    padding: 16,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#102244',
    borderWidth: 1,
    borderColor: '#1E3A6A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderColor: 'rgba(212, 175, 55, 0.4)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F4CA64',
  },
  serviceTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  price: {
    fontSize: 19,
    fontWeight: '800',
    color: '#38BDF8',
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#0F1C36',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  durationText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  description: {
    fontSize: 12.5,
    color: '#8A9BB8',
    lineHeight: 18,
    marginBottom: 12,
  },
  featuresList: {
    gap: 5,
    marginBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#12203B',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 11.5,
    color: '#CBD5E1',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#112347',
    borderColor: '#1E40AF',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#7DD3FC',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});
