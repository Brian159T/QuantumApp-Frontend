import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Linking,
} from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import LoginButton from '../../components/LoginButton'

const GREEN = '#2fb676'
const BLUE = '#4D9FFF'
const ORANGE = '#f39c12'
const RED = '#e74c3c'
const BG = '#0A0F1E'
const WHITE = '#ffffff'
const OFF_WHITE = '#f4f7ff'
const SUBTLE = '#e8edf8'
const TEXT_DARK = '#0d1b3e'
const TEXT_MID = '#4a5578'

// ── SERVICIO DE SALUD CONFIGURADO (mock) ──
type HealthService = {
  configured: boolean
  provider: string
  plan: string
  phone: string
  policyNumber: string
}

const DEFAULT_HEALTH_SERVICE: HealthService = {
  configured: true,
  provider: 'Seguros Illimani Salud',
  plan: 'Plan Premium Familiar',
  phone: '+591 800-10-2233',
  policyNumber: 'POL-88421',
}

const EMERGENCY_CONTACTS = [
  { id: '1', label: 'Grúa Voltus 24/7', number: '+591 700-11223', icon: 'tow-truck', color: ORANGE },
  { id: '2', label: 'Policía Boliviana', number: '110', icon: 'shield-alert-outline', color: BLUE },
  { id: '3', label: 'Bomberos', number: '119', icon: 'fire-truck', color: RED },
  { id: '4', label: 'Ambulancia', number: '118', icon: 'ambulance', color: GREEN },
]

const EmergenciasScreen_usuario_vehiculo = () => {
  const [healthService, setHealthService] = useState<HealthService>(DEFAULT_HEALTH_SERVICE)
  const [isConfiguring, setIsConfiguring] = useState(false)

  const callNumber = (number: string) => {
    const cleaned = number.replace(/[^+\d]/g, '')
    Linking.openURL(`tel:${cleaned}`)
  }

  const handleConfigure = () => {
    // Aquí se abriría un formulario o modal para editar el servicio de salud
    setIsConfiguring(true)
  }

  const handleCallHealthService = () => {
    callNumber(healthService.phone)
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* ── HEADER FIJO ── */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerSub}>{'AYUDA INMEDIATA'}</Text>
          <Text style={styles.headerTitle}>{'Emergencias'}</Text>
        </View>
        <LoginButton onPress={() => {}} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── BOTÓN SOS PRINCIPAL ── */}
        <View style={styles.sosCard}>
          <View style={styles.sosIconRing}>
            <MaterialCommunityIcons name="alert-decagram" size={30} color={RED} />
          </View>
          <Text style={styles.sosTitle}>{'¿Tienes una emergencia?'}</Text>
          <Text style={styles.sosSub}>{'Comparte tu ubicación y pide ayuda al instante'}</Text>
          <TouchableOpacity style={styles.sosBtn} activeOpacity={0.85} onPress={() => callNumber('911')}>
            <MaterialCommunityIcons name="phone-alert-outline" size={16} color={WHITE} />
            <Text style={styles.sosBtnText}>{'Llamar a emergencias'}</Text>
          </TouchableOpacity>
        </View>

        {/* ── SERVICIO DE SALUD ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'Tu servicio de salud'}</Text>

          <View style={styles.healthCard}>
            {healthService.configured ? (
              <>
                <View style={styles.healthTopRow}>
                  <View style={styles.healthIconBox}>
                    <MaterialCommunityIcons name="hospital-box-outline" size={22} color={GREEN} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.healthProvider}>{healthService.provider}</Text>
                    <Text style={styles.healthPlan}>{healthService.plan}</Text>
                  </View>
                  <View style={styles.healthActivePill}>
                    <View style={styles.dotStatus} />
                    <Text style={styles.healthActiveText}>{'Activo'}</Text>
                  </View>
                </View>

                <View style={styles.healthDetailsRow}>
                  <View style={styles.healthDetailItem}>
                    <Text style={styles.healthDetailLabel}>{'N° de póliza'}</Text>
                    <Text style={styles.healthDetailValue}>{healthService.policyNumber}</Text>
                  </View>
                  <View style={styles.healthDetailDivider} />
                  <View style={styles.healthDetailItem}>
                    <Text style={styles.healthDetailLabel}>{'Teléfono'}</Text>
                    <Text style={styles.healthDetailValue}>{healthService.phone}</Text>
                  </View>
                </View>

                <View style={styles.healthBtnRow}>
                  <TouchableOpacity
                    style={styles.configureBtn}
                    activeOpacity={0.85}
                    onPress={handleConfigure}
                  >
                    <MaterialCommunityIcons name="cog-outline" size={14} color={TEXT_DARK} />
                    <Text style={styles.configureBtnText}>{'Configurar'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.callHealthBtn}
                    activeOpacity={0.85}
                    onPress={handleCallHealthService}
                  >
                    <MaterialCommunityIcons name="phone-outline" size={14} color={WHITE} />
                    <Text style={styles.callHealthBtnText}>{'Llamar ahora'}</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.healthEmptyState}>
                <MaterialCommunityIcons name="hospital-box-outline" size={30} color={SUBTLE} />
                <Text style={styles.healthEmptyTitle}>{'Aún no configuras tu servicio de salud'}</Text>
                <Text style={styles.healthEmptySub}>{'Agrega tu seguro o contacto médico para tenerlo a mano en caso de emergencia'}</Text>
                <TouchableOpacity style={styles.configureEmptyBtn} activeOpacity={0.85} onPress={handleConfigure}>
                  <MaterialCommunityIcons name="plus" size={14} color={WHITE} />
                  <Text style={styles.configureEmptyBtnText}>{'Configurar servicio'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {isConfiguring && (
            <View style={styles.configuringNotice}>
              <MaterialCommunityIcons name="information-outline" size={14} color={BLUE} />
              <Text style={styles.configuringNoticeText}>
                {'Aquí se abrirá el formulario para editar tu proveedor, plan y número de póliza.'}
              </Text>
            </View>
          )}
        </View>

        {/* ── CONTACTOS DE EMERGENCIA ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'Contactos de emergencia'}</Text>

          <View style={{ marginTop: 14, gap: 10 }}>
            {EMERGENCY_CONTACTS.map(c => (
              <View key={c.id} style={styles.contactRow}>
                <View style={[styles.contactIconBox, { backgroundColor: `${c.color}18` }]}>
                  <MaterialCommunityIcons name={c.icon as any} size={20} color={c.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactLabel}>{c.label}</Text>
                  <Text style={styles.contactNumber}>{c.number}</Text>
                </View>
                <TouchableOpacity
                  style={styles.contactCallBtn}
                  activeOpacity={0.85}
                  onPress={() => callNumber(c.number)}
                >
                  <MaterialCommunityIcons name="phone" size={16} color={WHITE} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* ── BANNER: COMPARTIR UBICACIÓN ── */}
        <View style={styles.locationBanner}>
          <View style={styles.locationBannerLeft}>
            <Text style={styles.locationBannerEyebrow}>{'Seguridad extra'}</Text>
            <Text style={styles.locationBannerTitle}>{'Comparte tu\nubicación en vivo'}</Text>
            <Text style={styles.locationBannerSub}>{'Un contacto de confianza podrá ver dónde estás'}</Text>
            <TouchableOpacity style={styles.locationBannerBtn}>
              <MaterialCommunityIcons name="map-marker-radius-outline" size={13} color={WHITE} />
              <Text style={styles.locationBannerBtnText}>{' Compartir ahora'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.locationBannerIconBox}>
            <MaterialCommunityIcons name="crosshairs-gps" size={40} color={GREEN} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default EmergenciasScreen_usuario_vehiculo

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
    backgroundColor: OFF_WHITE,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: BG,
  },
  headerSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },

  // SOS CARD
  sosCard: {
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 22,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: `${RED}33`,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  sosIconRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${RED}14`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sosTitle: {
    color: TEXT_DARK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  sosSub: {
    color: TEXT_MID,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  sosBtn: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RED,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  sosBtnText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: 'bold',
  },

  // SECTIONS
  section: {
    marginTop: 26,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: TEXT_DARK,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // HEALTH CARD
  healthCard: {
    marginTop: 14,
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: SUBTLE,
    padding: 16,
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  healthTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  healthIconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: `${GREEN}14`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthProvider: {
    color: TEXT_DARK,
    fontSize: 14,
    fontWeight: 'bold',
  },
  healthPlan: {
    color: TEXT_MID,
    fontSize: 11,
    marginTop: 2,
  },
  healthActivePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: `${GREEN}14`,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: `${GREEN}44`,
  },
  dotStatus: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GREEN,
  },
  healthActiveText: {
    color: GREEN,
    fontSize: 9,
    fontWeight: 'bold',
  },

  healthDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: OFF_WHITE,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 14,
  },
  healthDetailItem: {
    flex: 1,
  },
  healthDetailLabel: {
    color: TEXT_MID,
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  healthDetailValue: {
    color: TEXT_DARK,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 3,
  },
  healthDetailDivider: {
    width: 1,
    height: 28,
    backgroundColor: SUBTLE,
    marginHorizontal: 12,
  },

  healthBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  configureBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: OFF_WHITE,
    borderWidth: 1,
    borderColor: SUBTLE,
    borderRadius: 12,
    paddingVertical: 11,
  },
  configureBtnText: {
    color: TEXT_DARK,
    fontSize: 12,
    fontWeight: 'bold',
  },
  callHealthBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingVertical: 11,
  },
  callHealthBtnText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // HEALTH EMPTY STATE
  healthEmptyState: {
    alignItems: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  healthEmptyTitle: {
    color: TEXT_DARK,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 6,
  },
  healthEmptySub: {
    color: TEXT_MID,
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  configureEmptyBtn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  configureEmptyBtnText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },

  configuringNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: `${BLUE}10`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${BLUE}33`,
    padding: 12,
    marginTop: 10,
  },
  configuringNoticeText: {
    flex: 1,
    color: TEXT_MID,
    fontSize: 11,
    lineHeight: 15,
  },

  // CONTACTS
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: SUBTLE,
    padding: 12,
    gap: 12,
  },
  contactIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    color: TEXT_DARK,
    fontSize: 13,
    fontWeight: 'bold',
  },
  contactNumber: {
    color: TEXT_MID,
    fontSize: 11,
    marginTop: 2,
  },
  contactCallBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // LOCATION BANNER
  locationBanner: {
    marginHorizontal: 16,
    marginTop: 26,
    borderRadius: 20,
    backgroundColor: BG,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 5,
  },
  locationBannerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  locationBannerEyebrow: {
    color: GREEN,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  locationBannerTitle: {
    color: WHITE,
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 23,
  },
  locationBannerSub: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    marginTop: 4,
  },
  locationBannerBtn: {
    marginTop: 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  locationBannerBtnText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '700',
  },
  locationBannerIconBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: `${GREEN}20`,
    borderWidth: 1,
    borderColor: `${GREEN}44`,
    alignItems: 'center',
    justifyContent: 'center',
  },
})