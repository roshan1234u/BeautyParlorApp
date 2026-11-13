import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Linking,
  Platform,
  useWindowDimensions,
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
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  if (!product) return null;

  const isCosmetics = product.partition === 'cosmetics';

  const handleOrderWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${SALON_INFO.name}! I would like to order or reserve "${product.name}" (${product.volume}) priced at ${product.price}. Please share availability and how to pick it up.`
    );
    Linking.openURL(`https://wa.me/${SALON_INFO.whatsapp.replace('+', '')}?text=${text}`).catch(() => {});
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={[styles.overlay, isLargeScreen && styles.overlayCentered]}>
        <View style={[styles.sheetContainer, isLargeScreen && styles.sheetContainerLarge]}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.headerBadgesRow}>
              <View style={[styles.partitionPill, isCosmetics ? styles.cosmeticsPartitionPill : styles.othersPartitionPill]}>
                <Ionicons
                  name={isCosmetics ? 'sparkles' : 'grid'}
                  size={11}
                  color={isCosmetics ? '#F3A6B2' : '#38BDF8'}
                />
                <ThemedText style={[styles.partitionPillText, isCosmetics ? styles.cosmeticsPillText : styles.othersPillText]}>
                  {isCosmetics ? 'Cosmetics & Skincare' : 'Salon & Others'}
                </ThemedText>
              </View>

              <View style={styles.categoryPill}>
                <ThemedText style={styles.categoryPillText}>{product.category}</ThemedText>
              </View>
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
            {/* Title & Subtitle */}
            <ThemedText style={styles.productTitle}>{product.name}</ThemedText>
            <ThemedText style={styles.productSubtitle}>{product.subtitle}</ThemedText>

            {/* Price & Rating Bar */}
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
              <Ionicons name="sparkles" size={16} color="#38BDF8" />
              <ThemedText style={styles.highlightText}>{product.highlight}</ThemedText>
            </View>

            {/* DARK BLUE SECTION: RESULT TIMELINE & HOW MANY DAYS TO GET PROPER RESULT */}
            <View style={styles.resultTimelineCard}>
              <View style={styles.resultTimelineHeader}>
                <View style={styles.resultClockBadge}>
                  <Ionicons name="hourglass-outline" size={16} color="#38BDF8" />
                </View>
                <View style={styles.resultTitleCol}>
                  <ThemedText style={styles.resultDaysTitle}>
                    Proper Results In: {product.resultDays}
                  </ThemedText>
                  <ThemedText style={styles.resultDaysSub}>
                    Clinical & beautician-observed timeline
                  </ThemedText>
                </View>
                <View style={styles.verifiedSpeedBadge}>
                  <Ionicons name="checkmark-circle" size={12} color="#34D399" />
                  <ThemedText style={styles.verifiedSpeedText}>Verified</ThemedText>
                </View>
              </View>

              <ThemedText style={styles.timelineSummaryText}>
                {product.resultTimeline.summary}
              </ThemedText>

              {/* Milestones Stepper */}
              <View style={styles.milestonesList}>
                {product.resultTimeline.milestones.map((milestone, idx) => (
                  <View key={idx} style={styles.milestoneRow}>
                    <View style={styles.milestoneDotCol}>
                      <View style={styles.milestoneDot} />
                      {idx < product.resultTimeline.milestones.length - 1 && (
                        <View style={styles.milestoneLine} />
                      )}
                    </View>
                    <View style={styles.milestoneContent}>
                      <ThemedText style={styles.milestoneDays}>
                        {milestone.days}
                      </ThemedText>
                      <ThemedText style={styles.milestoneEffect}>
                        {milestone.effect}
                      </ThemedText>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Usage Frequency & Skin Match Card */}
            <View style={styles.quickSpecsCard}>
              <View style={styles.specItem}>
                <Ionicons name="time-outline" size={15} color="#38BDF8" />
                <View style={styles.specTextCol}>
                  <ThemedText style={styles.specLabel}>Application Frequency</ThemedText>
                  <ThemedText style={styles.specVal}>{product.usageFrequency}</ThemedText>
                </View>
              </View>
              <View style={styles.specDivider} />
              <View style={styles.specItem}>
                <Ionicons name="shield-checkmark-outline" size={15} color="#D4AF37" />
                <View style={styles.specTextCol}>
                  <ThemedText style={styles.specLabel}>Suitable For</ThemedText>
                  <ThemedText style={styles.specVal}>{product.suitableFor}</ThemedText>
                </View>
              </View>
            </View>

            {/* HOW TO USE STEP-BY-STEP SECTION */}
            <View style={styles.routineHeader}>
              <View style={styles.routineIconBadge}>
                <Ionicons name="book-outline" size={16} color="#38BDF8" />
              </View>
              <View>
                <ThemedText style={styles.routineTitle}>
                  How to Use: Step-by-Step Instructions
                </ThemedText>
                <ThemedText style={styles.routineSubtitle}>
                  Follow these precise application techniques for optimal results
                </ThemedText>
              </View>
            </View>

            {/* Stepper Cards */}
            <View style={styles.stepsContainer}>
              {product.howToUseSteps.map((stepItem) => (
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
                    <Ionicons name="leaf-outline" size={11} color="#38BDF8" />
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
    backgroundColor: 'rgba(3, 7, 18, 0.88)',
    justifyContent: 'flex-end',
  },
  overlayCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  sheetContainer: {
    backgroundColor: '#0A1224',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: '#1E3A6A',
    maxHeight: '92%',
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  sheetContainerLarge: {
    width: '100%',
    maxWidth: 680,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#2563EB44',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#16284D',
    backgroundColor: '#070D1A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  headerBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  partitionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  cosmeticsPartitionPill: {
    backgroundColor: 'rgba(230, 164, 180, 0.15)',
    borderColor: 'rgba(230, 164, 180, 0.4)',
  },
  othersPartitionPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  partitionPillText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  cosmeticsPillText: {
    color: '#F3A6B2',
  },
  othersPillText: {
    color: '#7DD3FC',
  },
  categoryPill: {
    backgroundColor: '#122549',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#BAE6FD',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#162747',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  productTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 28,
  },
  productSubtitle: {
    fontSize: 13,
    color: '#93A4C7',
    marginBottom: 12,
    lineHeight: 18,
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
    color: '#38BDF8',
  },
  origPrice: {
    fontSize: 14,
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  volumePill: {
    backgroundColor: '#111E38',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  volumeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
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
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
  },
  highlightText: {
    fontSize: 12.5,
    color: '#E0F2FE',
    fontWeight: '600',
    flex: 1,
  },

  // RESULT TIMELINE CARD (DARK BLUE LUXURY CONTAINER)
  resultTimelineCard: {
    backgroundColor: '#0D1B36',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#1E40AF',
    padding: 16,
    marginBottom: 18,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  resultTimelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  resultClockBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#172554',
    borderWidth: 1,
    borderColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTitleCol: {
    flex: 1,
  },
  resultDaysTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#38BDF8',
  },
  resultDaysSub: {
    fontSize: 11,
    color: '#93C5FD',
  },
  verifiedSpeedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  verifiedSpeedText: {
    fontSize: 10.5,
    color: '#34D399',
    fontWeight: '700',
  },
  timelineSummaryText: {
    fontSize: 12.5,
    color: '#E2E8F0',
    lineHeight: 18,
    marginBottom: 14,
  },
  milestonesList: {
    paddingTop: 4,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  milestoneDotCol: {
    alignItems: 'center',
    width: 14,
  },
  milestoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#38BDF8',
    marginTop: 4,
  },
  milestoneLine: {
    width: 2,
    height: 32,
    backgroundColor: '#1E3A8A',
  },
  milestoneContent: {
    flex: 1,
    paddingBottom: 10,
  },
  milestoneDays: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7DD3FC',
    marginBottom: 2,
  },
  milestoneEffect: {
    fontSize: 11.5,
    color: '#CBD5E1',
    lineHeight: 16,
  },

  // QUICK SPECS
  quickSpecsCard: {
    flexDirection: 'row',
    backgroundColor: '#081020',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#16284D',
    padding: 12,
    marginBottom: 18,
    gap: 12,
  },
  specItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  specTextCol: {
    flex: 1,
  },
  specLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  specVal: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#F1F5F9',
    lineHeight: 16,
  },
  specDivider: {
    width: 1,
    backgroundColor: '#16284D',
  },

  // ROUTINE SECTION
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
    backgroundColor: '#102244',
    borderWidth: 1,
    borderColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routineTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  routineSubtitle: {
    fontSize: 11,
    color: '#8A9BB8',
  },
  stepsContainer: {
    gap: 10,
    marginBottom: 18,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#0B1428',
    borderWidth: 1,
    borderColor: '#16284D',
    borderRadius: 14,
    padding: 12,
  },
  stepNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F2147',
    borderWidth: 1,
    borderColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38BDF8',
  },
  stepContent: {
    flex: 1,
  },
  stepHeading: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  stepDesc: {
    fontSize: 12,
    color: '#94A3B8',
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
    backgroundColor: '#0D172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ingredientText: {
    fontSize: 11,
    color: '#93C5FD',
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
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
