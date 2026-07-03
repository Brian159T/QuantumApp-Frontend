import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import LoginButton from '../../components/LoginButton'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SPEC_CARD_WIDTH = SCREEN_WIDTH - 40

const GREEN = '#2fb676'
const BLUE = '#4D9FFF'
const BG_DARK = '#0A0F1E'
const WHITE = '#ffffff'
const BG = '#f0f2f7'          // fondo gris claro
const CARD_WHITE = '#ffffff'
const HERO_BG = '#1A2744'
const TEXT_DARK = '#0d1b3e'
const TEXT_MID = '#4a5578'
const TEXT_SOFT = '#8a94b0'
const BORDER = '#e2e6f0'

type CarColor = { name: string; hex: string }
type CarModel = {
  id: string
  name: string
  subtitle: string
  price: string
  originalPrice?: string
  range: string
  acceleration: string
  topSpeed: string
  charge: string
  seats: number
  drive: string
  image: string
  colors: CarColor[]
  badge?: string
  discount?: string
}

const CAR_MODELS: CarModel[] = [
  {
    id: '1', name: 'Voltus Neo', subtitle: 'Compact', price: '$34,900', originalPrice: '$41,880',
    range: '420 km', acceleration: '5.8s', topSpeed: '225 km/h', charge: 'AC/DC', seats: 5, drive: 'RWD',
    badge: '#1 Más vendido', discount: '20% OFF',
    image: 'https://placehold.co/500x280/0f2a1e/2fb676?text=Neo',
    colors: [{ name: 'Deep Blue', hex: '#1a3a6e' }, { name: 'Matte Green', hex: '#2fb676' },
             { name: 'Arctic White', hex: '#e8edf2' }, { name: 'Charcoal', hex: '#3a3a3a' }],
  },
  {
    id: '2', name: 'Voltus Terra', subtitle: 'SUV', price: '$47,500',
    range: '510 km', acceleration: '6.2s', topSpeed: '210 km/h', charge: 'AC/DC', seats: 7, drive: 'AWD',
    badge: '#2 Popular',
    image: 'https://placehold.co/500x280/0f1f3d/4D9FFF?text=Terra',
    colors: [{ name: 'Ocean Blue', hex: '#1e4080' }, { name: 'Pearl White', hex: '#f0f0f0' },
             { name: 'Midnight Black', hex: '#1a1a1a' }, { name: 'Desert Red', hex: '#8b2020' }],
  },
  {
    id: '3', name: 'Voltus Arc', subtitle: 'Sedán', price: '$39,200',
    range: '480 km', acceleration: '5.1s', topSpeed: '240 km/h', charge: 'AC/DC', seats: 5, drive: 'RWD',
    badge: 'Nuevo 2024',
    image: 'https://placehold.co/500x280/1a1a2e/2fb676?text=Arc',
    colors: [{ name: 'Graphite', hex: '#4a4a5a' }, { name: 'Sky Blue', hex: '#4D9FFF' },
             { name: 'Ice White', hex: '#dce8f0' }, { name: 'Forest', hex: '#1e4a2a' }],
  },
  {
    id: '4', name: 'Voltus Crest', subtitle: 'Pickup', price: '$58,000',
    range: '390 km', acceleration: '7.0s', topSpeed: '185 km/h', charge: 'AC/DC', seats: 5, drive: '4WD',
    badge: 'Ed. Limitada',
    image: 'https://placehold.co/500x280/1a0f2e/9b59b6?text=Crest',
    colors: [{ name: 'Volcanic Black', hex: '#1a1a1a' }, { name: 'Bronze', hex: '#8b6914' },
             { name: 'Steel Gray', hex: '#6a7080' }, { name: 'Army Green', hex: '#3a4a20' }],
  },
  {
    id: '5', name: 'Voltus Zen', subtitle: 'Hatchback', price: '$28,400',
    range: '360 km', acceleration: '8.2s', topSpeed: '175 km/h', charge: 'AC', seats: 5, drive: 'FWD',
    badge: 'Más accesible',
    image: 'https://placehold.co/500x280/0f2a2a/2fb676?text=Zen',
    colors: [{ name: 'Coral', hex: '#c0604a' }, { name: 'Mint', hex: '#5abf9a' },
             { name: 'Lemon', hex: '#c8b840' }, { name: 'Navy', hex: '#1a2a5e' }],
  },
  {
    id: '6', name: 'Voltus Apex', subtitle: 'Coupé', price: '$64,900',
    range: '550 km', acceleration: '3.2s', topSpeed: '280 km/h', charge: 'DC Rápida', seats: 4, drive: 'AWD',
    badge: 'Performance',
    image: 'https://placehold.co/500x280/2a0f0f/e74c3c?text=Apex',
    colors: [{ name: 'Racing Red', hex: '#c0192a' }, { name: 'Carbon Black', hex: '#101010' },
             { name: 'Titanium', hex: '#8a9090' }, { name: 'Neon Green', hex: '#2fb676' }],
  },
  {
    id: '7', name: 'Voltus Drift', subtitle: 'Sport', price: '$72,000',
    range: '500 km', acceleration: '2.9s', topSpeed: '310 km/h', charge: 'DC Rápida', seats: 2, drive: 'RWD',
    badge: 'Top Velocidad',
    image: 'https://placehold.co/500x280/1a1000/f39c12?text=Drift',
    colors: [{ name: 'Sunset Orange', hex: '#c85a10' }, { name: 'Yellow Sport', hex: '#d4a010' },
             { name: 'Matte Black', hex: '#181818' }, { name: 'White Pearl', hex: '#f5f5f5' }],
  },
  {
    id: '8', name: 'Voltus Nova', subtitle: 'Crossover', price: '$43,500',
    range: '465 km', acceleration: '6.0s', topSpeed: '205 km/h', charge: 'AC/DC', seats: 5, drive: 'AWD',
    badge: 'Familia ideal',
    image: 'https://placehold.co/500x280/0f1a2a/2fb676?text=Nova',
    colors: [{ name: 'Aurora Blue', hex: '#2a5080' }, { name: 'Sand', hex: '#a89060' },
             { name: 'Olive', hex: '#5a6030' }, { name: 'Snow', hex: '#f0f2f5' }],
  },
  {
    id: '9', name: 'Voltus Orion', subtitle: 'SUV Grande', price: '$55,800',
    range: '430 km', acceleration: '6.8s', topSpeed: '195 km/h', charge: 'AC/DC', seats: 7, drive: 'AWD',
    badge: 'Más espacioso',
    image: 'https://placehold.co/500x280/0a1628/4D9FFF?text=Orion',
    colors: [{ name: 'Galaxy Black', hex: '#141820' }, { name: 'Cosmic Blue', hex: '#1e3060' },
             { name: 'Silver', hex: '#a0a8b0' }, { name: 'Crimson', hex: '#8a1a2a' }],
  },
  {
    id: '10', name: 'Voltus Lux', subtitle: 'Luxury', price: '$89,000',
    range: '580 km', acceleration: '4.0s', topSpeed: '260 km/h', charge: 'DC Rápida', seats: 5, drive: 'AWD',
    badge: 'Exclusivo',
    image: 'https://placehold.co/500x280/1a1500/f1c40f?text=Lux',
    colors: [{ name: 'Obsidian', hex: '#0a0a0a' }, { name: 'Champagne', hex: '#c0a860' },
             { name: 'Bordeaux', hex: '#601830' }, { name: 'Ivory', hex: '#f0ead0' }],
  },
  {
    id: '11', name: 'Voltus Scout', subtitle: 'Off-road', price: '$51,200',
    range: '410 km', acceleration: '7.5s', topSpeed: '180 km/h', charge: 'AC/DC', seats: 5, drive: '4WD',
    badge: 'Aventura',
    image: 'https://placehold.co/500x280/0f2010/2fb676?text=Scout',
    colors: [{ name: 'Jungle Green', hex: '#2a5020' }, { name: 'Mud Brown', hex: '#6a4820' },
             { name: 'Rock Gray', hex: '#607060' }, { name: 'Sand Dune', hex: '#c0a870' }],
  },
  {
    id: '12', name: 'Voltus Mini', subtitle: 'City Car', price: '$22,900',
    range: '300 km', acceleration: '9.5s', topSpeed: '155 km/h', charge: 'AC', seats: 4, drive: 'FWD',
    badge: 'Más económico',
    image: 'https://placehold.co/500x280/101a0f/2fb676?text=Mini',
    colors: [{ name: 'Candy Red', hex: '#b82030' }, { name: 'Sky Blue', hex: '#5090c0' },
             { name: 'Lime', hex: '#70b030' }, { name: 'White', hex: '#f5f5f5' }],
  },
]

const VehiculosScreen = () => {
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null)
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({})
  const [specIndex, setSpecIndex] = useState(0)
  const specRef = useRef<FlatList>(null)

  // ── VISTA DETALLE ────────────────────────────────────────────────
  if (selectedModel) {
    const model = selectedModel
    const colorIdx = selectedColors[model.id] ?? 0
    const activeColor = model.colors[colorIdx]

    const specs = [
      { icon: 'lightning-bolt',       label: 'Autonomía',      value: model.range,          color: GREEN },
      { icon: 'speedometer',          label: '0-100 km/h',     value: model.acceleration,   color: BLUE },
      { icon: 'gauge',                label: 'Vel. máx.',      value: model.topSpeed,        color: '#f39c12' },
      { icon: 'ev-plug-type2',        label: 'Carga',          value: model.charge,          color: GREEN },
      { icon: 'account-group',        label: 'Asientos',       value: `${model.seats} pas.`, color: BLUE },
      { icon: 'car-traction-control', label: 'Tracción',       value: model.drive,           color: '#9b59b6' },
    ]

    return (
      <View style={styles.rootLight}>
        <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Header — oscuro */}
          <View style={styles.detailHeader}>
            <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedModel(null)}>
              <MaterialCommunityIcons name="arrow-left" size={20} color={WHITE} />
              <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>
            <View style={styles.detailHeaderCenter}>
              <Text style={styles.detailName}>{model.name}</Text>
              <Text style={styles.detailSubtitle}>{model.subtitle}</Text>
            </View>
            <View style={{ width: 72 }} />
          </View>

          {/* Imagen */}
          <View style={[styles.modelImageContainer, { backgroundColor: `${activeColor.hex}22` }]}>
            <Image source={{ uri: model.image }} style={styles.modelImage} resizeMode="contain" />
            {model.discount && (
              <View style={styles.detailDiscountBadge}>
                <Text style={styles.detailDiscountText}>{model.discount}</Text>
              </View>
            )}
          </View>

          {/* Colores — tarjeta blanca */}
          <View style={styles.colorSection}>
            <Text style={styles.colorSectionTitle}>Colores disponibles</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 }}>
  <MaterialCommunityIcons name="palette" size={13} color={GREEN} />
  <Text style={styles.colorSelected}>{activeColor.name}</Text>
</View>
            <View style={styles.colorRow}>
              {model.colors.map((c, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: c.hex },
                    i === colorIdx && styles.colorSwatchActive,
                  ]}
                  onPress={() => setSelectedColors(prev => ({ ...prev, [model.id]: i }))}
                >
                  {i === colorIdx && (
                    <MaterialCommunityIcons
                      name="check" size={14}
                      color={['#f5f5f5','#f0f0f0','#e8edf2','#f0ead0','#dce8f0'].includes(c.hex) ? '#333' : WHITE}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.colorNamesRow}>
              {model.colors.map((c, i) => (
                <Text key={i} style={[styles.colorName, i === colorIdx && { color: TEXT_DARK, fontWeight: '700' }]}>
                  {c.name}
                </Text>
              ))}
            </View>
          </View>

          {/* Ficha técnica — tarjetas blancas */}
          <View style={styles.specSection}>
            <Text style={styles.specSectionTitle}>Ficha Técnica</Text>
            <FlatList
              ref={specRef}
              data={specs}
              keyExtractor={(_, i) => String(i)}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={SPEC_CARD_WIDTH + 12}
              snapToAlignment="start"
              decelerationRate="fast"
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
              onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
                const i = Math.round(e.nativeEvent.contentOffset.x / (SPEC_CARD_WIDTH + 12))
                setSpecIndex(i)
              }}
              renderItem={({ item }) => (
                <View style={[styles.specCard, { borderColor: `${item.color}33` }]}>
                  <View style={[styles.specIconBox, { backgroundColor: `${item.color}15` }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                  </View>
                  <Text style={styles.specLabel}>{item.label}</Text>
                  <Text style={[styles.specValue, { color: item.color }]}>{item.value}</Text>
                </View>
              )}
            />
            <View style={styles.specDots}>
              {specs.map((_, i) => (
                <View key={i} style={[styles.specDot, i === specIndex && styles.specDotActive]} />
              ))}
            </View>
          </View>

          {/* Precio — tarjeta blanca */}
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLabel}>Precio base</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.priceMain}>{model.price}</Text>
                {model.originalPrice && (
                  <Text style={styles.priceOriginal}>{model.originalPrice}</Text>
                )}
              </View>
            </View>
            <View style={[styles.driveBadge, { backgroundColor: `${GREEN}15`, borderColor: `${GREEN}44` }]}>
              <MaterialCommunityIcons name="car-traction-control" size={14} color={GREEN} />
              <Text style={[styles.driveBadgeText, { color: GREEN }]}>{model.drive}</Text>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.reserveBtn} activeOpacity={0.85}>
            <MaterialCommunityIcons name="calendar-check" size={18} color={WHITE} />
            <Text style={styles.reserveBtnText}>RESERVAR ESTE MODELO</Text>
          </TouchableOpacity>
          <Text style={styles.reserveNote}>El precio de reserva es reembolsable</Text>

        </ScrollView>
      </View>
    )
  }

  // ── LISTA DE MODELOS ─────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />

      {/* Header — oscuro */}
      <View style={styles.listHeader}>
        <LoginButton onPress={() => {}} />
      </View>

      {/* Lista — fondo gris claro, tarjetas blancas */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}
      >
        {CAR_MODELS.map((model, index) => {
          const colorIdx = selectedColors[model.id] ?? 0
          const activeColor = model.colors[colorIdx]
          return (
            <TouchableOpacity
              key={model.id}
              style={styles.listCard}
              onPress={() => setSelectedModel(model)}
              activeOpacity={0.85}
            >
              <Text style={styles.listCardNumber}>{index + 1}.</Text>

              <View style={styles.listCardInfo}>
                <View style={styles.listCardNameRow}>
                  <Text style={styles.listCardName}>{model.name}</Text>
                  {model.badge && (
                    <View style={styles.listBadge}>
                      <Text style={styles.listBadgeText}>{model.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.listCardType}>{model.subtitle}</Text>

                <View style={styles.listCardStats}>
                  <MaterialCommunityIcons name="lightning-bolt" size={11} color={GREEN} />
                  <Text style={styles.listCardStat}>{model.range}</Text>
                </View>
                <View style={styles.listCardStats}>
                  <MaterialCommunityIcons name="ev-plug-type2" size={11} color={BLUE} />
                  <Text style={styles.listCardStat}>{model.charge}</Text>
                </View>

                <View style={styles.listSwatchRow}>
                  {model.colors.map((c, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.listSwatch,
                        { backgroundColor: c.hex },
                        i === colorIdx && styles.listSwatchActive,
                      ]}
                      onPress={(e) => {
                        e.stopPropagation?.()
                        setSelectedColors(prev => ({ ...prev, [model.id]: i }))
                      }}
                    />
                  ))}
                </View>
                <Text style={styles.listColorName}>{activeColor.name}</Text>
              </View>

              <View style={styles.listCardRight}>
                <Image source={{ uri: model.image }} style={styles.listCardImage} resizeMode="contain" />
                <View style={[styles.listPriceBadge, { backgroundColor: `${GREEN}15`, borderColor: `${GREEN}44` }]}>
                  <Text style={[styles.listPriceText, { color: GREEN }]}>De {model.price}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color={TEXT_SOFT} style={{ alignSelf: 'flex-end', marginTop: 4 }} />
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default VehiculosScreen

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  rootLight: { flex: 1, backgroundColor: BG },

  // LIST HEADER — oscuro
  listHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 30, paddingBottom: 15,
    backgroundColor: BG_DARK,
  },
  listHeaderSub: {
    color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '500',
    letterSpacing: 2, textTransform: 'uppercase',
  },
  listHeaderTitle: { color: WHITE, fontSize: 26, fontWeight: 'bold', marginTop: 2 },
  listHeaderBadge: {
    backgroundColor: `${GREEN}22`, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
    borderWidth: 1, borderColor: `${GREEN}55`,
  },
  listHeaderBadgeText: { color: GREEN, fontSize: 12, fontWeight: '700' },

  // LIST CARD — blanca sobre gris
  listCard: {
    marginHorizontal: 16, marginBottom: 10,
    backgroundColor: CARD_WHITE,
    borderRadius: 18, borderWidth: 1, borderColor: BORDER,
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 8,
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.06, shadowRadius: 10, elevation: 2,
  },
  listCardNumber: { color: GREEN, fontSize: 13, fontWeight: 'bold', width: 20 },
  listCardInfo: { flex: 1 },
  listCardNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  listCardName: { color: TEXT_DARK, fontSize: 15, fontWeight: 'bold' },
  listBadge: {
    backgroundColor: `${GREEN}15`, borderRadius: 8,
    paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: `${GREEN}44`,
  },
  listBadgeText: { color: GREEN, fontSize: 9, fontWeight: 'bold' },
  listCardType: { color: TEXT_SOFT, fontSize: 11, marginBottom: 6, marginTop: 1 },
  listCardStats: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 },
  listCardStat: { color: TEXT_MID, fontSize: 10 },
  listSwatchRow: { flexDirection: 'row', gap: 5, marginTop: 7 },
  listSwatch: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: 'transparent' },
  listSwatchActive: { borderWidth: 2, borderColor: TEXT_DARK },
  listColorName: { color: TEXT_SOFT, fontSize: 9, marginTop: 3 },
  listCardRight: { alignItems: 'flex-end', gap: 4, width: 120 },
  listCardImage: { width: 120, height: 70 },
  listPriceBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  listPriceText: { fontSize: 12, fontWeight: 'bold' },

  // DETAIL HEADER — oscuro
  detailHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 30, paddingBottom: 5,
    backgroundColor: BG_DARK,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, width: 72 },
  backText: { color: WHITE, fontSize: 14, fontWeight: '600' },
  detailHeaderCenter: { alignItems: 'center' },
  detailName: { color: WHITE, fontSize: 20, fontWeight: 'bold' },
  detailSubtitle: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 1 },

  // MODEL IMAGE
  modelImageContainer: {
    marginHorizontal: 20, marginTop: 16, borderRadius: 20, padding: 16,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  modelImage: { width: '100%', height: 200 },
  detailDiscountBadge: {
    position: 'absolute', top: 14, right: 14,
    backgroundColor: GREEN, borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  detailDiscountText: { color: WHITE, fontSize: 11, fontWeight: 'bold' },

  // COLOR SECTION — tarjeta blanca
  colorSection: {
    marginHorizontal: 20, marginTop: 16,
    backgroundColor: CARD_WHITE, borderRadius: 18,
    padding: 16, borderWidth: 1, borderColor: BORDER,
    shadowColor: '#0d1b3e', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  colorSectionTitle: { color: TEXT_DARK, fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  colorSelected: { color: GREEN, fontSize: 12,  },
  colorRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  colorSwatch: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'transparent',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  colorSwatchActive: { borderColor: TEXT_DARK },
  colorNamesRow: { flexDirection: 'row' },
  colorName: {
    flex: 1, color: TEXT_SOFT, fontSize: 9,
    textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.3,
  },

  // SPEC CAROUSEL — tarjetas blancas
  specSection: { marginTop: 16 },
  specSectionTitle: {
    color: TEXT_DARK, fontSize: 16, fontWeight: 'bold',
    paddingHorizontal: 20, marginBottom: 12,
  },
  specCard: {
    width: SPEC_CARD_WIDTH,
    backgroundColor: CARD_WHITE,
    borderRadius: 18, borderWidth: 1,
    padding: 20, alignItems: 'center', gap: 10,
    shadowColor: '#0d1b3e', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  specIconBox: {
    width: 60, height: 60, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  specLabel: { color: TEXT_SOFT, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  specValue: { fontSize: 28, fontWeight: 'bold' },
  specDots: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 5 },
  specDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#c8d0e0' },
  specDotActive: { width: 16, backgroundColor: GREEN },

  // PRICE ROW — tarjeta blanca
  priceRow: {
    marginHorizontal: 20, marginTop: 16,
    backgroundColor: CARD_WHITE, borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: BORDER,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    shadowColor: '#0d1b3e', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  priceLabel: { color: TEXT_SOFT, fontSize: 11, marginBottom: 4 },
  priceMain: { color: TEXT_DARK, fontSize: 28, fontWeight: 'bold' },
  priceOriginal: { color: TEXT_SOFT, fontSize: 14, textDecorationLine: 'line-through' },
  driveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1,
  },
  driveBadgeText: { fontSize: 13, fontWeight: '700' },

  // RESERVE BUTTON
  reserveBtn: {
    marginHorizontal: 20, marginTop: 16,
    backgroundColor: GREEN, borderRadius: 16,
    paddingVertical: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  reserveBtnText: { color: WHITE, fontSize: 15, fontWeight: 'bold', letterSpacing: 1 },
  reserveNote: {
    textAlign: 'center', color: TEXT_SOFT, fontSize: 11, marginTop: 8,
  },
})