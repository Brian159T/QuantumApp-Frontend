import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import LoginButton from '../../components/LoginButton'

const GREEN = '#2fb676'
const BLUE = '#4D9FFF'
const ORANGE = '#f39c12'
const PURPLE = '#a78bfa'
const RED = '#e74c3c'
const BG = '#0A0F1E'
const WHITE = '#ffffff'
const OFF_WHITE = '#f4f7ff'
const SUBTLE = '#e8edf8'
const TEXT_DARK = '#0d1b3e'
const TEXT_MID = '#4a5578'

// ── RESUMEN GENERAL (mock) ──
const OVERVIEW = {
  vehicleModels: 12,
  vehiclePhotos: 84,
  activePromotions: 5,
  workshops: 9,
  chargingStations: 14,
  pendingReview: 3,
}

// ── SECCIONES DE GESTIÓN ──
const MANAGEMENT_SECTIONS = [
  {
    id: 'photos',
    title: 'Fotos de Vehículos',
    subtitle: `${OVERVIEW.vehicleModels} modelos · ${OVERVIEW.vehiclePhotos} fotos`,
    icon: 'image-multiple-outline',
    color: BLUE,
  },
  {
    id: 'promotions',
    title: 'Promociones',
    subtitle: `${OVERVIEW.activePromotions} activas ahora`,
    icon: 'tag-outline',
    color: ORANGE,
  },
  {
    id: 'workshops',
    title: 'Talleres Autorizados',
    subtitle: `${OVERVIEW.workshops} ubicaciones registradas`,
    icon: 'wrench-outline',
    color: PURPLE,
  },
  {
    id: 'stations',
    title: 'Estaciones de Carga',
    subtitle: `${OVERVIEW.chargingStations} ubicaciones registradas`,
    icon: 'ev-station',
    color: GREEN,
  },
]

// ── ACTIVIDAD RECIENTE (mock) ──
const RECENT_ACTIVITY = [
  {
    id: '1',
    action: 'Nueva foto agregada',
    detail: 'Voltus Apex — vista lateral',
    time: 'Hace 12 min',
    icon: 'image-plus',
    color: BLUE,
  },
  {
    id: '2',
    action: 'Promoción actualizada',
    detail: '20% OFF Neo 2024',
    time: 'Hace 1 h',
    icon: 'tag-edit-outline',
    color: ORANGE,
  },
  {
    id: '3',
    action: 'Nueva estación registrada',
    detail: 'GreenPlug Zona Sur',
    time: 'Ayer, 18:40',
    icon: 'ev-station',
    color: GREEN,
  },
  {
    id: '4',
    action: 'Taller pendiente de revisión',
    detail: 'Taller Miraflores EV',
    time: 'Ayer, 10:15',
    icon: 'alert-circle-outline',
    color: RED,
  },
]

const Interfaz_Administrador_Inicio = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* ── HEADER FIJO ── */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerSub}>{'PANEL DE CONTROL'}</Text>
          <Text style={styles.headerTitle}>{'Administrador'}</Text>
        </View>
        <LoginButton onPress={() => {}} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── ALERTA DE PENDIENTES ── */}
        {OVERVIEW.pendingReview > 0 && (
          <View style={styles.alertBanner}>
            <View style={styles.alertIconBox}>
              <MaterialCommunityIcons name="alert-circle-outline" size={20} color={ORANGE} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>
                {`${OVERVIEW.pendingReview} elementos pendientes de revisión`}
              </Text>
              <Text style={styles.alertSub}>{'Talleres y estaciones enviados por usuarios'}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={ORANGE} />
          </View>
        )}

        {/* ── STATS GENERALES ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: `${BLUE}18` }]}>
              <MaterialCommunityIcons name="car-multiple" size={18} color={BLUE} />
            </View>
            <Text style={styles.statValue}>{OVERVIEW.vehicleModels}</Text>
            <Text style={styles.statLabel}>{'Modelos'}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: `${GREEN}18` }]}>
              <MaterialCommunityIcons name="ev-station" size={18} color={GREEN} />
            </View>
            <Text style={styles.statValue}>{OVERVIEW.chargingStations}</Text>
            <Text style={styles.statLabel}>{'Estaciones'}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: `${PURPLE}18` }]}>
              <MaterialCommunityIcons name="wrench-outline" size={18} color={PURPLE} />
            </View>
            <Text style={styles.statValue}>{OVERVIEW.workshops}</Text>
            <Text style={styles.statLabel}>{'Talleres'}</Text>
          </View>
        </View>

        {/* ── SECCIONES DE GESTIÓN ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'Gestión de contenido'}</Text>

          <View style={styles.managementGrid}>
            {MANAGEMENT_SECTIONS.map(s => (
              <TouchableOpacity key={s.id} style={styles.managementCard} activeOpacity={0.85}>
                <View style={[styles.managementIconBox, { backgroundColor: `${s.color}18` }]}>
                  <MaterialCommunityIcons name={s.icon as any} size={24} color={s.color} />
                </View>
                <Text style={styles.managementTitle}>{s.title}</Text>
                <Text style={styles.managementSubtitle}>{s.subtitle}</Text>

                <View style={styles.managementFooter}>
                  <Text style={[styles.managementLink, { color: s.color }]}>{'Gestionar'}</Text>
                  <MaterialCommunityIcons name="arrow-right" size={13} color={s.color} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── ACCIONES RÁPIDAS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'Acciones rápidas'}</Text>

          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionBtn} activeOpacity={0.85}>
              <MaterialCommunityIcons name="image-plus" size={16} color={WHITE} />
              <Text style={styles.quickActionBtnText}>{'Subir foto'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickActionBtn, styles.quickActionBtnOutline]} activeOpacity={0.85}>
              <MaterialCommunityIcons name="tag-plus-outline" size={16} color={TEXT_DARK} />
              <Text style={[styles.quickActionBtnText, { color: TEXT_DARK }]}>{'Nueva promo'}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.quickActionsRow, { marginTop: 10 }]}>
            <TouchableOpacity style={[styles.quickActionBtn, styles.quickActionBtnOutline]} activeOpacity={0.85}>
              <MaterialCommunityIcons name="map-marker-plus-outline" size={16} color={TEXT_DARK} />
              <Text style={[styles.quickActionBtnText, { color: TEXT_DARK }]}>{'Agregar taller'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickActionBtn, styles.quickActionBtnOutline]} activeOpacity={0.85}>
              <MaterialCommunityIcons name="map-marker-plus-outline" size={16} color={TEXT_DARK} />
              <Text style={[styles.quickActionBtnText, { color: TEXT_DARK }]}>{'Agregar estación'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── ACTIVIDAD RECIENTE ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{'Actividad reciente'}</Text>
            <TouchableOpacity style={styles.sectionLinkRow}>
              <Text style={styles.sectionLink}>{'Ver todo'}</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color={GREEN} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 12, gap: 10 }}>
            {RECENT_ACTIVITY.map(a => (
              <View key={a.id} style={styles.activityRow}>
                <View style={[styles.activityIconBox, { backgroundColor: `${a.color}18` }]}>
                  <MaterialCommunityIcons name={a.icon as any} size={18} color={a.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityAction}>{a.action}</Text>
                  <Text style={styles.activityDetail} numberOfLines={1}>{a.detail}</Text>
                </View>
                <Text style={styles.activityTime}>{a.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Interfaz_Administrador_Inicio

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

  // ALERT BANNER
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${ORANGE}33`,
    padding: 13,
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  alertIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${ORANGE}14`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: {
    color: TEXT_DARK,
    fontSize: 12,
    fontWeight: 'bold',
  },
  alertSub: {
    color: TEXT_MID,
    fontSize: 10,
    marginTop: 2,
  },

  // STATS
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    color: TEXT_DARK,
    fontSize: 14,
    fontWeight: 'bold',
  },
  statLabel: {
    color: TEXT_MID,
    fontSize: 9,
    textAlign: 'center',
    fontWeight: '500',
  },

  // SECTIONS
  section: {
    marginTop: 26,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: TEXT_DARK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLink: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '600',
  },

  // MANAGEMENT GRID
  managementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 14,
  },
  managementCard: {
    width: '47%',
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: SUBTLE,
    padding: 14,
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  managementIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  managementTitle: {
    color: TEXT_DARK,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 12,
  },
  managementSubtitle: {
    color: TEXT_MID,
    fontSize: 10,
    marginTop: 4,
  },
  managementFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: SUBTLE,
  },
  managementLink: {
    fontSize: 11,
    fontWeight: 'bold',
  },

  // QUICK ACTIONS
  quickActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: BG,
    borderRadius: 12,
    paddingVertical: 12,
  },
  quickActionBtnOutline: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: SUBTLE,
  },
  quickActionBtnText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: 'bold',
  },

  // ACTIVITY
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: SUBTLE,
    padding: 12,
    gap: 12,
  },
  activityIconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityAction: {
    color: TEXT_DARK,
    fontSize: 12,
    fontWeight: 'bold',
  },
  activityDetail: {
    color: TEXT_MID,
    fontSize: 10,
    marginTop: 2,
  },
  activityTime: {
    color: TEXT_MID,
    fontSize: 9,
    fontWeight: '500',
  },
})