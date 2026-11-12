import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { COSMETIC_PRODUCTS, CosmeticProduct, SALON_INFO } from '@/constants/beauty-data';
import { CosmeticsRoutineModal } from './CosmeticsRoutineModal';

export const CosmeticsSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<CosmeticProduct | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  const isWide = width >= 720;
  const isTablet = width >= 1000;

  const cardWidth = isTablet
    ? '31.5%'
    : isWide
    ? '48.5%'
    : '100%';

  const handleOpenRoutine = (product: CosmeticProduct) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleQuickInquire = (product: CosmeticProduct) => {
    const text = encodeURIComponent(
      `Hello Iswari Beautician! I am interested in purchasing your "${product.name}" (${product.price}). Please tell me more about it.`
    );
    Linking.openURL(`https://wa.me/${SALON_INFO.whatsapp.replace('+', '')}?text=${text}`).catch(() => {});
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.subtitleRow}>
          <ThemedText style={styles.subtitleScript}>Skin & Haircare Clinic</ThemedText>
        </View>
        <ThemedText style={styles.title}>
          Cosmetics & Usage Routines
        </ThemedText>
        <ThemedText style={styles.caption}>
          Formulated with dermatological actives and organic botanicals. Tap any product to view its step-by-step beauty routine guide.
        </ThemedText>
      </View>

      {/* Product Cards Grid */}
      <View style={styles.grid}>
        {COSMETIC_PRODUCTS.map((product) => (
          <View
            key={product.id}
            style={[styles.productCard, { width: cardWidth as any }]}>
            {/* Top Tag & Category */}
            <View style={styles.cardTopRow}>
              <View style={styles.categoryBadge}>
                <ThemedText style={styles.categoryBadgeText}>
                  {product.category}
                </ThemedText>
              </View>
              <View style={styles.discountPill}>
                <ThemedText style={styles.discountPillText}>
                  SALE
                </ThemedText>
              </View>
            </View>

            {/* Product Title */}
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

            {/* Highlight Banner */}
            <View style={styles.highlightRow}>
              <Ionicons name="sparkles" size={12} color="#E6A4B4" />
              <ThemedText style={styles.highlightText} numberOfLines={1}>
                {product.highlight}
              </ThemedText>
            </View>

            {/* Routine Steps Preview */}
            <View style={styles.routinePreviewBox}>
              <ThemedText style={styles.previewTitle}>
                Expert Routine: {product.howToUseSteps.length} Steps
              </ThemedText>
              <ThemedText style={styles.previewStepOne} numberOfLines={1}>
                Step 1: {product.howToUseSteps[0]?.title} • {product.howToUseSteps[0]?.description}
              </ThemedText>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonGroup}>
              <Pressable
                onPress={() => handleOpenRoutine(product)}
                style={({ pressed }) => [styles.routineButton, pressed && styles.pressed]}>
                <Ionicons name="book-outline" size={14} color="#0A0A0E" />
                <ThemedText style={styles.routineButtonText}>
                  How to Use Routine
                </ThemedText>
              </Pressable>

              <Pressable
                onPress={() => handleQuickInquire(product)}
                style={({ pressed }) => [styles.inquireButton, pressed && styles.pressed]}>
                <Ionicons name="logo-whatsapp" size={15} color="#25D366" />
              </Pressable>
            </View>
          </View>
        ))}
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
    paddingVertical: 24,
    backgroundColor: '#0A0A0F',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitleRow: {
    marginBottom: 4,
  },
  subtitleScript: {
    fontSize: 14,
    color: '#E6A4B4',
    fontStyle: 'italic',
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
    color: '#8E8EA2',
    textAlign: 'center',
    maxWidth: 580,
    lineHeight: 19,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#14141E',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#242436',
    padding: 16,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: '#201A24',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(230, 164, 180, 0.3)',
  },
  categoryBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#E6A4B4',
  },
  discountPill: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#F4CA64',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#9090A6',
    lineHeight: 16,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E6A4B4',
  },
  origPriceText: {
    fontSize: 12,
    color: '#656578',
    textDecorationLine: 'line-through',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 11,
    color: '#F4CA64',
    fontWeight: '700',
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1B1B28',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  highlightText: {
    fontSize: 11,
    color: '#D0D0E2',
    flex: 1,
  },
  routinePreviewBox: {
    borderLeftWidth: 2,
    borderLeftColor: '#E6A4B4',
    paddingLeft: 8,
    marginBottom: 14,
  },
  previewTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F3A6B2',
    marginBottom: 2,
  },
  previewStepOne: {
    fontSize: 11,
    color: '#86869C',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#E6A4B4',
    paddingVertical: 10,
    borderRadius: 12,
  },
  routineButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0A0A0E',
  },
  inquireButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#1E2421',
    borderWidth: 1,
    borderColor: '#2F4F3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
