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
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import LoginButton from '../../components/LoginButton'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CARD_WIDTH = SCREEN_WIDTH * 0.62
const CARD_GAP = 12
const CARD_SIDE_PADDING = 20

const GREEN = '#2fb676'
const BLUE = '#4D9FFF'
const BG = '#0A0F1E'
const CARD_BG = '#ffffff'
const CARD_BG_DARK = '#131929'
const HERO_BG = '#1A2744'
const WHITE = '#ffffff'
const OFF_WHITE = '#f4f7ff'
const SUBTLE = '#e8edf8'
const TEXT_DARK = '#0d1b3e'
const TEXT_MID = '#4a5578'

const PLACEHOLDER_HERO = 'https://placehold.co/700x320/0f3460/FFFFFF?text=+'

const CAR_MODELS = [
  {
    id: '1',
    name: 'Voltus Neo',
    type: 'Compact',
    price: '$34,900',
    range: '420 km',
    charge: '6 meses gratis',
    badge: '#1 Más vendido',
    badgeGreen: true,
    image: 'https://placehold.co/400x220/0f2a1e/2fb676?text=Neo',
  },
  {
    id: '2',
    name: 'Voltus Terra',
    type: 'SUV',
    price: '$47,500',
    range: '510 km',
    charge: 'AWD incluido',
    badge: '#2 Popular',
    badgeGreen: false,
    image: 'https://placehold.co/400x220/0f1f3d/4D9FFF?text=Terra',
  },
  {
    id: '3',
    name: 'Voltus Arc',
    type: 'Sedán',
    price: '$39,200',
    range: '480 km',
    charge: 'Sunroof incluido',
    badge: 'Nuevo 2024',
    badgeGreen: true,
    image: 'https://placehold.co/400x220/1a1a2e/2fb676?text=Arc',
  },
  {
    id: '4',
    name: 'Voltus Crest',
    type: 'Pickup',
    price: '$58,000',
    range: '390 km',
    charge: 'Carga rápida DC',
    badge: 'Edición limitada',
    badgeGreen: false,
    image: 'https://placehold.co/400x220/1a0f2e/9b59b6?text=Crest',
  },
  {
    id: '5',
    name: 'Voltus Zen',
    type: 'Hatchback',
    price: '$28,400',
    range: '360 km',
    charge: 'Seguro 1 año',
    badge: 'Más accesible',
    badgeGreen: true,
    image: 'https://placehold.co/400x220/0f2a2a/2fb676?text=Zen',
  },
  {
    id: '6',
    name: 'Voltus Apex',
    type: 'Coupé',
    price: '$64,900',
    range: '550 km',
    charge: '0-100 en 3.2s',
    badge: 'Performance',
    badgeGreen: false,
    image: 'https://placehold.co/400x220/2a0f0f/e74c3c?text=Apex',
  },
  {
    id: '7',
    name: 'Voltus Drift',
    type: 'Sport',
    price: '$72,000',
    range: '500 km',
    charge: 'Modo pista',
    badge: 'Top velocidad',
    badgeGreen: false,
    image: 'https://placehold.co/400x220/1a1000/f39c12?text=Drift',
  },
  {
    id: '8',
    name: 'Voltus Nova',
    type: 'Crossover',
    price: '$43,500',
    range: '465 km',
    charge: 'Techo solar',
    badge: 'Familia ideal',
    badgeGreen: true,
    image: 'https://placehold.co/400x220/0f1a2a/2fb676?text=Nova',
  },
  {
    id: '9',
    name: 'Voltus Orion',
    type: 'SUV Grande',
    price: '$55,800',
    range: '430 km',
    charge: '7 pasajeros',
    badge: 'Más espacioso',
    badgeGreen: true,
    image: 'https://placehold.co/400x220/0a1628/4D9FFF?text=Orion',
  },
  {
    id: '10',
    name: 'Voltus Lux',
    type: 'Luxury',
    price: '$89,000',
    range: '580 km',
    charge: 'Premium total',
    badge: 'Exclusivo',
    badgeGreen: false,
    image: 'https://placehold.co/400x220/1a1500/f1c40f?text=Lux',
  },
  {
    id: '11',
    name: 'Voltus Scout',
    type: 'Off-road',
    price: '$51,200',
    range: '410 km',
    charge: '4x4 eléctrico',
    badge: 'Aventura',
    badgeGreen: true,
    image: 'https://placehold.co/400x220/0f2010/2fb676?text=Scout',
  },
  {
    id: '12',
    name: 'Voltus Mini',
    type: 'City Car',
    price: '$22,900',
    range: '300 km',
    charge: 'Ideal ciudad',
    badge: 'Más económico',
    badgeGreen: true,
    image: 'https://placehold.co/400x220/101a0f/2fb676?text=Mini',
  },
]

const InicioScreen = () => {
  const flatListRef = useRef<FlatList>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % CAR_MODELS.length
        flatListRef.current?.scrollToIndex({ index: next, animated: true })
        return next
      })
    }, 3000)
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    }
  }, [])

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x
    const index = Math.round(offsetX / (CARD_WIDTH + CARD_GAP))
    setActiveIndex(index)
    if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    autoScrollRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % CAR_MODELS.length
        flatListRef.current?.scrollToIndex({ index: next, animated: true })
        return next
      })
    }, 3000)
  }

  const renderCarCard = ({ item }: { item: typeof CAR_MODELS[0] }) => (
    <View style={styles.carCard}>
      <Image source={{ uri: item.image }} style={styles.carImage} resizeMode="cover" />
      <View style={[styles.carCardBadge, item.badgeGreen ? styles.carCardBadgeGreen : styles.carCardBadgeBlue]}>
        <Text style={[styles.carCardBadgeText, { color: item.badgeGreen ? GREEN : BLUE }]}>
          {item.badge}
        </Text>
      </View>
      <View style={styles.carBody}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carType}>{item.type}</Text>

        <View style={styles.carStats}>
          <View style={styles.carStatItem}>
            <MaterialCommunityIcons name="lightning-bolt" size={13} color={GREEN} />
            <Text style={styles.carStatText}>{item.range}</Text>
          </View>
          <View style={styles.carStatDivider} />
          <View style={styles.carStatItem}>
            <MaterialCommunityIcons name="ev-plug-type2" size={13} color={BLUE} />
            <Text style={styles.carStatText}>{item.charge}</Text>
          </View>
        </View>

        <View style={styles.carFooter}>
          <Text style={styles.carPrice}>
            {item.price}
            <Text style={styles.carCurrency}>{' USD'}</Text>
          </Text>
          <TouchableOpacity style={styles.carCtaBtn}>
            <Text style={styles.carCtaBtnText}>{'Ver'}</Text>
            <MaterialCommunityIcons name="arrow-right" size={12} color={WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    // ✅ root es un View normal (no SafeAreaView) para poder poner el header fijo
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* ── HEADER FIJO — fuera del ScrollView ── */}
      <View style={styles.header}>
        <LoginButton onPress={() => {}} />
      </View>

      {/* ── SCROLL — todo el contenido aquí dentro ── */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── HERO BANNER ── */}
        <View style={styles.heroBanner}>
          <Image
            source={{ uri: PLACEHOLDER_HERO }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadge}>
              <MaterialCommunityIcons name="fire" size={12} color={GREEN} />
              <Text style={styles.heroBadgeText}>{' Oferta del mes'}</Text>
            </View>
            <View style={styles.heroBottom}>
              <Text style={styles.heroTitle}>
                {'Hasta 20% OFF\n'}
                <Text style={styles.heroTitleGreen}>{'Neo 2024'}</Text>
              </Text>
              <TouchableOpacity style={styles.heroCta}>
                <Text style={styles.heroCtaText}>{'Ver Modelos'}</Text>
                <MaterialCommunityIcons name="arrow-right" size={12} color={WHITE} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── STATS RÁPIDOS ── */}
        <View style={styles.statsRow}>
          {[
            { icon: 'lightning-bolt', value: '420km', label: 'Autonomía', color: GREEN },
            { icon: 'ev-station', value: '45min', label: 'Carga rápida', color: BLUE },
            { icon: 'shield-check', value: '5★', label: 'Seguridad', color: '#a78bfa' },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: `${s.color}18` }]}>
                <MaterialCommunityIcons name={s.icon as any} size={18} color={s.color} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── MODELOS EN CARRUSEL ── */}
        <View style={styles.carouselSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{'Modelos Destacados'}</Text>
            <TouchableOpacity style={styles.sectionLinkRow}>
              <Text style={styles.sectionLink}>{'Ver todos'}</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color={GREEN} />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={CAR_MODELS}
            keyExtractor={item => item.id}
            renderItem={renderCarCard}
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

          {/* Dots */}
          <View style={styles.dots}>
            {CAR_MODELS.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  flatListRef.current?.scrollToIndex({ index: i, animated: true })
                  setActiveIndex(i)
                }}
              >
                <View style={[styles.dot, i === activeIndex && styles.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── PLANES DE PAGO ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'Planes de Pago Flexibles'}</Text>

          <View style={[styles.row, { marginTop: 16 }]}>
            {/* Crédito */}
            <View style={[styles.planCard, styles.planCardBlue]}>
              <View style={[styles.planIcon, { backgroundColor: '#dbeafe' }]}>
                <MaterialCommunityIcons name="bank-outline" size={22} color={BLUE} />
              </View>
              <Text style={styles.planLabel}>{'Crédito Automotriz'}</Text>
              <Text style={styles.planPrice}>
                {'Desde\n'}
                <Text style={{ color: BLUE }}>{'$499'}</Text>
                <Text style={styles.planPriceSub}>{' USD/mes*'}</Text>
              </Text>
              <View style={styles.planFeatures}>
                <View style={styles.planFeatureRow}>
                  <MaterialCommunityIcons name="check-circle" size={12} color={BLUE} />
                  <Text style={styles.planFeatureText}>{'Plazos hasta 72 meses'}</Text>
                </View>
                <View style={styles.planFeatureRow}>
                  <MaterialCommunityIcons name="check-circle" size={12} color={BLUE} />
                  <Text style={styles.planFeatureText}>{'Tasa preferencial'}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.planBtn, { backgroundColor: BLUE }]}>
                <Text style={styles.planBtnText}>{'Cotizar Ahora'}</Text>
              </TouchableOpacity>
            </View>

            {/* Leasing */}
            <View style={[styles.planCard, styles.planCardGreen]}>
              <View style={[styles.planIcon, { backgroundColor: '#d1fae5' }]}>
                <MaterialCommunityIcons name="car-key" size={22} color={GREEN} />
              </View>
              <Text style={styles.planLabel}>{'Arrendamiento'}</Text>
              <Text style={styles.planPrice}>
                {'Desde\n'}
                <Text style={{ color: GREEN }}>{'$399'}</Text>
                <Text style={styles.planPriceSub}>{' USD/mes*'}</Text>
              </Text>
              <View style={styles.planFeatures}>
                <View style={styles.planFeatureRow}>
                  <MaterialCommunityIcons name="check-circle" size={12} color={GREEN} />
                  <Text style={styles.planFeatureText}>{'Actualiza cada 3 años'}</Text>
                </View>
                <View style={styles.planFeatureRow}>
                  <MaterialCommunityIcons name="check-circle" size={12} color={GREEN} />
                  <Text style={styles.planFeatureText}>{'Mantenimiento incluido'}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.planBtn, styles.planBtnOutlineGreen]}>
                <Text style={[styles.planBtnText, { color: GREEN }]}>{'Más Información'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── BANNER: TEST DRIVE ── */}
        <View style={styles.testDriveBanner}>
          <View style={styles.testDriveLeft}>
            <Text style={styles.testDriveEyebrow}>{'Experiencia real'}</Text>
            <Text style={styles.testDriveTitle}>{'Agenda tu\nTest Drive'}</Text>
            <Text style={styles.testDriveSub}>{'Gratis · Sin compromiso'}</Text>
            <TouchableOpacity style={styles.testDriveBtn}>
              <MaterialCommunityIcons name="calendar-check-outline" size={13} color={WHITE} />
              <Text style={styles.testDriveBtnText}>{' Reservar'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.testDriveIconBox}>
            <MaterialCommunityIcons name="car-electric" size={44} color={GREEN} />
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

export default InicioScreen

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

  // ✅ HEADER FIJO — no está dentro del ScrollView
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  // HERO
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: HERO_BG,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  heroImage: {
    width: '100%',
    height: 130,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    padding: 14,
    justifyContent: 'space-between',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${GREEN}33`,
    borderWidth: 1,
    borderColor: `${GREEN}66`,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  heroBadgeText: {
    color: GREEN,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroBottom: {
    alignSelf: 'flex-start',
  },
  heroTitle: {
    color: WHITE,
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  heroTitleGreen: {
    color: GREEN,
  },
  heroCta: {
    marginTop: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
    gap: 6,
  },
  heroCtaText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
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

  // CAROUSEL
  carouselSection: {
    marginTop: 24,
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
    fontSize: 18,
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

  // CAR CARD
  carCard: {
    width: CARD_WIDTH,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: SUBTLE,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  carImage: {
    width: '100%',
    height: 148,
  },
  carCardBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  carCardBadgeGreen: {
    backgroundColor: `${GREEN}26`,
    borderColor: `${GREEN}66`,
  },
  carCardBadgeBlue: {
    backgroundColor: `${BLUE}26`,
    borderColor: `${BLUE}66`,
  },
  carCardBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  carBody: {
    padding: 14,
  },
  carName: {
    color: TEXT_DARK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  carType: {
    color: TEXT_MID,
    fontSize: 11,
    marginBottom: 10,
    marginTop: 2,
  },
  carStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: OFF_WHITE,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 8,
  },
  carStatItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  carStatText: {
    color: TEXT_MID,
    fontSize: 10,
    flexShrink: 1,
  },
  carStatDivider: {
    width: 1,
    height: 16,
    backgroundColor: SUBTLE,
  },
  carFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carPrice: {
    color: TEXT_DARK,
    fontSize: 18,
    fontWeight: 'bold',
  },
  carCurrency: {
    color: TEXT_MID,
    fontSize: 11,
    fontWeight: 'normal',
  },
  carCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 4,
  },
  carCtaBtnText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // DOTS
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
    gap: 5,
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#c8d0e0',
    marginVertical: 2,
  },
  dotActive: {
    width: 16,
    backgroundColor: GREEN,
  },

  // SECTIONS
  section: {
    marginTop: 28,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },

  // PLAN CARDS
  planCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    backgroundColor: WHITE,
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  planCardBlue: {
    borderColor: '#bfdbfe',
  },
  planCardGreen: {
    borderColor: '#a7f3d0',
  },
  planIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  planLabel: {
    color: TEXT_MID,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  planPrice: {
    color: TEXT_DARK,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    marginBottom: 12,
  },
  planPriceSub: {
    color: TEXT_MID,
    fontSize: 11,
    fontWeight: 'normal',
  },
  planFeatures: {
    gap: 6,
    marginBottom: 16,
  },
  planFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  planFeatureText: {
    color: TEXT_MID,
    fontSize: 10,
  },
  planBtn: {
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  planBtnOutlineGreen: {
    backgroundColor: `${GREEN}15`,
    borderWidth: 1,
    borderColor: `${GREEN}55`,
  },
  planBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: WHITE,
  },

  // TEST DRIVE
  testDriveBanner: {
    marginHorizontal: 16,
    marginTop: 24,
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
  testDriveLeft: {
    flex: 1,
    paddingRight: 16,
  },
  testDriveEyebrow: {
    color: GREEN,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  testDriveTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  testDriveSub: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 12,
    marginTop: 4,
  },
  testDriveBtn: {
    marginTop: 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  testDriveBtnText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '700',
  },
  testDriveIconBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: `${GREEN}20`,
    borderWidth: 1,
    borderColor: `${GREEN}44`,
    alignItems: 'center',
    justifyContent: 'center',
  },
})