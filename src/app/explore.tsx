import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Platform,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import {
  COSMETIC_PRODUCTS,
  CosmeticProduct,
  SALON_INFO,
} from '@/constants/beauty-data';
import { CosmeticsRoutineModal } from '@/components/beauty/CosmeticsRoutineModal';
import { BookingConsultationModal } from '@/components/beauty/BookingConsultationModal';

const BEAUTY_ROUTINES_GUIDE = [
  {
    id: 'guide-1',
    title: 'Daily Morning Glow Skincare Ritual',
    time: '5 Minutes Daily',
    steps: [
      'Cleanse with lukewarm water using a pH-balanced gentle cleanser.',
      'Spritz Damask Rose Water Mist across face to restore hydration balance.',
      'Apply 3 drops of 15% Vitamin C Serum on damp skin for cellular brightening.',
      'Seal with light peptide moisturizer and essential broad-spectrum SPF 50+.',
    ],
    proTip: 'Never skip sunscreen after Vitamin C — it synergizes and prevents photodamage.',
  },
  {
    id: 'guide-2',
    title: 'Salon Acrylic & Gel Nail Care at Home',
    time: 'Nightly 2 Minutes',
    steps: [
      'Avoid using nail tips as tools (opening cans, scraping stickers).',
      'Apply Botanical Cuticle Oil each evening directly around nail edges.',
      'Wear gloves during dishwashing and household cleaning chores.',
      'Book a refill or buff at Iswari Beautician every 2.5 to 3 weeks.',
    ],
    proTip: 'Cuticle hydration maintains flexible nail matrix and stops gel lifting.',
  },
  {
    id: 'guide-3',
    title: 'Keratin & Frizz-Free Hair Therapy',
    time: 'Weekly Routine',
    steps: [
      'Wash with sulfate-free smoothing shampoo using cool water.',
      'Squeeze excess water before applying Argan & Keratin Mask for 10 minutes.',
      'Rinse thoroughly and towel pat without aggressive rubbing.',
      'Apply 2 drops of Moroccan Argan Elixir to ends before heat blow-drying.',
    ],
    proTip: 'Blow-dry with the nozzle pointed downwards to flatten the hair cuticle for mirror shine.',
  },
];

export default function ExploreScreen() {
  const [selectedProduct, setSelectedProduct] = useState<CosmeticProduct | null>(null);
  const [routineModalVisible, setRoutineModalVisible] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);
  const safeAreaInsets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const isWide = width >= 720;

  const handleOpenRoutine = (prod: CosmeticProduct) => {
    setSelectedProduct(prod);
    setRoutineModalVisible(true);
  };

  const handleConsultWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${SALON_INFO.name}! I would like to consult with a beautician regarding my skin and haircare routine.`
    );
    Linking.openURL(`https://wa.me/${SALON_INFO.whatsapp.replace('+', '')}?text=${text}`).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: safeAreaInsets.bottom + 90 },
        ]}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Image
              source={require('@/assets/images/iswari-logo.png')}
              style={styles.logo}
              contentFit="cover"
            />
            <View>
              <ThemedText style={styles.salonName}>{SALON_INFO.name}</ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Beauty Masterclass & Product Guide
              </ThemedText>
            </View>
          </View>

          <ThemedText style={styles.mainTitle}>
            How to Use Your Products & Achieve Flawless Results
          </ThemedText>
          <ThemedText style={styles.mainCaption}>
            Expert beautician advice, step-by-step daily routines, and proper application techniques to maximize your salon glow at home.
          </ThemedText>
        </View>

        {/* Master Routines Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="sparkles" size={17} color="#E6A4B4" />
            <ThemedText style={styles.sectionTitle}>
              Curated Daily Routines
            </ThemedText>
          </View>

          <View style={styles.guidesContainer}>
            {BEAUTY_ROUTINES_GUIDE.map((guide, idx) => (
              <View key={guide.id} style={styles.guideCard}>
                <View style={styles.guideTop}>
                  <View style={styles.guideNumberBadge}>
                    <ThemedText style={styles.guideNumberText}>0{idx + 1}</ThemedText>
                  </View>
                  <View style={styles.guideTitleCol}>
                    <ThemedText style={styles.guideTitle}>{guide.title}</ThemedText>
                    <ThemedText style={styles.guideTime}>⏱ {guide.time}</ThemedText>
                  </View>
                </View>

                <View style={styles.stepsList}>
                  {guide.steps.map((st, i) => (
                    <View key={i} style={styles.stepItemRow}>
                      <View style={styles.stepBullet} />
                      <ThemedText style={styles.stepText}>{st}</ThemedText>
                    </View>
                  ))}
                </View>

                <View style={styles.proTipBox}>
                  <Ionicons name="bulb-outline" size={14} color="#D4AF37" />
                  <ThemedText style={styles.proTipText}>
                    <ThemedText style={{ fontWeight: '700', color: '#F4CA64' }}>
                      Pro Tip:{' '}
                    </ThemedText>
                    {guide.proTip}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Cosmetics Product Catalog with interactive 'How to Use' */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="bag-handle-outline" size={17} color="#E6A4B4" />
            <ThemedText style={styles.sectionTitle}>
              Cosmetics Usage Cards
            </ThemedText>
          </View>
          <ThemedText style={styles.sectionSub}>
            Tap any product below to open its animated Step-by-Step guide.
          </ThemedText>

          <View style={styles.productCardsGrid}>
            {COSMETIC_PRODUCTS.map((prod) => (
              <Pressable
                key={prod.id}
                onPress={() => handleOpenRoutine(prod)}
                style={({ pressed }) => [
                  styles.prodCard,
                  isWide && styles.prodCardHalf,
                  pressed && styles.pressed,
                ]}>
                <View style={styles.prodHeader}>
                  <View style={styles.prodCatPill}>
                    <ThemedText style={styles.prodCatText}>{prod.category}</ThemedText>
                  </View>
                  <ThemedText style={styles.prodPrice}>{prod.price}</ThemedText>
                </View>

                <ThemedText style={styles.prodName}>{prod.name}</ThemedText>
                <ThemedText style={styles.prodDesc} numberOfLines={2}>
                  {prod.subtitle}
                </ThemedText>

                <View style={styles.prodFooter}>
                  <View style={styles.stepsBadge}>
                    <Ionicons name="list" size={12} color="#F3A6B2" />
                    <ThemedText style={styles.stepsBadgeText}>
                      {prod.howToUseSteps.length} Steps Routine
                    </ThemedText>
                  </View>
                  <View style={styles.viewGuideRow}>
                    <ThemedText style={styles.viewGuideText}>View Steps</ThemedText>
                    <Ionicons name="chevron-forward" size={13} color="#E6A4B4" />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Salon FAQ Collapsibles */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="help-circle-outline" size={17} color="#E6A4B4" />
            <ThemedText style={styles.sectionTitle}>
              Frequently Asked Questions
            </ThemedText>
          </View>

          <View style={styles.faqWrapper}>
            <Collapsible title="Which facial should I choose for my skin type?">
              <ThemedText style={styles.faqAnswer}>
                For dry or dehydrated skin, our Hydra-Infusion Facial restores deep moisture. For pigmentation or acne blemishes, our Derma Enzyme & LED Peel is recommended. Visit us for a complimentary digital skin analysis.
              </ThemedText>
            </Collapsible>

            <Collapsible title="How long do VIP Acrylic & Shellac nail extensions last?">
              <ThemedText style={styles.faqAnswer}>
                Our premium sculpted acrylics and shellac gels last 3 to 4 weeks with proper care. Applying our Botanical Cuticle Therapy Oil daily extends shine and keeps cuticles healthy.
              </ThemedText>
            </Collapsible>

            <Collapsible title="Are your cosmetic products cruelty-free & safe?">
              <ThemedText style={styles.faqAnswer}>
                Yes! 100% of our serums, oils, and toners are cruelty-free, paraben-free, and dermatologically formulated with skin-friendly botanical extracts.
              </ThemedText>
            </Collapsible>

            <Collapsible title="How early should I book bridal packages?">
              <ThemedText style={styles.faqAnswer}>
                We recommend reserving pre-bridal and wedding makeover dates at least 4 to 8 weeks in advance to secure prime dates and plan your personalized skin rejuvenation calendar.
              </ThemedText>
            </Collapsible>
          </View>
        </View>

        {/* Free Consultation CTA Banner */}
        <View style={styles.consultBanner}>
          <Ionicons name="chatbubbles" size={32} color="#E6A4B4" />
          <ThemedText style={styles.consultTitle}>
            Need Personalized Beauty Guidance?
          </ThemedText>
          <ThemedText style={styles.consultDesc}>
            Speak directly with our senior beautician to discover the ideal treatment or cosmetic routine for your skin and hair goals.
          </ThemedText>

          <View style={styles.consultButtons}>
            <Pressable
              onPress={handleConsultWhatsApp}
              style={({ pressed }) => [styles.consultWaBtn, pressed && styles.pressed]}>
              <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
              <ThemedText style={styles.consultWaText}>Chat on WhatsApp</ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setBookingVisible(true)}
              style={({ pressed }) => [styles.consultBookBtn, pressed && styles.pressed]}>
              <Ionicons name="calendar-outline" size={15} color="#0A0A0E" />
              <ThemedText style={styles.consultBookText}>Book in Salon</ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Routine Stepper Modal */}
      <CosmeticsRoutineModal
        product={selectedProduct}
        visible={routineModalVisible}
        onClose={() => setRoutineModalVisible(false)}
      />

      {/* Booking Modal */}
      <BookingConsultationModal
        visible={bookingVisible}
        onClose={() => setBookingVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#08080C',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A28',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#E6A4B4',
  },
  salonName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#D4AF37',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 28,
  },
  mainCaption: {
    fontSize: 13,
    color: '#8E8EA0',
    lineHeight: 19,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sectionSub: {
    fontSize: 12,
    color: '#8A8A9E',
    marginBottom: 14,
  },
  guidesContainer: {
    gap: 14,
    marginTop: 10,
  },
  guideCard: {
    backgroundColor: '#12121A',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#222234',
    padding: 16,
  },
  guideTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  guideNumberBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#241826',
    borderWidth: 1,
    borderColor: '#E6A4B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideNumberText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F3A6B2',
  },
  guideTitleCol: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  guideTime: {
    fontSize: 11,
    color: '#D4AF37',
  },
  stepsList: {
    gap: 8,
    marginBottom: 12,
  },
  stepItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  stepBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#E6A4B4',
    marginTop: 6,
  },
  stepText: {
    fontSize: 12,
    color: '#B0B0C4',
    lineHeight: 18,
    flex: 1,
  },
  proTipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  proTipText: {
    fontSize: 11.5,
    color: '#E8DDB8',
    flex: 1,
    lineHeight: 16,
  },
  productCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  prodCard: {
    width: '100%',
    backgroundColor: '#14141E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#242436',
    padding: 14,
  },
  prodCardHalf: {
    width: '48.5%',
  },
  prodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  prodCatPill: {
    backgroundColor: '#1E1824',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(230, 164, 180, 0.3)',
  },
  prodCatText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E6A4B4',
  },
  prodPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#E6A4B4',
  },
  prodName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  prodDesc: {
    fontSize: 11.5,
    color: '#8A8A9E',
    lineHeight: 16,
    marginBottom: 10,
  },
  prodFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E1E2C',
    paddingTop: 8,
  },
  stepsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepsBadgeText: {
    fontSize: 11,
    color: '#F3A6B2',
    fontWeight: '600',
  },
  viewGuideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewGuideText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E6A4B4',
  },
  faqWrapper: {
    gap: 10,
    marginTop: 10,
  },
  faqAnswer: {
    fontSize: 12.5,
    color: '#A6A6BC',
    lineHeight: 19,
    paddingTop: 6,
  },
  consultBanner: {
    backgroundColor: '#161420',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#362434',
    padding: 20,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  consultTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 6,
    textAlign: 'center',
  },
  consultDesc: {
    fontSize: 12.5,
    color: '#9E9EB0',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
    maxWidth: 480,
  },
  consultButtons: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  consultWaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  consultWaText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  consultBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E6A4B4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  consultBookText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0A0A0E',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
