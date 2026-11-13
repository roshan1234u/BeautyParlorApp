import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
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
      'Cleanse with lukewarm water using a pH-balanced gentle foaming cleanser.',
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
      'Apply Botanical Cuticle Oil each evening directly around nail edges and cuticles.',
      'Wear gloves during dishwashing and household cleaning chores.',
      'Book a refill or buff at Iswari Beautician every 2.5 to 3 weeks.',
    ],
    proTip: 'Cuticle hydration maintains a flexible nail matrix and stops gel lifting.',
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

type PartitionFilter = 'all' | 'cosmetics' | 'others';
type SpeedFilter = 'all' | 'fast' | 'medium' | 'extended';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePartition, setActivePartition] = useState<PartitionFilter>('all');
  const [speedFilter, setSpeedFilter] = useState<SpeedFilter>('all');
  const [selectedProduct, setSelectedProduct] = useState<CosmeticProduct | null>(null);
  const [routineModalVisible, setRoutineModalVisible] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);

  const safeAreaInsets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const isWide = width >= 680;
  const isDesktop = width >= 1040;

  const cardWidth = isDesktop
    ? '31.5%'
    : isWide
    ? '48.5%'
    : '100%';

  const handleOpenRoutine = (prod: CosmeticProduct) => {
    setSelectedProduct(prod);
    setRoutineModalVisible(true);
  };

  const handleConsultWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${SALON_INFO.name}! I would like to consult with a beautician regarding my skin and haircare routine and product usage.`
    );
    Linking.openURL(`https://wa.me/${SALON_INFO.whatsapp.replace('+', '')}?text=${text}`).catch(() => {});
  };

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return COSMETIC_PRODUCTS.filter((prod) => {
      // 1. Partition filter
      if (activePartition !== 'all' && prod.partition !== activePartition) {
        return false;
      }

      // 2. Speed filter
      if (speedFilter === 'fast') {
        const isFast = prod.resultDays.includes('1 -') || prod.resultDays.includes('3 -') || prod.resultDays.includes('Immediate');
        if (!isFast) return false;
      } else if (speedFilter === 'medium') {
        const isMed = prod.resultDays.includes('7 -') || prod.resultDays.includes('10 -') || prod.resultDays.includes('5 -');
        if (!isMed) return false;
      } else if (speedFilter === 'extended') {
        const isExt = prod.resultDays.includes('14 -') || prod.resultDays.includes('21 -');
        if (!isExt) return false;
      }

      // 3. Search query
      if (!query) return true;

      const searchableText = [
        prod.name,
        prod.subtitle,
        prod.category,
        prod.partition,
        prod.highlight,
        prod.resultDays,
        prod.resultTimeline.summary,
        prod.suitableFor,
        prod.usageFrequency,
        prod.keyIngredients.join(' '),
        ...prod.howToUseSteps.map((s) => `${s.title} ${s.description}`),
      ].join(' ').toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery, activePartition, speedFilter]);

  const cosmeticsCount = COSMETIC_PRODUCTS.filter((p) => p.partition === 'cosmetics').length;
  const othersCount = COSMETIC_PRODUCTS.filter((p) => p.partition === 'others').length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: safeAreaInsets.bottom + 90 },
        ]}>
        <View style={styles.contentConstraint}>
          {/* Top Brand Header */}
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
                  Beauty Masterclass & Product Search Hub
                </ThemedText>
              </View>
            </View>

            <ThemedText style={styles.mainTitle}>
              Product Guide, How to Use & Result Timeline
            </ThemedText>
            <ThemedText style={styles.mainCaption}>
              Search formulas, explore how many days until visible results, and learn step-by-step master rituals tailored to your beauty goals.
            </ThemedText>
          </View>

          {/* SEARCH & DISCOVERY BAR (DARK BLUE CONTAINER) */}
          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="#38BDF8" style={styles.searchIcon} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search products, ingredients, how to use, days to result..."
                placeholderTextColor="#64748B"
                style={styles.searchInput}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
              {searchQuery.length > 0 && (
                <Pressable
                  onPress={() => setSearchQuery('')}
                  style={styles.clearSearchBtn}
                  hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </Pressable>
              )}
            </View>

            {/* PARTITION SELECTOR */}
            <View style={styles.partitionSelectorRow}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterChipsRow}>
                <Pressable
                  onPress={() => setActivePartition('all')}
                  style={[
                    styles.partitionChip,
                    activePartition === 'all' && styles.partitionChipActive,
                  ]}>
                  <Ionicons
                    name="grid-outline"
                    size={13}
                    color={activePartition === 'all' ? '#FFFFFF' : '#94A3B8'}
                  />
                  <ThemedText
                    style={[
                      styles.partitionChipText,
                      activePartition === 'all' && styles.partitionChipTextActive,
                    ]}>
                    All ({COSMETIC_PRODUCTS.length})
                  </ThemedText>
                </Pressable>

                <Pressable
                  onPress={() => setActivePartition('cosmetics')}
                  style={[
                    styles.partitionChip,
                    styles.cosmeticsChip,
                    activePartition === 'cosmetics' && styles.partitionChipActiveCosmetics,
                  ]}>
                  <Ionicons
                    name="color-palette-outline"
                    size={13}
                    color={activePartition === 'cosmetics' ? '#FFFFFF' : '#F472B6'}
                  />
                  <ThemedText
                    style={[
                      styles.partitionChipText,
                      styles.cosmeticsChipText,
                      activePartition === 'cosmetics' && styles.partitionChipTextActive,
                    ]}>
                    💄 Cosmetics & Skincare ({cosmeticsCount})
                  </ThemedText>
                </Pressable>

                <Pressable
                  onPress={() => setActivePartition('others')}
                  style={[
                    styles.partitionChip,
                    styles.othersChip,
                    activePartition === 'others' && styles.partitionChipActiveOthers,
                  ]}>
                  <Ionicons
                    name="sparkles-outline"
                    size={13}
                    color={activePartition === 'others' ? '#FFFFFF' : '#38BDF8'}
                  />
                  <ThemedText
                    style={[
                      styles.partitionChipText,
                      styles.othersChipText,
                      activePartition === 'others' && styles.partitionChipTextActive,
                    ]}>
                    ✨ Others & Salon Essentials ({othersCount})
                  </ThemedText>
                </Pressable>
              </ScrollView>
            </View>

            {/* RESULT SPEED FILTER */}
            <View style={styles.speedFilterContainer}>
              <ThemedText style={styles.speedFilterLabel}>Results Speed:</ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.speedScroll}>
                <Pressable
                  onPress={() => setSpeedFilter('all')}
                  style={[
                    styles.speedPill,
                    speedFilter === 'all' && styles.speedPillActive,
                  ]}>
                  <ThemedText
                    style={[
                      styles.speedPillText,
                      speedFilter === 'all' && styles.speedPillTextActive,
                    ]}>
                    Any Time
                  </ThemedText>
                </Pressable>

                <Pressable
                  onPress={() => setSpeedFilter('fast')}
                  style={[
                    styles.speedPill,
                    speedFilter === 'fast' && styles.speedPillActive,
                  ]}>
                  <Ionicons name="flash-outline" size={11} color="#38BDF8" />
                  <ThemedText
                    style={[
                      styles.speedPillText,
                      speedFilter === 'fast' && styles.speedPillTextActive,
                    ]}>
                    Fast (1 - 7 Days)
                  </ThemedText>
                </Pressable>

                <Pressable
                  onPress={() => setSpeedFilter('medium')}
                  style={[
                    styles.speedPill,
                    speedFilter === 'medium' && styles.speedPillActive,
                  ]}>
                  <Ionicons name="time-outline" size={11} color="#38BDF8" />
                  <ThemedText
                    style={[
                      styles.speedPillText,
                      speedFilter === 'medium' && styles.speedPillTextActive,
                    ]}>
                    7 - 14 Days
                  </ThemedText>
                </Pressable>

                <Pressable
                  onPress={() => setSpeedFilter('extended')}
                  style={[
                    styles.speedPill,
                    speedFilter === 'extended' && styles.speedPillActive,
                  ]}>
                  <Ionicons name="calendar-outline" size={11} color="#38BDF8" />
                  <ThemedText
                    style={[
                      styles.speedPillText,
                      speedFilter === 'extended' && styles.speedPillTextActive,
                    ]}>
                    14 - 30 Days
                  </ThemedText>
                </Pressable>
              </ScrollView>
            </View>

            {/* Results Counter / Status */}
            <View style={styles.resultsCountBar}>
              <ThemedText style={styles.resultsCountText}>
                Showing <ThemedText style={styles.resultsCountNumber}>{filteredProducts.length}</ThemedText> product{filteredProducts.length !== 1 ? 's' : ''}
                {searchQuery ? ` matching "${searchQuery}"` : ''}
              </ThemedText>
              {(searchQuery.length > 0 || activePartition !== 'all' || speedFilter !== 'all') && (
                <Pressable
                  onPress={() => {
                    setSearchQuery('');
                    setActivePartition('all');
                    setSpeedFilter('all');
                  }}>
                  <ThemedText style={styles.resetFiltersText}>Reset Filters</ThemedText>
                </Pressable>
              )}
            </View>
          </View>

          {/* PRODUCT CATALOG RESULTS GRID */}
          <View style={styles.catalogSection}>
            {filteredProducts.length === 0 ? (
              <View style={styles.emptyStateBox}>
                <Ionicons name="search-outline" size={42} color="#38BDF8" />
                <ThemedText style={styles.emptyStateTitle}>No Products Found</ThemedText>
                <ThemedText style={styles.emptyStateSubtitle}>
                  We couldn't find any products matching your search. Try different keywords or switch partitions.
                </ThemedText>
                <Pressable
                  onPress={() => {
                    setSearchQuery('');
                    setActivePartition('all');
                    setSpeedFilter('all');
                  }}
                  style={styles.emptyResetBtn}>
                  <ThemedText style={styles.emptyResetText}>View All Products</ThemedText>
                </Pressable>
              </View>
            ) : (
              <View style={styles.productCardsGrid}>
                {filteredProducts.map((prod) => {
                  const isCosmetics = prod.partition === 'cosmetics';
                  return (
                    <Pressable
                      key={prod.id}
                      onPress={() => handleOpenRoutine(prod)}
                      style={({ pressed }) => [
                        styles.prodCard,
                        { width: cardWidth as any },
                        pressed && styles.pressed,
                      ]}>
                      {/* Top Badges */}
                      <View style={styles.prodHeader}>
                        <View style={[styles.partitionMiniPill, isCosmetics ? styles.cosmeticsPill : styles.othersPill]}>
                          <ThemedText style={[styles.partitionMiniText, isCosmetics ? styles.cosmeticsText : styles.othersText]}>
                            {isCosmetics ? '💄 Cosmetic' : '✨ Others'}
                          </ThemedText>
                        </View>

                        <View style={styles.prodCatPill}>
                          <ThemedText style={styles.prodCatText}>{prod.category}</ThemedText>
                        </View>

                        <ThemedText style={styles.prodPrice}>{prod.price}</ThemedText>
                      </View>

                      {/* Product Name & Subtitle */}
                      <ThemedText style={styles.prodName}>{prod.name}</ThemedText>
                      <ThemedText style={styles.prodDesc} numberOfLines={2}>
                        {prod.subtitle}
                      </ThemedText>

                      {/* HOW MANY DAYS AFTER TO GET A PROPER RESULT BADGE */}
                      <View style={styles.resultDaysCard}>
                        <View style={styles.resultDaysIconWrap}>
                          <Ionicons name="hourglass-outline" size={13} color="#38BDF8" />
                        </View>
                        <View style={styles.resultDaysTextCol}>
                          <ThemedText style={styles.resultDaysLabel}>Proper Results In:</ThemedText>
                          <ThemedText style={styles.resultDaysValue}>{prod.resultDays}</ThemedText>
                        </View>
                      </View>

                      {/* Result summary snippet */}
                      <ThemedText style={styles.resultSummarySnippet} numberOfLines={1}>
                        ⚡ {prod.resultTimeline.summary}
                      </ThemedText>

                      {/* Card Footer with Steps & Guide button */}
                      <View style={styles.prodFooter}>
                        <View style={styles.stepsBadge}>
                          <Ionicons name="list" size={12} color="#38BDF8" />
                          <ThemedText style={styles.stepsBadgeText}>
                            {prod.howToUseSteps.length} Steps How to Use
                          </ThemedText>
                        </View>
                        <View style={styles.viewGuideRow}>
                          <ThemedText style={styles.viewGuideText}>View Routine</ThemedText>
                          <Ionicons name="chevron-forward" size={13} color="#38BDF8" />
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          {/* Master Routines Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="sparkles" size={17} color="#38BDF8" />
              <ThemedText style={styles.sectionTitle}>
                Curated Daily Beauty Master Routines
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

          {/* Salon FAQ Collapsibles */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="help-circle-outline" size={17} color="#38BDF8" />
              <ThemedText style={styles.sectionTitle}>
                Frequently Asked Beauty Questions
              </ThemedText>
            </View>

            <View style={styles.faqWrapper}>
              <Collapsible title="How many days after starting a serum should I see results?">
                <ThemedText style={styles.faqAnswer}>
                  Immediate hydration and radiance occur within 1 to 3 days. However, noticeable collagen improvement, cellular dark spot reduction, and skin barrier strengthening typically take between 7 to 14 days of consistent morning and evening use.
                </ThemedText>
              </Collapsible>

              <Collapsible title="What is the difference between Cosmetics and Others sections?">
                <ThemedText style={styles.faqAnswer}>
                  Our "Cosmetics & Skincare" section features active topical formulations like pure Vitamin C serums, 24K gold youth elixirs, and hydrating toners. The "Others & Salon Essentials" section features salon-grade treatment devices (like the 7-color LED mask), keratin hair therapies, derma-rollers, and botanical cuticle matrices.
                </ThemedText>
              </Collapsible>

              <Collapsible title="How do I properly layer my cosmetics routine?">
                <ThemedText style={styles.faqAnswer}>
                  Always apply products from thinnest to thickest texture: Cleanse → Mist / Toner → Water-based Serums (Vitamin C or Hyaluronic Acid) → Heavier Facial Oils (24K Gold Oil) → Moisturizer → Broad-spectrum SPF (daytime).
                </ThemedText>
              </Collapsible>

              <Collapsible title="How long do VIP Acrylic & Shellac nail extensions last?">
                <ThemedText style={styles.faqAnswer}>
                  Our premium sculpted acrylics and shellac gels last 3 to 4 weeks with proper care. Applying our Botanical Cuticle Therapy Oil nightly extends shine and keeps cuticles healthy.
                </ThemedText>
              </Collapsible>
            </View>
          </View>

          {/* Free Consultation CTA Banner (Dark Blue Container) */}
          <View style={styles.consultBanner}>
            <Ionicons name="chatbubbles" size={32} color="#38BDF8" />
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
    backgroundColor: '#07090E',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  contentConstraint: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 20,
    paddingTop: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
  },
  salonName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#38BDF8',
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
    color: '#94A3B8',
    lineHeight: 19,
  },

  // SEARCH SECTION (DARK BLUE ACCENTED)
  searchSection: {
    backgroundColor: '#0A1325',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1C355F',
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#060B17',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E3A6A',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    marginBottom: 14,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#FFFFFF',
  },
  clearSearchBtn: {
    padding: 4,
  },

  // PARTITION SELECTOR ROW
  partitionSelectorRow: {
    marginBottom: 12,
  },
  filterChipsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  partitionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#0D1A33',
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  cosmeticsChip: {
    backgroundColor: '#170E1C',
    borderColor: '#3D223B',
  },
  othersChip: {
    backgroundColor: '#0B172E',
    borderColor: '#1E3A6A',
  },
  partitionChipActive: {
    backgroundColor: '#1E40AF',
    borderColor: '#60A5FA',
  },
  partitionChipActiveCosmetics: {
    backgroundColor: '#9D174D',
    borderColor: '#F472B6',
  },
  partitionChipActiveOthers: {
    backgroundColor: '#0369A1',
    borderColor: '#38BDF8',
  },
  partitionChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  cosmeticsChipText: {
    color: '#F472B6',
  },
  othersChipText: {
    color: '#7DD3FC',
  },
  partitionChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // SPEED FILTER
  speedFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingTop: 4,
  },
  speedFilterLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  speedScroll: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  speedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#070F1F',
    borderWidth: 1,
    borderColor: '#142340',
  },
  speedPillActive: {
    backgroundColor: '#112954',
    borderColor: '#38BDF8',
  },
  speedPillText: {
    fontSize: 11,
    color: '#8A9BB8',
    fontWeight: '500',
  },
  speedPillTextActive: {
    color: '#38BDF8',
    fontWeight: '700',
  },

  // RESULTS COUNTER BAR
  resultsCountBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#12203B',
    paddingTop: 10,
    marginTop: 2,
  },
  resultsCountText: {
    fontSize: 12,
    color: '#8A9BB8',
  },
  resultsCountNumber: {
    fontWeight: '800',
    color: '#38BDF8',
  },
  resetFiltersText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#38BDF8',
  },

  // CATALOG RESULTS
  catalogSection: {
    marginBottom: 28,
  },
  emptyStateBox: {
    backgroundColor: '#0A1325',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1C355F',
    padding: 32,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 6,
  },
  emptyStateSubtitle: {
    fontSize: 12.5,
    color: '#8A9BB8',
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: 320,
  },
  emptyResetBtn: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 12,
  },
  emptyResetText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  productCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  prodCard: {
    backgroundColor: '#0A1325',
    borderWidth: 1,
    borderColor: '#1C355F',
    borderRadius: 16,
    padding: 16,
    marginBottom: 4,
  },
  prodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 6,
  },
  partitionMiniPill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 0.5,
  },
  cosmeticsPill: {
    backgroundColor: 'rgba(230, 164, 180, 0.15)',
    borderColor: 'rgba(230, 164, 180, 0.4)',
  },
  othersPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  partitionMiniText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
  cosmeticsText: {
    color: '#F3A6B2',
  },
  othersText: {
    color: '#38BDF8',
  },
  prodCatPill: {
    backgroundColor: '#102244',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1E3A6A',
  },
  prodCatText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#BAE6FD',
  },
  prodPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#38BDF8',
  },
  prodName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  prodDesc: {
    fontSize: 12,
    color: '#8A9BB8',
    marginBottom: 10,
    lineHeight: 16,
  },

  // RESULTS IN DAYS ROW
  resultDaysCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0D1B36',
    borderWidth: 1,
    borderColor: '#1E40AF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 8,
  },
  resultDaysIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#172554',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultDaysTextCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resultDaysLabel: {
    fontSize: 11,
    color: '#93C5FD',
  },
  resultDaysValue: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  resultSummarySnippet: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 12,
  },
  prodFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#12203B',
    paddingTop: 10,
  },
  stepsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepsBadgeText: {
    fontSize: 11,
    color: '#BAE6FD',
    fontWeight: '600',
  },
  viewGuideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewGuideText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#38BDF8',
  },

  // MASTER ROUTINES
  section: {
    marginBottom: 28,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  guidesContainer: {
    gap: 14,
  },
  guideCard: {
    backgroundColor: '#0A1325',
    borderWidth: 1,
    borderColor: '#1C355F',
    borderRadius: 16,
    padding: 16,
  },
  guideTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  guideNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#102244',
    borderWidth: 1,
    borderColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideNumberText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38BDF8',
  },
  guideTitleCol: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  guideTime: {
    fontSize: 11,
    color: '#8A9BB8',
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
    backgroundColor: '#38BDF8',
    marginTop: 6,
  },
  stepText: {
    fontSize: 12,
    color: '#CBD5E1',
    lineHeight: 17,
    flex: 1,
  },
  proTipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 10,
    padding: 10,
  },
  proTipText: {
    fontSize: 11.5,
    color: '#E8DDB8',
    lineHeight: 16,
    flex: 1,
  },

  // FAQ COLLAPSIBLES
  faqWrapper: {
    backgroundColor: '#0A1325',
    borderWidth: 1,
    borderColor: '#1C355F',
    borderRadius: 16,
    padding: 14,
    gap: 8,
  },
  faqAnswer: {
    fontSize: 12.5,
    color: '#94A3B8',
    lineHeight: 18,
    marginTop: 6,
  },

  // CONSULTATION BANNER
  consultBanner: {
    backgroundColor: '#0C1B38',
    borderWidth: 1.5,
    borderColor: '#1E40AF',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  consultTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 6,
    textAlign: 'center',
  },
  consultDesc: {
    fontSize: 12.5,
    color: '#93C5FD',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
    maxWidth: 420,
  },
  consultButtons: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
  },
  consultWaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#38BDF8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  consultBookText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#060E1C',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
