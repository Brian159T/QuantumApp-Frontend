import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import LoginButton from '../../components/LoginButton'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CARD_WIDTH = SCREEN_WIDTH * 0.72
const CARD_GAP = 12
const CARD_SIDE_PADDING = 20

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

// ── DATOS DEL VEHÍCULO (mock) ──
const VEHICLE = {
  name: 'Voltus Neo',
  plate: 'BLP-1204',
  batteryPct: 68,
  rangeKm: 286,
  isCharging: false,
  minutesToFull: 42,
  lastChargedAt: 'Hoy, 07:40 AM',
  health: 96,
}

const NEARBY_STATIONS = [
  {
    id: '1',
    name: 'Voltus Hub San Miguel',
    distanceKm: 1.2,
    available: 4,
    total: 6,
    speed: 'Ultra rápida',
    pricePerKwh: '$0.32',
  },
  {
    id: '2',
    name: 'GreenPlug Zona Sur',
    distanceKm: 3.4,
    available: 2,
    total: 8,
    speed: 'Rápida',
    pricePerKwh: '$0.35',
  },
  {
    id: '3',
    name: 'Voltus Station Sopocachi',
    distanceKm: 4.1,
    available: 0,
    total: 2,
    speed: 'Estándar',
    pricePerKwh: '$0.30',
  },
  {
    id: '4',
    name: 'EcoCarga Obrajes',
    distanceKm: 5.0,
    available: 1,
    total: 4,
    speed: 'Rápida',
    pricePerKwh: '$0.28',
  },
]

const HISTORY = [
  { id: '1', date: 'Ayer, 19:20', station: 'Voltus Hub San Miguel', kwh: 32, cost: '$10.24' },
  { id: '2', date: 'Lun, 08:05', station: 'GreenPlug Zona Sur', kwh: 41, cost: '$14.35' },
  { id: '3', date: 'Sáb, 17:50', station: 'Voltus Station Sopocachi', kwh: 18, cost: '$5.40' },
]

const speedColor = (speed: string) => {
  if (speed === 'Ultra rápida') return GREEN
  if (speed === 'Rápida') return BLUE
  return ORANGE
}

const batteryColor = (pct: number) => {
  if (pct >= 50) return GREEN
  if (pct >= 20) return ORANGE
  return RED
}

const InicioScreen_usuario_vehiculo = () => {
  const flatListRef = useRef<FlatList>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const onScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x
    const index = Math.round(offsetX / (CARD_WIDTH + CARD_GAP))
    setActiveIndex(index)
  }

  const renderStationCard = ({ item }: { item: typeof NEARBY_STATIONS[0] }) => {
    const isFull = item.available === 0
    return (
      <View style={styles.stationCard}>
        <View style={styles.stationCardTop}>
          <View style={styles.stationIconBox}>
            <MaterialCommunityIcons name="ev-station" size={20} color={GREEN} />
          </View>
          <View style={styles.stationDistanceBox}>
            <Text style={styles.stationDistanceValue}>{item.distanceKm.toFixed(1)}</Text>
            <Text style={styles.stationDistanceUnit}>{'km'}</Text>
          </View>
        </View>

        <Text style={styles.stationName} numberOfLines={1}>{item.name}</Text>

        <View style={styles.stationInfoRow}>
          <View style={[styles.availabilityPill, isFull ? styles.availabilityPillRed : styles.availabilityPillGreen]}>
            <View style={[styles.dotStatus, { backgroundColor: isFull ? RED : GREEN }]} />
            <Text style={[styles.availabilityText, { color: isFull ? RED : GREEN }]}>
              {isFull ? 'Ocupado' : `${item.available}/${item.total} libres`}
            </Text>
          </View>
        </View>

        <View style={styles.stationFooter}>
          <View style={styles.speedRow}>
            <MaterialCommunityIcons name="flash" size={12} color={speedColor(item.speed)} />
            <Text style={[styles.speedText, { color: speedColor(item.speed) }]}>{item.speed}</Text>
          </View>
          <Text style={styles.stationPrice}>{item.pricePerKwh}{'/kWh'}</Text>
        </View>

        <TouchableOpacity style={styles.routeBtn} activeOpacity={0.85}>
          <MaterialCommunityIcons name="map-marker-path" size={13} color={WHITE} />
          <Text style={styles.routeBtnText}>{'Ver ruta'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* ── HEADER FIJO ── */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerSub}>{'HOLA DE NUEVO'}</Text>
          <Text style={styles.headerTitle}>{'Tu Voltus'}</Text>
        </View>
        <LoginButton onPress={() => {}} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── TARJETA DE VEHÍCULO / BATERÍA ── */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleTopRow}>
            <View>
              <Text style={styles.vehicleName}>{VEHICLE.name}</Text>
              <Text style={styles.vehiclePlate}>{VEHICLE.plate}</Text>
            </View>
            <View style={styles.vehicleStatusPill}>
              <MaterialCommunityIcons
                name={VEHICLE.isCharging ? 'flash' : 'check-circle-outline'}
                size={12}
                color={VEHICLE.isCharging ? ORANGE : GREEN}
              />
              <Text style={[styles.vehicleStatusText, { color: VEHICLE.isCharging ? ORANGE : GREEN }]}>
                {VEHICLE.isCharging ? 'Cargando' : 'Listo'}
              </Text>
            </View>
          </View>

          <View style={styles.batteryRow}>
            <View style={styles.batteryRingBox}>
              <View style={styles.batteryRingOuter}>
                <Text style={styles.batteryPct}>{`${VEHICLE.batteryPct}%`}</Text>
                <Text style={styles.batteryPctLabel}>{'batería'}</Text>
              </View>
            </View>

            <View style={styles.batteryDetails}>
              <View style={styles.batteryBarTrack}>
                <View
                  style={[
                    styles.batteryBarFill,
                    { width: `${VEHICLE.batteryPct}%`, backgroundColor: batteryColor(VEHICLE.batteryPct) },
                  ]}
                />
              </View>

              <View style={styles.batteryStatsRow}>
                <View style={styles.batteryStatItem}>
                  <MaterialCommunityIcons name="road-variant" size={13} color={WHITE} />
                  <Text style={styles.batteryStatText}>{`${VEHICLE.rangeKm} km`}</Text>
                </View>
                <View style={styles.batteryStatItem}>
                  <MaterialCommunityIcons name="heart-pulse" size={13} color={WHITE} />
                  <Text style={styles.batteryStatText}>{`Salud ${VEHICLE.health}%`}</Text>
                </View>
              </View>

              <Text style={styles.lastCharged}>{`Última carga: ${VEHICLE.lastChargedAt}`}</Text>
            </View>
          </View>
        </View>

        {/* ── ACCIONES RÁPIDAS ── */}
        <View style={styles.quickActionsRow}>
          {[
            { icon: 'map-search-outline', label: 'Buscar\nestación', color: GREEN },
            { icon: 'flash-outline', label: 'Iniciar\ncarga', color: BLUE },
            { icon: 'routes', label: 'Planificar\nviaje', color: ORANGE },
            { icon: 'history', label: 'Historial', color: '#a78bfa' },
          ].map((a, i) => (
            <TouchableOpacity key={i} style={styles.quickActionItem} activeOpacity={0.85}>
              <View style={[styles.quickActionIconBox, { backgroundColor: `${a.color}18` }]}>
                <MaterialCommunityIcons name={a.icon as any} size={20} color={a.color} />
              </View>
              <Text style={styles.quickActionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── ESTACIONES CERCANAS ── */}
        <View style={styles.carouselSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{'Estaciones cercanas'}</Text>
            <TouchableOpacity style={styles.sectionLinkRow}>
              <Text style={styles.sectionLink}>{'Ver todas'}</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color={GREEN} />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={NEARBY_STATIONS}
            keyExtractor={item => item.id}
            renderItem={renderStationCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + CARD_GAP}
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={styles.carouselList}
            onMomentumScrollEnd={onScrollEnd}
            getItemLayout={(_, index) => ({
              length: CARD_WIDTH + CARD_GAP,
              offset: (CARD_WIDTH + CARD_GAP) * index,
              index,
            })}
          />

          <View style={styles.dots}>
            {NEARBY_STATIONS.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* ── BANNER: PLANIFICAR VIAJE ── */}
        <View style={styles.tripBanner}>
          <View style={styles.tripBannerLeft}>
            <Text style={styles.tripBannerEyebrow}>{'Ruta inteligente'}</Text>
            <Text style={styles.tripBannerTitle}>{'Planifica tu\npróximo viaje'}</Text>
            <Text style={styles.tripBannerSub}>{'Calculamos paradas de carga en el camino'}</Text>
            <TouchableOpacity style={styles.tripBannerBtn}>
              <MaterialCommunityIcons name="map-marker-distance" size={13} color={WHITE} />
              <Text style={styles.tripBannerBtnText}>{' Crear ruta'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tripBannerIconBox}>
            <MaterialCommunityIcons name="car-electric" size={42} color={GREEN} />
          </View>
        </View>

        {/* ── HISTORIAL DE CARGAS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'Historial de cargas'}</Text>

          <View style={{ marginTop: 14, gap: 10 }}>
            {HISTORY.map(h => (
              <View key={h.id} style={styles.historyRow}>
                <View style={styles.historyIconBox}>
                  <MaterialCommunityIcons name="lightning-bolt" size={16} color={GREEN} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.historyStation} numberOfLines={1}>{h.station}</Text>
                  <Text style={styles.historyDate}>{h.date}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.historyKwh}>{`${h.kwh} kWh`}</Text>
                  <Text style={styles.historyCost}>{h.cost}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default InicioScreen_usuario_vehiculo

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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 2,
  },

  // VEHICLE CARD
  vehicleCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 24,
    backgroundColor: BG,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  vehicleTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vehicleName: {
    color: WHITE,
    fontSize: 17,
    fontWeight: 'bold',
  },
  vehiclePlate: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    marginTop: 2,
    letterSpacing: 1,
  },
  vehicleStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  vehicleStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  batteryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 16,
  },
  batteryRingBox: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: `${GREEN}55`,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(47,182,118,0.08)',
  },
  batteryRingOuter: {
    alignItems: 'center',
  },
  batteryPct: {
    color: WHITE,
    fontSize: 17,
    fontWeight: 'bold',
  },
  batteryPctLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 8,
  },
  batteryDetails: {
    flex: 1,
  },
  batteryBarTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  batteryBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  batteryStatsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  batteryStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  batteryStatText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '600',
  },
  lastCharged: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    marginTop: 8,
  },

  // QUICK ACTIONS
  quickActionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 18,
    gap: 10,
  },
  quickActionItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  quickActionIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    color: TEXT_MID,
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 12,
  },

  // CAROUSEL / SECTION HEADERS
  carouselSection: {
    marginTop: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: CARD_SIDE_PADDING,
  },
  sectionTitle: {
    color: TEXT_DARK,
    fontSize: 17,
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
  carouselList: {
    paddingLeft: CARD_SIDE_PADDING,
    paddingRight: CARD_SIDE_PADDING - CARD_GAP,
    gap: CARD_GAP,
  },

  // STATION CARD (carrusel)
  stationCard: {
    width: CARD_WIDTH,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: SUBTLE,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  stationCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stationIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${GREEN}14`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationDistanceBox: {
    alignItems: 'flex-end',
  },
  stationDistanceValue: {
    color: TEXT_DARK,
    fontSize: 13,
    fontWeight: 'bold',
  },
  stationDistanceUnit: {
    color: TEXT_MID,
    fontSize: 9,
  },
  stationName: {
    color: TEXT_DARK,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
  },
  stationInfoRow: {
    marginTop: 8,
  },
  availabilityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderWidth: 1,
  },
  availabilityPillGreen: {
    backgroundColor: `${GREEN}14`,
    borderColor: `${GREEN}44`,
  },
  availabilityPillRed: {
    backgroundColor: `${RED}14`,
    borderColor: `${RED}44`,
  },
  dotStatus: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  availabilityText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  stationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  speedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  speedText: {
    fontSize: 10,
    fontWeight: '600',
  },
  stationPrice: {
    color: TEXT_MID,
    fontSize: 10,
    fontWeight: '500',
  },
  routeBtn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BG,
    borderRadius: 10,
    paddingVertical: 9,
    gap: 5,
  },
  routeBtnText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: 'bold',
  },

  // DOTS
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#c8d0e0',
  },
  dotActive: {
    width: 16,
    backgroundColor: GREEN,
  },

  // TRIP BANNER
  tripBanner: {
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
  tripBannerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  tripBannerEyebrow: {
    color: GREEN,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  tripBannerTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  tripBannerSub: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    marginTop: 4,
  },
  tripBannerBtn: {
    marginTop: 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  tripBannerBtnText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '700',
  },
  tripBannerIconBox: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: `${GREEN}20`,
    borderWidth: 1,
    borderColor: `${GREEN}44`,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // SECTIONS / HISTORY
  section: {
    marginTop: 28,
    paddingHorizontal: 16,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: SUBTLE,
    padding: 12,
    gap: 10,
  },
  historyIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${GREEN}14`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyStation: {
    color: TEXT_DARK,
    fontSize: 12,
    fontWeight: '700',
  },
  historyDate: {
    color: TEXT_MID,
    fontSize: 10,
    marginTop: 2,
  },
  historyKwh: {
    color: TEXT_DARK,
    fontSize: 12,
    fontWeight: 'bold',
  },
  historyCost: {
    color: TEXT_MID,
    fontSize: 10,
    marginTop: 2,
  },
})