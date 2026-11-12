import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';

interface ExpoLoginModalProps {
  visible: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  userName: string;
  onLoginSuccess: (name: string) => void;
  onLogout: () => void;
}

export const ExpoLoginModal: React.FC<ExpoLoginModalProps> = ({
  visible,
  onClose,
  isLoggedIn,
  userName,
  onLoginSuccess,
  onLogout,
}) => {
  const [authMethod, setAuthMethod] = useState<'options' | 'phone' | 'expo'>('options');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [expoUsername, setExpoUsername] = useState('beauty_vip_member');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleExpoQuickLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess('VIP Member');
      onClose();
    }, 700);
  };

  const handlePhoneSubmit = () => {
    if (!otpSent) {
      if (phoneNumber.length < 10) return;
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setOtpSent(true);
      }, 600);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess(`VIP (${phoneNumber.slice(-4)})`);
        onClose();
        setOtpSent(false);
        setPhoneNumber('');
      }, 600);
    }
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess('VIP Guest');
      onClose();
    }, 800);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.logoRow}>
              <Image
                source={require('@/assets/images/iswari-logo.png')}
                style={styles.logo}
                contentFit="cover"
              />
              <View>
                <ThemedText style={styles.brandTitle}>Iswari Beautician</ThemedText>
                <ThemedText style={styles.brandTag}>Expo VIP Pass</ThemedText>
              </View>
            </View>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}>
              <Ionicons name="close" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          {isLoggedIn ? (
            /* Already logged in state */
            <View style={styles.loggedInContainer}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={32} color="#D4AF37" />
              </View>
              <ThemedText style={styles.welcomeName}>Welcome, {userName}!</ThemedText>
              <View style={styles.tierPill}>
                <Ionicons name="ribbon" size={13} color="#F4CA64" />
                <ThemedText style={styles.tierText}>Gold VIP Status Active</ThemedText>
              </View>

              <View style={styles.perksList}>
                <View style={styles.perkRow}>
                  <Ionicons name="checkmark-circle" size={14} color="#50C878" />
                  <ThemedText style={styles.perkText}>15% Extra Off on all Services</ThemedText>
                </View>
                <View style={styles.perkRow}>
                  <Ionicons name="checkmark-circle" size={14} color="#50C878" />
                  <ThemedText style={styles.perkText}>Priority Salon Appointment Booking</ThemedText>
                </View>
                <View style={styles.perkRow}>
                  <Ionicons name="checkmark-circle" size={14} color="#50C878" />
                  <ThemedText style={styles.perkText}>Free Cosmetic Consultation at Lounge</ThemedText>
                </View>
              </View>

              <View style={styles.loggedActions}>
                <Pressable
                  onPress={onClose}
                  style={({ pressed }) => [styles.continueButton, pressed && styles.pressed]}>
                  <ThemedText style={styles.continueButtonText}>Continue Pampering</ThemedText>
                </Pressable>

                <Pressable
                  onPress={onLogout}
                  style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
                  <Ionicons name="log-out-outline" size={15} color="#FF6B6B" />
                  <ThemedText style={styles.logoutButtonText}>Sign Out</ThemedText>
                </Pressable>
              </View>
            </View>
          ) : (
            /* Login forms */
            <View style={styles.loginContainer}>
              <ThemedText style={styles.loginTitle}>
                Instant Expo Login
              </ThemedText>
              <ThemedText style={styles.loginSubtitle}>
                Unlock exclusive beauty member discounts, routine reminders, and quick bookings.
              </ThemedText>

              {authMethod === 'options' && (
                <View style={styles.buttonsGroup}>
                  {/* Expo 1-Click Login */}
                  <Pressable
                    onPress={handleExpoQuickLogin}
                    disabled={isSubmitting}
                    style={({ pressed }) => [styles.expoAuthBtn, pressed && styles.pressed]}>
                    {isSubmitting ? (
                      <ActivityIndicator color="#0A0A0E" size="small" />
                    ) : (
                      <>
                        <Ionicons name="flash" size={17} color="#0A0A0E" />
                        <ThemedText style={styles.expoAuthBtnText}>
                          Instant Expo Fast Login
                        </ThemedText>
                      </>
                    )}
                  </Pressable>

                  {/* Phone OTP Option */}
                  <Pressable
                    onPress={() => setAuthMethod('phone')}
                    style={({ pressed }) => [styles.methodBtn, pressed && styles.pressed]}>
                    <Ionicons name="call-outline" size={16} color="#E6A4B4" />
                    <ThemedText style={styles.methodBtnText}>
                      Sign in with Phone & OTP
                    </ThemedText>
                  </Pressable>

                  {/* Google Login */}
                  <Pressable
                    onPress={handleGoogleLogin}
                    style={({ pressed }) => [styles.methodBtn, pressed && styles.pressed]}>
                    <Ionicons name="logo-google" size={16} color="#EA4335" />
                    <ThemedText style={styles.methodBtnText}>
                      Continue with Google
                    </ThemedText>
                  </Pressable>

                  {/* Guest Continue */}
                  <Pressable
                    onPress={() => {
                      onLoginSuccess('Guest VIP');
                      onClose();
                    }}
                    style={({ pressed }) => [styles.guestBtn, pressed && styles.pressed]}>
                    <ThemedText style={styles.guestBtnText}>
                      Explore as Guest VIP
                    </ThemedText>
                  </Pressable>
                </View>
              )}

              {authMethod === 'phone' && (
                <View style={styles.phoneForm}>
                  {!otpSent ? (
                    <>
                      <ThemedText style={styles.inputLabel}>Mobile Phone Number</ThemedText>
                      <TextInput
                        placeholder="+91 98765 00000"
                        placeholderTextColor="#66667A"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        style={styles.textInput}
                      />
                      <Pressable
                        onPress={handlePhoneSubmit}
                        disabled={isSubmitting || phoneNumber.length < 10}
                        style={({ pressed }) => [
                          styles.expoAuthBtn,
                          phoneNumber.length < 10 && styles.btnDisabled,
                          pressed && styles.pressed,
                        ]}>
                        {isSubmitting ? (
                          <ActivityIndicator color="#0A0A0E" size="small" />
                        ) : (
                          <ThemedText style={styles.expoAuthBtnText}>Send OTP</ThemedText>
                        )}
                      </Pressable>
                    </>
                  ) : (
                    <>
                      <ThemedText style={styles.inputLabel}>Enter 4-Digit OTP</ThemedText>
                      <TextInput
                        placeholder="••••"
                        placeholderTextColor="#66667A"
                        keyboardType="number-pad"
                        maxLength={4}
                        value={otpCode}
                        onChangeText={setOtpCode}
                        style={[styles.textInput, styles.otpInput]}
                      />
                      <Pressable
                        onPress={handlePhoneSubmit}
                        disabled={isSubmitting}
                        style={({ pressed }) => [styles.expoAuthBtn, pressed && styles.pressed]}>
                        {isSubmitting ? (
                          <ActivityIndicator color="#0A0A0E" size="small" />
                        ) : (
                          <ThemedText style={styles.expoAuthBtnText}>Verify & Login</ThemedText>
                        )}
                      </Pressable>
                    </>
                  )}

                  <Pressable
                    onPress={() => setAuthMethod('options')}
                    style={styles.backOptionBtn}>
                    <Ionicons name="arrow-back" size={14} color="#9E9EB0" />
                    <ThemedText style={styles.backOptionText}>Back to options</ThemedText>
                  </Pressable>
                </View>
              )}
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#13131C',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#26263A',
    width: '100%',
    maxWidth: 420,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#202030',
    marginBottom: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E6A4B4',
  },
  brandTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  brandTag: {
    fontSize: 11,
    color: '#D4AF37',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1E1E2C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {},
  loginTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  loginSubtitle: {
    fontSize: 12.5,
    color: '#8E8EA2',
    lineHeight: 18,
    marginBottom: 18,
  },
  buttonsGroup: {
    gap: 10,
  },
  expoAuthBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#E6A4B4',
    paddingVertical: 13,
    borderRadius: 14,
  },
  expoAuthBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A0A0E',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  methodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1B1B26',
    borderWidth: 1,
    borderColor: '#29293C',
    paddingVertical: 12,
    borderRadius: 14,
  },
  methodBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E0E0F0',
  },
  guestBtn: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 4,
  },
  guestBtnText: {
    fontSize: 12,
    color: '#A0A0B5',
    textDecorationLine: 'underline',
  },
  phoneForm: {
    gap: 12,
  },
  inputLabel: {
    fontSize: 12,
    color: '#C0C0D4',
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#1A1A26',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D42',
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: '#FFFFFF',
    fontSize: 14,
  },
  otpInput: {
    textAlign: 'center',
    letterSpacing: 8,
    fontSize: 20,
    fontWeight: '700',
  },
  backOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  backOptionText: {
    fontSize: 12,
    color: '#9E9EB0',
  },
  loggedInContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#201A24',
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  welcomeName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  tierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  tierText: {
    fontSize: 11.5,
    color: '#F4CA64',
    fontWeight: '700',
  },
  perksList: {
    alignSelf: 'stretch',
    backgroundColor: '#181824',
    borderRadius: 14,
    padding: 12,
    gap: 8,
    marginBottom: 18,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perkText: {
    fontSize: 12,
    color: '#D0D0E2',
  },
  loggedActions: {
    alignSelf: 'stretch',
    gap: 8,
  },
  continueButton: {
    backgroundColor: '#E6A4B4',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A0A0E',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  logoutButtonText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
