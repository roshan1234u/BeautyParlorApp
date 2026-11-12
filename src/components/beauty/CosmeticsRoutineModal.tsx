import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { CosmeticProduct, SALON_INFO } from '@/constants/beauty-data';

interface CosmeticsRoutineModalProps {
  product: CosmeticProduct | null;
  visible: boolean;
  onClose: () => void;
}

export const CosmeticsRoutineModal: React.FC<CosmeticsRoutineModalProps> = ({
  product,
  visible,
  onClose,
}) => {
  if (!product) return null;

  const handleOrderWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Iswari Beautician! I would like to order or reserve the "${product.name}" (${product.volume}) priced at ${product.price}. Please share availability and delivery/pickup details.`
    );
    Linking.openURL(`https://wa.me/${SALON_INFO.whatsapp.replace('+', '')}?text=${text}`).catch(() => {});
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.categoryPill}>
              <ThemedText style={styles.categoryPillText}>{product.category}</ThemedText>
            </View>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Title & Price */}
            <ThemedText style={styles.productTitle}>{product.name}</ThemedText>
            <ThemedText style={styles.productSubtitle}>{product.subtitle}</ThemedText>

            <View style={styles.priceRow}>
              <ThemedText style={styles.price}>{product.price}</ThemedText>
              <ThemedText style={styles.origPrice}>{product.originalPrice}</ThemedText>
              <View style={styles.volumePill}>
                <ThemedText style={styles.volumeText}>{product.volume}</ThemedText>
              </View>
              <View style={styles.ratingPill}>
                <Ionicons name="star" size={12} color="#D4AF37" />
                <ThemedText style={styles.ratingText}>
                  {product.rating} ({product.reviewsCount} reviews)
                </ThemedText>
              </View>
            </View>

            {/* Benefit Highlight Banner */}
            <View style={styles.highlightBanner}>
              <Ionicons name="sparkles" size={16} color="#E6A4B4" />
              <ThemedText style={styles.highlightText}>{product.highlight}</ThemedText>
            </View>

            {/* How to Use Routine Steps Header */}
            <View style={styles.routineHeader}>
              <View style={styles.routineIconBadge}>
                <Ionicons name="book-outline" size={16} color="#E6A4B4" />
              </View>
              <View>
                <ThemedText style={styles.routineTitle}>
                  Step-by-Step Beauty Routine
                </ThemedText>
                <ThemedText style={styles.routineSubtitle}>
                  Follow these expert application steps for maximum results
                </ThemedText>
              </View>
            </View>

            {/* Stepper Cards */}
            <View style={styles.stepsContainer}>
              {product.howToUseSteps.map((stepItem, index) => (
                <View key={stepItem.step} style={styles.stepCard}>
                  <View style={styles.stepNumberBadge}>
                    <ThemedText style={styles.stepNumberText}>
                      0{stepItem.step}
                    </ThemedText>
                  </View>
                  <View style={styles.stepContent}>
                    <ThemedText style={styles.stepHeading}>
                      {stepItem.title}
                    </ThemedText>
                    <ThemedText style={styles.stepDesc}>
                      {stepItem.description}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>

            {/* Beautician's Pro Tip Box */}
            <View style={styles.tipBox}>
              <View style={styles.tipHeader}>
                <Ionicons name="bulb" size={16} color="#F4CA64" />
                <ThemedText style={styles.tipTitle}>
                  Iswari Beautician's Secret Tip
                </ThemedText>
              </View>
              <ThemedText style={styles.tipText}>
                "{product.beauticianTip}"
              </ThemedText>
            </View>

            {/* Active Ingredients */}
            <View style={styles.ingredientsSection}>
              <ThemedText style={styles.ingredientsTitle}>
                Key Active Ingredients
              </ThemedText>
              <View style={styles.ingredientsRow}>
                {product.keyIngredients.map((ing, i) => (
                  <View key={i} style={styles.ingredientPill}>
                    <Ionicons name="leaf-outline" size={11} color="#94D2BD" />
                    <ThemedText style={styles.ingredientText}>{ing}</ThemedText>
                  </View>
                ))}
              </View>
            </View>

            {/* Order / Reserve Actions */}
            <View style={styles.actionButtonsRow}>
              <Pressable
                onPress={handleOrderWhatsApp}
                style={({ pressed }) => [styles.whatsappButton, pressed && styles.pressed]}>
                <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" />
                <ThemedText style={styles.whatsappButtonText}>
                  Order via WhatsApp ({product.price})
                </ThemedText>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#12121A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: '#29293C',
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2E',
  },
  categoryPill: {
    backgroundColor: '#261724',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(230, 164, 180, 0.4)',
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F3A6B2',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#20202F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 13,
    color: '#9C9CB0',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: '900',
    color: '#E6A4B4',
  },
  origPrice: {
    fontSize: 14,
    color: '#6E6E82',
    textDecorationLine: 'line-through',
  },
  volumePill: {
    backgroundColor: '#1A1A28',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  volumeText: {
    fontSize: 11,
    color: '#A0A0B5',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 11,
    color: '#F4CA64',
    fontWeight: '600',
  },
  highlightBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(230, 164, 180, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(230, 164, 180, 0.3)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  highlightText: {
    fontSize: 12.5,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  routineIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#221926',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  routineSubtitle: {
    fontSize: 11,
    color: '#8A8A9E',
  },
  stepsContainer: {
    gap: 10,
    marginBottom: 18,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#171724',
    borderWidth: 1,
    borderColor: '#242436',
    borderRadius: 14,
    padding: 12,
  },
  stepNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#261B28',
    borderWidth: 1,
    borderColor: '#E6A4B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#F3A6B2',
  },
  stepContent: {
    flex: 1,
  },
  stepHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  stepDesc: {
    fontSize: 12,
    color: '#A6A6BC',
    lineHeight: 18,
  },
  tipBox: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  tipTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#F4CA64',
    letterSpacing: 0.3,
  },
  tipText: {
    fontSize: 12,
    color: '#E8DDB8',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  ingredientsSection: {
    marginBottom: 22,
  },
  ingredientsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  ingredientsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  ingredientPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#161B1E',
    borderWidth: 1,
    borderColor: '#263836',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ingredientText: {
    fontSize: 11,
    color: '#A0C6BC',
  },
  actionButtonsRow: {
    marginTop: 6,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#25D366',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  whatsappButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
