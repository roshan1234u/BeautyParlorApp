import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { SERVICES_LIST, ServiceItem, SALON_INFO } from '@/constants/beauty-data';

interface BookingConsultationModalProps {
  visible: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
  promoCode?: string;
}

const TIME_SLOTS = [
  '10:30 AM',
  '12:00 PM',
  '02:30 PM',
  '04:00 PM',
  '06:00 PM',
  '07:30 PM',
];

export const BookingConsultationModal: React.FC<BookingConsultationModalProps> = ({
  visible,
  onClose,
  preselectedService,
  promoCode,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(
    preselectedService?.id || SERVICES_LIST[0].id
  );
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const selectedService =
    SERVICES_LIST.find((s) => s.id === selectedServiceId) || SERVICES_LIST[0];

  const handleBookViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Iswari Beautician! I would like to book an appointment:\n• Service: ${selectedService.title} (${selectedService.price})\n• Client Name: ${clientName || 'Guest'}\n• Phone: ${clientPhone || 'Not provided'}\n• Preferred Date: ${selectedDate}\n• Time Slot: ${selectedTime}${promoCode ? `\n• Promo Code: ${promoCode}` : ''}${notes ? `\n• Notes: ${notes}` : ''}`
    );
    Linking.openURL(`https://wa.me/${SALON_INFO.whatsapp.replace('+', '')}?text=${text}`).catch(() => {});
    setIsBooked(true);
  };

  const handleInstantConfirm = () => {
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <ThemedText style={styles.headerTitle}>
                Book VIP Treatment
              </ThemedText>
              <ThemedText style={styles.headerSub}>
                {SALON_INFO.name} • 1-on-1 Consultation
              </ThemedText>
            </View>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}>
              <Ionicons name="close" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          {isBooked ? (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-done-circle" size={54} color="#50C878" />
              </View>
              <ThemedText style={styles.successTitle}>
                Appointment Reserved!
              </ThemedText>
              <ThemedText style={styles.successDesc}>
                Thank you{clientName ? `, ${clientName}` : ''}! Your slot for{' '}
                <ThemedText style={{ color: '#E6A4B4', fontWeight: '700' }}>
                  {selectedService.title}
                </ThemedText>{' '}
                on {selectedDate} at {selectedTime} has been submitted. Our master beautician will confirm details via WhatsApp/SMS shortly.
              </ThemedText>
              <Pressable
                onPress={handleReset}
                style={({ pressed }) => [styles.confirmBtn, pressed && styles.pressed]}>
                <ThemedText style={styles.confirmBtnText}>Done</ThemedText>
              </Pressable>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
              {/* Promo code badge if active */}
              {promoCode ? (
                <View style={styles.promoAppliedBox}>
                  <Ionicons name="pricetag" size={14} color="#D4AF37" />
                  <ThemedText style={styles.promoAppliedText}>
                    Promo <ThemedText style={{ fontWeight: '800' }}>{promoCode}</ThemedText> Applied
                  </ThemedText>
                </View>
              ) : null}

              {/* Service Picker */}
              <ThemedText style={styles.fieldLabel}>Select Treatment</ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.servicesScroll}>
                {SERVICES_LIST.map((srv) => {
                  const isChosen = srv.id === selectedServiceId;
                  return (
                    <Pressable
                      key={srv.id}
                      onPress={() => setSelectedServiceId(srv.id)}
                      style={[
                        styles.srvChip,
                        isChosen ? styles.srvChipChosen : undefined,
                      ]}>
                      <ThemedText
                        style={[
                          styles.srvChipTitle,
                          isChosen ? styles.srvChipTitleChosen : undefined,
                        ]}>
                        {srv.title}
                      </ThemedText>
                      <ThemedText style={styles.srvChipPrice}>
                        {srv.price}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </ScrollView>

              {/* Preferred Date */}
              <ThemedText style={styles.fieldLabel}>Preferred Day</ThemedText>
              <View style={styles.daysRow}>
                {['Today', 'Tomorrow', 'This Weekend', 'Next Week'].map((day) => {
                  const isDay = selectedDate === day;
                  return (
                    <Pressable
                      key={day}
                      onPress={() => setSelectedDate(day)}
                      style={[
                        styles.dayChip,
                        isDay ? styles.dayChipActive : undefined,
                      ]}>
                      <ThemedText
                        style={[
                          styles.dayChipText,
                          isDay ? styles.dayChipTextActive : undefined,
                        ]}>
                        {day}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>

              {/* Time Slots */}
              <ThemedText style={styles.fieldLabel}>Preferred Time Slot</ThemedText>
              <View style={styles.slotsGrid}>
                {TIME_SLOTS.map((slot) => {
                  const isSlot = selectedTime === slot;
                  return (
                    <Pressable
                      key={slot}
                      onPress={() => setSelectedTime(slot)}
                      style={[
                        styles.slotChip,
                        isSlot ? styles.slotChipActive : undefined,
                      ]}>
                      <ThemedText
                        style={[
                          styles.slotText,
                          isSlot ? styles.slotTextActive : undefined,
                        ]}>
                        {slot}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>

              {/* Contact Inputs */}
              <ThemedText style={styles.fieldLabel}>Your Full Name</ThemedText>
              <TextInput
                placeholder="e.g. Priya Sharma"
                placeholderTextColor="#66667E"
                value={clientName}
                onChangeText={setClientName}
                style={styles.input}
              />

              <ThemedText style={styles.fieldLabel}>Mobile Number</ThemedText>
              <TextInput
                placeholder="+91 98765 43210"
                placeholderTextColor="#66667E"
                keyboardType="phone-pad"
                value={clientPhone}
                onChangeText={setClientPhone}
                style={styles.input}
              />

              {/* Notes */}
              <ThemedText style={styles.fieldLabel}>Special Requests or Skin Notes</ThemedText>
              <TextInput
                placeholder="Sensitive skin, wedding date, nail reference..."
                placeholderTextColor="#66667E"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={2}
                style={[styles.input, styles.textArea]}
              />

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <Pressable
                  onPress={handleBookViaWhatsApp}
                  style={({ pressed }) => [styles.whatsappBtn, pressed && styles.pressed]}>
                  <Ionicons name="logo-whatsapp" size={17} color="#FFFFFF" />
                  <ThemedText style={styles.whatsappBtnText}>
                    Send to WhatsApp
                  </ThemedText>
                </Pressable>

                <Pressable
                  onPress={handleInstantConfirm}
                  style={({ pressed }) => [styles.confirmBtn, pressed && styles.pressed]}>
                  <ThemedText style={styles.confirmBtnText}>
                    Confirm Slot
                  </ThemedText>
                </Pressable>
              </View>
            </ScrollView>
          )}
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
  card: {
    backgroundColor: '#13131C',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: '#26263A',
    maxHeight: '88%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#202030',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: 12,
    color: '#D4AF37',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E1E2C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
  },
  promoAppliedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderColor: 'rgba(212, 175, 55, 0.4)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 14,
  },
  promoAppliedText: {
    fontSize: 12,
    color: '#F4CA64',
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C6C6DA',
    marginBottom: 6,
    marginTop: 10,
  },
  servicesScroll: {
    gap: 8,
    paddingBottom: 6,
  },
  srvChip: {
    backgroundColor: '#1A1A26',
    borderWidth: 1,
    borderColor: '#2A2A3E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  srvChipChosen: {
    backgroundColor: '#261A25',
    borderColor: '#E6A4B4',
  },
  srvChipTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9E9EB2',
    marginBottom: 2,
  },
  srvChipTitleChosen: {
    color: '#F3A6B2',
    fontWeight: '700',
  },
  srvChipPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  daysRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayChip: {
    flex: 1,
    minWidth: '22%',
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#1A1A26',
    borderWidth: 1,
    borderColor: '#2A2A3E',
    alignItems: 'center',
  },
  dayChipActive: {
    backgroundColor: '#261A25',
    borderColor: '#E6A4B4',
  },
  dayChipText: {
    fontSize: 11,
    color: '#A0A0B4',
    fontWeight: '600',
  },
  dayChipTextActive: {
    color: '#F3A6B2',
    fontWeight: '700',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotChip: {
    width: '31%',
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#1A1A26',
    borderWidth: 1,
    borderColor: '#2A2A3E',
    alignItems: 'center',
  },
  slotChipActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderColor: '#D4AF37',
  },
  slotText: {
    fontSize: 11.5,
    color: '#A0A0B4',
  },
  slotTextActive: {
    color: '#F4CA64',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#191924',
    borderWidth: 1,
    borderColor: '#2C2C40',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 13,
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  whatsappBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#25D366',
    paddingVertical: 12,
    borderRadius: 14,
  },
  whatsappBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  confirmBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6A4B4',
    paddingVertical: 12,
    borderRadius: 14,
  },
  confirmBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0A0A0E',
  },
  successContainer: {
    alignItems: 'center',
    padding: 24,
  },
  successIcon: {
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  successDesc: {
    fontSize: 13,
    color: '#A0A0B6',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
