import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Linking,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { COSMETIC_PRODUCTS, CosmeticProduct, SALON_INFO } from '@/constants/beauty-data';
import { CosmeticsRoutineModal } from './CosmeticsRoutineModal';

type PartitionType = 'all' | 'cosmetics' | 'others';

export const CosmeticsSection: React.FC = () => {
  const [activePartition, setActivePartition] = useState<PartitionType>('all');
  const [selectedProduct, setSelectedProduct] = useState<CosmeticProduct | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  const isWide = width >= 680;
  const isDesktop = width >= 1040;

  const cardWidth = isDesktop
    ? '31.5%'
    : isWide
    ? '48.5%'
    : '100%';

  const filteredProducts = activePartition === 'all'
    ? COSMETIC_PRODUCTS
    : COSMETIC_PRODUCTS.filter((p) => p.partition === activePartition);

  const cosmeticsCount = COSMETIC_PRODUCTS.filter((p) => p.partition === 'cosmetics').length;
  const othersCount = COSMETIC_PRODUCTS.filter((p) => p.partition === 'others').length;

  const handleOpenRoutine = (product: CosmeticProduct) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleQuickInquire = (product: CosmeticProduct) => {
    const text = encodeURIComponent(
      `Hello ${SALON_INFO.name}! I am interested in purchasing "${product.name}" (${product.price}). How many days of delivery/pickup and how do I use it?`
    );
    Linking.openURL(`https://wa.me/${SALON_INFO.whatsapp.replace('+', '')}?text=${text}`).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerConstraint}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.subtitleRow}>
            <Ionicons name="sparkles" size={13} color="#38BDF8" />
            <ThemedText style={styles.subtitleScript}>Skin, Aesthetics & Wellness Clinic</ThemedText>
          </View>
          <ThemedText style={styles.title}>
            Curated Products & Usage Guides
          </ThemedText>
          <ThemedText style={styles.caption}>
            Dermatologist-grade formulas & salon essentials. Every product includes verified timelines on when to expect visible results and step-by-step application rituals.
          </ThemedText>
        </View>

        {/* PARTITION SELECTOR: COSMETICS VS OTHERS */}
        <View style={styles.partitionSelectorContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.partitionScroll}>
            <Pressable
              onPress={() => setActivePartition('all')}
              style={[
                styles.partitionButton,
                activePartition === 'all' && styles.partitionButtonActive,
              ]}>
              <Ionicons
                name="apps"
                size={14}
                color={activePartition === 'all' ? '#FFFFFF' : '#94A3B8'}
              />
              <ThemedText
                style={[
                  styles.partitionButtonText,
                  activePartition === 'all' && styles.partitionButtonTextActive,
                ]}>
                All Products ({COSMETIC_PRODUCTS.length})
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setActivePartition('cosmetics')}
              style={[
                styles.partitionButton,
                styles.cosmeticsPartitionBtn,
                activePartition === 'cosmetics' && styles.partitionButtonActiveCosmetics,
              ]}>
              <Ionicons
                name="color-wand"
                size={14}
                color={activePartition === 'cosmetics' ? '#FFFFFF' : '#F3A6B2'}
              />
              <ThemedText
                style={[
                  styles.partitionButtonText,
                  styles.cosmeticsPartitionText,
                  activePartition === 'cosmetics' && styles.partitionButtonTextActive,
                ]}>
                💄 Cosmetics & Skincare ({cosmeticsCount})
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setActivePartition('others')}
              style={[
                styles.partitionButton,
                styles.othersPartitionBtn,
                activePartition === 'others' && styles.partitionButtonActiveOthers,
              ]}>
              <Ionicons
                name="sparkles-sharp"
                size={14}
                color={activePartition === 'others' ? '#FFFFFF' : '#38BDF8'}
              />
              <ThemedText
                style={[
                  styles.partitionButtonText,
                  styles.othersPartitionText,
                  activePartition === 'others' && styles.partitionButtonTextActive,
                ]}>
                ✨ Others & Salon Essentials ({othersCount})
              </ThemedText>
            </Pressable>
          </ScrollView>
        </View>

        {/* Product Cards Grid */}
        <View style={styles.grid}>
          {filteredProducts.map((product) => {
            const isCosmetics = product.partition === 'cosmetics';
            return (
              <View
                key={product.id}
                style={[styles.productCard, { width: cardWidth as any }]}>
                {/* Top Tag & Category */}
                <View style={styles.cardTopRow}>
                  <View style={[styles.partitionMiniBadge, isCosmetics ? styles.cosmeticsMini : styles.othersMini]}>
                    <ThemedText style={[styles.partitionMiniText, isCosmetics ? styles.cosmeticsMiniText : styles.othersMiniText]}>
                      {isCosmetics ? 'Cosmetic' : 'Others'}
                    </ThemedText>
                  </View>

                  <View style={styles.categoryBadge}>
                    <ThemedText style={styles.categoryBadgeText}>
                      {product.category}
                    </ThemedText>
                  </View>

                  <View style={styles.discountPill}>
                    <ThemedText style={styles.discountPillText}>
                      {product.volume}
                    </ThemedText>
                  </View>
                </View>

                {/* Product Title & Subtitle */}
                <ThemedText style={styles.productTitle}>
                  {product.name}
                </ThemedText>
                <ThemedText style={styles.productSubtitle} numberOfLines={2}>
                  {product.subtitle}
                </ThemedText>

                {/* Price & Rating */}
                <View style={styles.priceContainer}>
                  <View style={styles.priceLeft}>
                    <ThemedText style={styles.priceText}>{product.price}</ThemedText>
                    <ThemedText style={styles.origPriceText}>{product.originalPrice}</ThemedText>
                  </View>
                  <View style={styles.ratingBox}>
                    <Ionicons name="star" size={12} color="#D4AF37" />
                    <ThemedText style={styles.ratingText}>{product.rating}</ThemedText>
                  </View>
                </View>

                {/* RESULT TIMELINE BADGE (DARK BLUE CONTAINER) */}
                <View style={styles.resultBadgeContainer}>
                  <Ionicons name="time" size={13} color="#38BDF8" />
                  <ThemedText style={styles.resultBadgeLabel}>
                    Visible Results In:{' '}
                    <ThemedText style={styles.resultDaysHighlight}>
                      {product.resultDays}
                    </ThemedText>
                  </ThemedText>
                </View>

                {/* Highlight Banner */}
                <View style={styles.highlightRow}>
                  <Ionicons name="checkmark-circle-outline" size={13} color="#93C5FD" />
                  <ThemedText style={styles.highlightText} numberOfLines={1}>
                    {product.highlight}
                  </ThemedText>
                </View>

                {/* Routine Steps Quick Preview */}
                <View style={styles.routinePreviewBox}>
                  <View style={styles.routinePreviewHeader}>
                    <Ionicons name="book-outline" size={12} color="#38BDF8" />
                    <ThemedText style={styles.previewTitle}>
                      How to Use: {product.howToUseSteps.length} Steps Routine
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.previewStepOne} numberOfLines={1}>
                    Step 1: {product.howToUseSteps[0]?.title} • {product.howToUseSteps[0]?.description}
                  </ThemedText>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonGroup}>
                  <Pressable
                    onPress={() => handleOpenRoutine(product)}
                    style={({ pressed }) => [styles.routineButton, pressed && styles.pressed]}>
                    <Ionicons name="information-circle-outline" size={15} color="#060C17" />
                    <ThemedText style={styles.routineButtonText}>
                      How to Use & Timeline
                    </ThemedText>
                  </Pressable>

                  <Pressable
                    onPress={() => handleQuickInquire(product)}
                    style={({ pressed }) => [styles.inquireButton, pressed && styles.pressed]}
                    accessibilityLabel="WhatsApp Inquire">
                    <Ionicons name="logo-whatsapp" size={16} color="#25D366" />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Routine Detail Modal */}
      <CosmeticsRoutineModal
        product={selectedProduct}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 28,
    backgroundColor: '#07090E',
  },
  innerConstraint: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  subtitleScript: {
    fontSize: 13,
    color: '#38BDF8',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '700',
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
    maxWidth: 620,
    lineHeight: 19,
  },

  // PARTITION SELECTOR
  partitionSelectorContainer: {
    marginBottom: 20,
  },
  partitionScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partitionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#0D1527',
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  cosmeticsPartitionBtn: {
    borderColor: '#382236',
    backgroundColor: '#160E1A',
  },
  othersPartitionBtn: {
    borderColor: '#172E54',
    backgroundColor: '#0B172E',
  },
  partitionButtonActive: {
    backgroundColor: '#1E40AF',
    borderColor: '#60A5FA',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  partitionButtonActiveCosmetics: {
    backgroundColor: '#9D174D',
    borderColor: '#F472B6',
  },
  partitionButtonActiveOthers: {
    backgroundColor: '#0369A1',
    borderColor: '#38BDF8',
  },
  partitionButtonText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#94A3B8',
  },
  cosmeticsPartitionText: {
    color: '#F472B6',
  },
  othersPartitionText: {
    color: '#7DD3FC',
  },
  partitionButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // GRID
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'flex-start',
  },

  // PRODUCT CARD (DARK BLUE ACCENT LUXURY)
  productCard: {
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
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 6,
  },
  partitionMiniBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 0.5,
  },
  cosmeticsMini: {
    backgroundColor: 'rgba(230, 164, 180, 0.15)',
    borderColor: 'rgba(230, 164, 180, 0.4)',
  },
  othersMini: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  partitionMiniText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
  cosmeticsMiniText: {
    color: '#F3A6B2',
  },
  othersMiniText: {
    color: '#38BDF8',
  },
  categoryBadge: {
    backgroundColor: '#122244',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  categoryBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#BAE6FD',
  },
  discountPill: {
    backgroundColor: '#0F1A30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 22,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#93A4C7',
    marginBottom: 10,
    lineHeight: 16,
    minHeight: 32,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#38BDF8',
  },
  origPriceText: {
    fontSize: 12,
    color: '#475569',
    textDecorationLine: 'line-through',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F4CA64',
  },

  // RESULTS IN DAYS BADGE (DARK BLUE CONTAINER)
  resultBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0D1B36',
    borderWidth: 1,
    borderColor: '#1E40AF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 10,
  },
  resultBadgeLabel: {
    fontSize: 11,
    color: '#93C5FD',
    fontWeight: '600',
  },
  resultDaysHighlight: {
    fontSize: 11.5,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  highlightText: {
    fontSize: 11.5,
    color: '#CBD5E1',
    flex: 1,
  },

  routinePreviewBox: {
    backgroundColor: '#070E1C',
    borderRadius: 10,
    padding: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#142342',
  },
  routinePreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  previewTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7DD3FC',
  },
  previewStepOne: {
    fontSize: 10.5,
    color: '#64748B',
  },

  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  routineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#38BDF8',
    paddingVertical: 9,
    borderRadius: 10,
  },
  routineButtonText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#030816',
  },
  inquireButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#0D182E',
    borderWidth: 1,
    borderColor: '#1E3A6A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
