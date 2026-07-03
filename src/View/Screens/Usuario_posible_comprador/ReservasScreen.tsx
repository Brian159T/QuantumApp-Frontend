import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native'
import LoginButton from '../../components/LoginButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

const COLORS = {
  primary: '#2fb676',
  primaryDark: '#239a61',
  primaryLight: '#e8f8f0',
  navy: '#0A0F1E',
  navyMid: '#1a2f5e',
  blue: '#1e4fd8',
  blueLight: '#2563eb',
  white: '#ffffff',
  gray: '#f4f6fb',
  grayMid: '#c8d0e0',
  grayText: '#6b7a99',
  dark: '#0a1628',
  cardBg: '#f0f4ff',
}

const MODELOS = [
  { id: '1', nombre: 'Voltus Neo Compact', precio: '$27,920', descuento: '-$6,980', base: '$34,900' },
  { id: '2', nombre: 'Voltus Neo Sport', precio: '$39,500', descuento: '-$4,500', base: '$44,000' },
  { id: '3', nombre: 'Voltus Neo SUV', precio: '$52,800', descuento: '-$7,200', base: '$60,000' },
]

const COLORES = [
  { id: '1', nombre: 'Deep Blue', hex: '#1e4fd8' },
  { id: '2', nombre: 'Midnight Black', hex: '#0a1628' },
  { id: '3', nombre: 'Pearl White', hex: '#f0f4ff', border: true },
  { id: '4', nombre: 'Voltus Green', hex: '#2fb676' },
  { id: '5', nombre: 'Silver Mist', hex: '#9ca3af' },
]

interface FormData {
  nombre: string
  ci: string
  modelo: (typeof MODELOS)[0] | null
  color: (typeof COLORES)[0] | null
}

interface ReservaModalProps {
  visible: boolean
  form: FormData
  onClose: () => void
  onConfirm: () => void
}

function ReservaModal({ visible, form, onClose, onConfirm }: ReservaModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderAccent} />
            <Text style={styles.modalTitle}>Confirmar Reserva</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>{'✕'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/* Car placeholder */}
            <View style={styles.carPlaceholder}>
              <Text style={styles.carPlaceholderIcon}>{'🚗'}</Text>
              <Text style={styles.carPlaceholderText}>{'Imagen del vehículo'}</Text>
            </View>

            {/* Datos del cliente */}
            <View style={styles.summarySection}>
              <Text style={styles.summarySectionTitle}>{'DATOS DEL CLIENTE'}</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{'Nombre Completo'}</Text>
                <Text style={styles.summaryValue}>{form.nombre || '—'}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{'Cédula de Identidad'}</Text>
                <Text style={styles.summaryValue}>{form.ci || '—'}</Text>
              </View>
            </View>

            {/* Datos del vehículo */}
            <View style={styles.summarySection}>
              <Text style={styles.summarySectionTitle}>{'VEHÍCULO SELECCIONADO'}</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{'Modelo'}</Text>
                <Text style={styles.summaryValue}>{form.modelo?.nombre || '—'}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{'Color'}</Text>
                <View style={styles.summaryColorRow}>
                  {form.color && (
                    <View style={[styles.summaryColorDot, { backgroundColor: form.color.hex }]} />
                  )}
                  <Text style={styles.summaryValue}>{form.color?.nombre || '—'}</Text>
                </View>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{'Precio Base'}</Text>
                <Text style={styles.summaryValue}>{form.modelo?.base || '—'}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{'Descuento'}</Text>
                <Text style={[styles.summaryValue, { color: COLORS.primary }]}>{form.modelo?.descuento || '—'}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { fontWeight: '700', color: COLORS.navy }]}>{'Total'}</Text>
                <Text style={[styles.summaryValue, { fontWeight: '700', fontSize: 16, color: COLORS.navy }]}>{form.modelo?.precio || '—'}</Text>
              </View>
            </View>

            {/* QR Section */}
            <View style={styles.qrSection}>
              <Text style={styles.summarySectionTitle}>{'PAGO QR'}</Text>
              <View style={styles.qrBox}>
                <View style={styles.qrPlaceholder}>
                  <View style={styles.qrCorner} />
                  <View style={[styles.qrCorner, { right: 0, left: undefined }]} />
                  <View style={[styles.qrCorner, { bottom: 0, top: undefined }]} />
                  <View style={[styles.qrCorner, { bottom: 0, top: undefined, right: 0, left: undefined }]} />
                  <Text style={styles.qrIcon}>{'⬛'}</Text>
                  <Text style={styles.qrText}>{'Código QR de Pago'}</Text>
                  <Text style={styles.qrSubtext}>{'Se añadirá próximamente'}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.reembolsable}>{'✓ El precio de reserva es reembolsable'}</Text>

            {/* Botones */}
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmBtnText}>{'EFECTUAR PAGO Y CONFIRMAR'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>{'Cancelar'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

interface State {
  form: FormData
  modalVisible: boolean
  exitoVisible: boolean
  confirmacion: string
}

export class ReservasScreen extends Component<{}, State> {
  state: State = {
    form: { nombre: '', ci: '', modelo: null, color: null },
    modalVisible: false,
    exitoVisible: false,
    confirmacion: '',
  }

  handleReservar = () => {
    const { form } = this.state
    if (!form.nombre || !form.ci || !form.modelo || !form.color) return
    this.setState({ modalVisible: true })
  }

  handleConfirmar = () => {
    const codigo = 'VT-' + Math.floor(1000 + Math.random() * 9000) + '-ABC'
    this.setState({ modalVisible: false, exitoVisible: true, confirmacion: codigo })
  }

  render() {
    const { form, modalVisible, exitoVisible, confirmacion } = this.state
    const isFormValid = form.nombre && form.ci && form.modelo && form.color

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

        {/* ✅ FIX: Header sin texto suelto ni espacios extra */}
        <View style={styles.header}>
          <LoginButton onPress={() => {}} />
        </View>

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerTextCol}>
              <Text style={styles.bannerTitle}>{'Reserva ahora,\nmaneja el futuro'}</Text>
              <Text style={styles.bannerSub}>{'Garantiza tu lugar con\nsolo $1,000 USD'}</Text>
            </View>
            <View style={styles.bannerCarBox}>
              <MaterialCommunityIcons name="car-sports" size={70} color={COLORS.primary} />
            </View>
          </View>

          {/* Formulario */}
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>{'Datos Personales'}</Text>

            <Text style={styles.inputLabel}>{'Nombre Completo'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Juan Pérez Mamani"
              placeholderTextColor={COLORS.grayMid}
              value={form.nombre}
              onChangeText={v => this.setState({ form: { ...form, nombre: v } })}
            />

            <Text style={styles.inputLabel}>{'Cédula de Identidad'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 12345678"
              placeholderTextColor={COLORS.grayMid}
              keyboardType="number-pad"
              value={form.ci}
              onChangeText={v => this.setState({ form: { ...form, ci: v } })}
            />

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>{'Selecciona tu Modelo'}</Text>
            {MODELOS.map(m => (
              <TouchableOpacity
                key={m.id}
                style={[styles.modelCard, form.modelo?.id === m.id && styles.modelCardSelected]}
                onPress={() => this.setState({ form: { ...form, modelo: m } })}
              >
                <View style={styles.modelCarBox}>
                  <Text style={styles.modelCarEmoji}>{'🚙'}</Text>
                </View>
                <View style={styles.modelInfo}>
                  <Text style={[styles.modelNombre, form.modelo?.id === m.id && { color: COLORS.primary }]}>
                    {m.nombre}
                  </Text>
                  <Text style={styles.modelPrecioBase}>
                    {m.base}
                    <Text style={styles.modelDescuento}>{' ' + m.descuento}</Text>
                  </Text>
                  <Text style={styles.modelTotal}>{'Total: ' + m.precio}</Text>
                </View>
                <View style={[styles.radioOuter, form.modelo?.id === m.id && styles.radioOuterSelected]}>
                  {form.modelo?.id === m.id && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>{'Elige tu Color'}</Text>
            <View style={styles.colorRow}>
              {COLORES.map(c => (
                <TouchableOpacity
                  key={c.id}
                  style={styles.colorItem}
                  onPress={() => this.setState({ form: { ...form, color: c } })}
                >
                  <View style={[
                    styles.colorCircle,
                    { backgroundColor: c.hex },
                    c.border ? styles.colorCircleBorder : null,
                    form.color?.id === c.id && styles.colorCircleSelected,
                  ]}>
                    {form.color?.id === c.id && <Text style={styles.colorCheck}>{'✓'}</Text>}
                  </View>
                  <Text style={[styles.colorName, form.color?.id === c.id && { color: COLORS.primary, fontWeight: '700' }]}>
                    {c.nombre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Precio reserva */}
            <View style={styles.reservaInfo}>
              <Text style={styles.reservaInfoText}>{'💳  Precio de Reserva'}</Text>
              <Text style={styles.reservaInfoPrice}>{'$1,000 USD'}</Text>
            </View>

            <TouchableOpacity
              style={[styles.reservarBtn, !isFormValid && styles.reservarBtnDisabled]}
              onPress={this.handleReservar}
              disabled={!isFormValid}
            >
              <Text style={styles.reservarBtnText}>{'CONFIRMAR Y PAGAR RESERVA'}</Text>
            </TouchableOpacity>

            {!isFormValid && (
              <Text style={styles.validationMsg}>{'Completa todos los campos para continuar'}</Text>
            )}
          </View>
        </ScrollView>

        {/* Modal de confirmación */}
        <ReservaModal
          visible={modalVisible}
          form={form}
          onClose={() => this.setState({ modalVisible: false })}
          onConfirm={this.handleConfirmar}
        />

        {/* Modal de éxito */}
        <Modal visible={exitoVisible} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.exitoContainer}>
              <View style={styles.exitoCheck}>
                <Text style={styles.exitoCheckText}>{'✓'}</Text>
              </View>
              <Text style={styles.exitoTitle}>{'¡RESERVA EXITOSA!'}</Text>

              <View style={styles.exitoCarBox}>
                <Text style={styles.exitoCarEmoji}>{'🚗'}</Text>
              </View>

              <View style={styles.exitoDetails}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{'Vehículo'}</Text>
                  <Text style={styles.summaryValue}>{form.modelo?.nombre}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{'Color'}</Text>
                  <Text style={styles.summaryValue}>{form.color?.nombre}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{'Costo Reserva'}</Text>
                  <Text style={styles.summaryValue}>{'$1,000 USD'}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{'Nº Confirmación'}</Text>
                  <Text style={[styles.summaryValue, { color: COLORS.primary, fontWeight: '700' }]}>{confirmacion}</Text>
                </View>
              </View>

              <View style={styles.exitoNextSteps}>
                <Text style={styles.exitoNextTitle}>{'Próximos Pasos'}</Text>
                <Text style={styles.exitoNextItem}>{'• Revisa tu correo para más detalles'}</Text>
                <Text style={styles.exitoNextItem}>{'• Un asesor de Voltus se pondrá en contacto'}</Text>
              </View>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => this.setState({ exitoVisible: false, form: { nombre: '', ci: '', modelo: null, color: null } })}
              >
                <Text style={styles.confirmBtnText}>{'IR A INICIO'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.navy },
  scroll: { flex: 1, backgroundColor: COLORS.gray },

  // Header — ✅ sin gap ni elementos extra que generen texto suelto
  header: {
    backgroundColor: COLORS.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
  },

  // Banner
  banner: {
    backgroundColor: COLORS.navyMid,
    marginHorizontal: 16, marginTop: 16, marginBottom: 4,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerTextCol: { flex: 1 },
  bannerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.white, lineHeight: 26 },
  bannerSub: { fontSize: 13, color: COLORS.primary, marginTop: 6, lineHeight: 18 },
  bannerCarBox: { width: 100, height: 70, alignItems: 'center', justifyContent: 'center' },
  bannerCarEmoji: { fontSize: 50 },

  // Form card
  formCard: {
    backgroundColor: COLORS.white,
    margin: 16, borderRadius: 24,
    padding: 20,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.08, shadowRadius: 20, elevation: 4,
  },
  sectionTitle: {
    fontSize: 13, fontWeight: '800', color: COLORS.navy,
    letterSpacing: 1.2, marginBottom: 14,
    textTransform: 'uppercase',
  },
  inputLabel: { fontSize: 13, fontWeight: '600', color: COLORS.grayText, marginBottom: 6 },
  input: {
    borderWidth: 1.5, borderColor: COLORS.grayMid,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: COLORS.dark,
    marginBottom: 16, backgroundColor: COLORS.gray,
  },

  // Model cards
  modelCard: {
    borderWidth: 1.5, borderColor: COLORS.grayMid,
    borderRadius: 16, padding: 12, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.cardBg,
  },
  modelCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  modelCarBox: { width: 70, height: 50, alignItems: 'center', justifyContent: 'center' },
  modelCarEmoji: { fontSize: 36 },
  modelInfo: { flex: 1 },
  modelNombre: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  modelPrecioBase: { fontSize: 12, color: COLORS.grayText, marginTop: 2 },
  modelDescuento: { color: COLORS.primary, fontWeight: '700' },
  modelTotal: { fontSize: 13, fontWeight: '800', color: COLORS.blue, marginTop: 2 },
  radioOuter: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: COLORS.grayMid,
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterSelected: { borderColor: COLORS.primary },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },

  // Colors
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  colorItem: { alignItems: 'center', width: (width - 80) / 5 },
  colorCircle: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 3,
  },
  colorCircleBorder: { borderWidth: 1.5, borderColor: COLORS.grayMid },
  colorCircleSelected: { borderWidth: 3, borderColor: COLORS.primary },
  colorCheck: { color: COLORS.white, fontWeight: '900', fontSize: 18, textShadowColor: '#0005', textShadowRadius: 4 },
  colorName: { fontSize: 9, color: COLORS.grayText, textAlign: 'center', marginTop: 4, fontWeight: '500' },

  // Reserva info
  reservaInfo: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12, padding: 14,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 16,
  },
  reservaInfoText: { fontSize: 14, color: COLORS.navy, fontWeight: '600' },
  reservaInfoPrice: { fontSize: 18, fontWeight: '900', color: COLORS.primary },

  reservarBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16, paddingVertical: 16,
    alignItems: 'center',
  },
  reservarBtnDisabled: { backgroundColor: COLORS.grayMid },
  reservarBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  validationMsg: { textAlign: 'center', color: COLORS.grayText, fontSize: 12, marginTop: 10 },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: '#0009',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    maxHeight: '90%', padding: 20,
  },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 20, gap: 10,
  },
  modalHeaderAccent: {
    width: 4, height: 24, borderRadius: 2, backgroundColor: COLORS.primary,
  },
  modalTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: COLORS.navy },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.gray, alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 14, color: COLORS.grayText, fontWeight: '700' },

  carPlaceholder: {
    backgroundColor: COLORS.cardBg, borderRadius: 16,
    height: 120, alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  carPlaceholderIcon: { fontSize: 50 },
  carPlaceholderText: { color: COLORS.grayText, fontSize: 12, marginTop: 4 },

  summarySection: {
    backgroundColor: COLORS.gray, borderRadius: 16, padding: 16, marginBottom: 12,
  },
  summarySectionTitle: {
    fontSize: 11, fontWeight: '800', color: COLORS.primary,
    letterSpacing: 1.5, marginBottom: 12,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  summaryLabel: { fontSize: 13, color: COLORS.grayText, fontWeight: '500' },
  summaryValue: { fontSize: 14, color: COLORS.navy, fontWeight: '600', textAlign: 'right', maxWidth: '55%' },
  summaryColorRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  summaryColorDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: COLORS.grayMid },
  summaryDivider: { height: 1, backgroundColor: COLORS.grayMid, opacity: 0.5 },

  // QR
  qrSection: { backgroundColor: COLORS.gray, borderRadius: 16, padding: 16, marginBottom: 12 },
  qrBox: { alignItems: 'center' },
  qrPlaceholder: {
    width: 160, height: 160, borderRadius: 12,
    borderWidth: 2, borderColor: COLORS.grayMid, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  qrCorner: {
    position: 'absolute', top: 8, left: 8,
    width: 20, height: 20,
    borderTopWidth: 3, borderLeftWidth: 3,
    borderColor: COLORS.primary, borderTopLeftRadius: 4,
  },
  qrIcon: { fontSize: 36, opacity: 0.2 },
  qrText: { fontSize: 13, color: COLORS.grayText, fontWeight: '600', marginTop: 8 },
  qrSubtext: { fontSize: 11, color: COLORS.grayMid, marginTop: 2 },

  reembolsable: { textAlign: 'center', color: COLORS.primary, fontSize: 12, fontWeight: '600', marginBottom: 16 },

  confirmBtn: {
    backgroundColor: COLORS.primary, borderRadius: 16,
    paddingVertical: 16, alignItems: 'center', marginBottom: 10,
  },
  confirmBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  cancelBtn: { alignItems: 'center', paddingVertical: 10, marginBottom: 10 },
  cancelBtnText: { color: COLORS.grayText, fontSize: 14, fontWeight: '600' },

  // Éxito
  exitoContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, maxHeight: '92%',
  },
  exitoCheck: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginBottom: 12,
  },
  exitoCheckText: { fontSize: 32, color: COLORS.white, fontWeight: '900' },
  exitoTitle: {
    textAlign: 'center', fontSize: 22, fontWeight: '900',
    color: COLORS.navy, letterSpacing: 1, marginBottom: 16,
  },
  exitoCarBox: {
    backgroundColor: COLORS.cardBg, borderRadius: 16,
    height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  exitoCarEmoji: { fontSize: 60 },
  exitoDetails: { backgroundColor: COLORS.gray, borderRadius: 16, padding: 16, marginBottom: 12 },
  exitoNextSteps: { backgroundColor: COLORS.primaryLight, borderRadius: 16, padding: 16, marginBottom: 20 },
  exitoNextTitle: { fontSize: 13, fontWeight: '800', color: COLORS.primary, marginBottom: 8 },
  exitoNextItem: { fontSize: 13, color: COLORS.navy, marginBottom: 4 },
})

export default ReservasScreen