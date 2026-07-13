import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native'
import React, { useMemo, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import LoginButton from '../../components/LoginButton'

const GREEN = '#2fb676'
const BLUE = '#4D9FFF'
const ORANGE = '#f39c12'
const RED = '#e74c3c'
const PURPLE = '#a78bfa'
const BG = '#0A0F1E'
const WHITE = '#ffffff'
const OFF_WHITE = '#f4f7ff'
const SUBTLE = '#e8edf8'
const TEXT_DARK = '#0d1b3e'
const TEXT_MID = '#4a5578'

type Role = 'Usuario' | 'Administrador'
type Status = 'Activo' | 'Suspendido'

type UserItem = {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  vehicles: number
  joinedAt: string
}

const INITIAL_USERS: UserItem[] = [
  {
    id: '1',
    name: 'Camila Rojas',
    email: 'camila.rojas@mail.com',
    role: 'Usuario',
    status: 'Activo',
    vehicles: 1,
    joinedAt: '12 Mar 2025',
  },
  {
    id: '2',
    name: 'Daniel Quispe',
    email: 'daniel.quispe@mail.com',
    role: 'Administrador',
    status: 'Activo',
    vehicles: 0,
    joinedAt: '02 Ene 2024',
  },
  {
    id: '3',
    name: 'Fernanda Vargas',
    email: 'fernanda.vargas@mail.com',
    role: 'Usuario',
    status: 'Suspendido',
    vehicles: 2,
    joinedAt: '28 Jun 2025',
  },
  {
    id: '4',
    name: 'Jorge Mamani',
    email: 'jorge.mamani@mail.com',
    role: 'Usuario',
    status: 'Activo',
    vehicles: 1,
    joinedAt: '15 Nov 2024',
  },
  {
    id: '5',
    name: 'Lucía Fernández',
    email: 'lucia.fernandez@mail.com',
    role: 'Usuario',
    status: 'Activo',
    vehicles: 1,
    joinedAt: '30 Abr 2025',
  },
]

const STATUS_FILTERS: (Status | 'Todos')[] = ['Todos', 'Activo', 'Suspendido']

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')

const emptyForm = { name: '', email: '', role: 'Usuario' as Role }

const Interfaz_Administrador_usuarios = () => {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status | 'Todos'>('Todos')

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: '', email: '' })

  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState(emptyForm)

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch =
        search.trim().length === 0 ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'Todos' || u.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [users, search, statusFilter])

  const activeCount = users.filter(u => u.status === 'Activo').length
  const adminCount = users.filter(u => u.role === 'Administrador').length

  // ── CREATE ──
  const handleAddUser = () => {
    if (newUser.name.trim().length === 0 || newUser.email.trim().length === 0) return
    const created: UserItem = {
      id: Date.now().toString(),
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      status: 'Activo',
      vehicles: 0,
      joinedAt: 'Hoy',
    }
    setUsers(prev => [created, ...prev])
    setNewUser(emptyForm)
    setShowAddForm(false)
  }

  // ── UPDATE (estado) ──
  const handleToggleStatus = (id: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, status: u.status === 'Activo' ? 'Suspendido' : 'Activo' } : u
      )
    )
  }

  // ── UPDATE (edición de datos) ──
  const startEditing = (u: UserItem) => {
    setEditingId(u.id)
    setEditForm({ name: u.name, email: u.email })
    setExpandedId(u.id)
  }

  const saveEditing = (id: string) => {
    if (editForm.name.trim().length === 0 || editForm.email.trim().length === 0) return
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, name: editForm.name.trim(), email: editForm.email.trim() } : u
      )
    )
    setEditingId(null)
  }

  // ── DELETE ──
  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    setConfirmDeleteId(null)
    if (expandedId === id) setExpandedId(null)
  }

  const renderUser = ({ item }: { item: UserItem }) => {
    const isExpanded = expandedId === item.id
    const isEditing = editingId === item.id
    const isConfirmingDelete = confirmDeleteId === item.id

    return (
      <View style={styles.userCard}>
        <TouchableOpacity
          style={styles.userTopRow}
          activeOpacity={0.85}
          onPress={() => setExpandedId(isExpanded ? null : item.id)}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials(item.name)}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.userName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.userEmail} numberOfLines={1}>{item.email}</Text>
          </View>

          <View style={{ alignItems: 'flex-end', gap: 6 }}>
            <View style={[styles.statusPill, item.status === 'Activo' ? styles.statusPillGreen : styles.statusPillRed]}>
              <View style={[styles.dotStatus, { backgroundColor: item.status === 'Activo' ? GREEN : RED }]} />
              <Text style={[styles.statusPillText, { color: item.status === 'Activo' ? GREEN : RED }]}>
                {item.status}
              </Text>
            </View>
            {item.role === 'Administrador' && (
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>{'Admin'}</Text>
              </View>
            )}
          </View>

          <MaterialCommunityIcons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={TEXT_MID}
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedArea}>
            <View style={styles.divider} />

            {isEditing ? (
              <View style={{ gap: 10 }}>
                <View>
                  <Text style={styles.fieldLabel}>{'Nombre'}</Text>
                  <TextInput
                    value={editForm.name}
                    onChangeText={t => setEditForm(prev => ({ ...prev, name: t }))}
                    style={styles.fieldInput}
                    placeholder="Nombre completo"
                    placeholderTextColor={TEXT_MID}
                  />
                </View>
                <View>
                  <Text style={styles.fieldLabel}>{'Correo'}</Text>
                  <TextInput
                    value={editForm.email}
                    onChangeText={t => setEditForm(prev => ({ ...prev, email: t }))}
                    style={styles.fieldInput}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor={TEXT_MID}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    activeOpacity={0.85}
                    onPress={() => setEditingId(null)}
                  >
                    <Text style={styles.cancelBtnText}>{'Cancelar'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.saveBtn}
                    activeOpacity={0.85}
                    onPress={() => saveEditing(item.id)}
                  >
                    <MaterialCommunityIcons name="check" size={14} color={WHITE} />
                    <Text style={styles.saveBtnText}>{'Guardar'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.detailsRow}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="car-outline" size={14} color={TEXT_MID} />
                    <Text style={styles.detailText}>{`${item.vehicles} vehículo(s)`}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="calendar-outline" size={14} color={TEXT_MID} />
                    <Text style={styles.detailText}>{`Desde ${item.joinedAt}`}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="shield-account-outline" size={14} color={TEXT_MID} />
                    <Text style={styles.detailText}>{item.role}</Text>
                  </View>
                </View>

                {isConfirmingDelete ? (
                  <View style={styles.confirmDeleteBox}>
                    <MaterialCommunityIcons name="alert-outline" size={16} color={RED} />
                    <Text style={styles.confirmDeleteText}>{'¿Eliminar este usuario? Esta acción no se puede deshacer.'}</Text>
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        activeOpacity={0.85}
                        onPress={() => setConfirmDeleteId(null)}
                      >
                        <Text style={styles.cancelBtnText}>{'Cancelar'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteConfirmBtn}
                        activeOpacity={0.85}
                        onPress={() => handleDelete(item.id)}
                      >
                        <MaterialCommunityIcons name="trash-can-outline" size={14} color={WHITE} />
                        <Text style={styles.saveBtnText}>{'Eliminar'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.statusToggleBtn}
                      activeOpacity={0.85}
                      onPress={() => handleToggleStatus(item.id)}
                    >
                      <MaterialCommunityIcons
                        name={item.status === 'Activo' ? 'account-lock-outline' : 'lock-open-outline'}
                        size={14}
                        color={TEXT_DARK}
                      />
                      <Text style={styles.statusToggleBtnText}>
                        {item.status === 'Activo' ? 'Suspender' : 'Reactivar'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.editBtn}
                      activeOpacity={0.85}
                      onPress={() => startEditing(item)}
                    >
                      <MaterialCommunityIcons name="pencil-outline" size={14} color={WHITE} />
                      <Text style={styles.saveBtnText}>{'Editar'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteBtn}
                      activeOpacity={0.85}
                      onPress={() => setConfirmDeleteId(item.id)}
                    >
                      <MaterialCommunityIcons name="trash-can-outline" size={16} color={RED} />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </View>
        )}
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* ── HEADER FIJO ── */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerSub}>{'PANEL DE CONTROL'}</Text>
          <Text style={styles.headerTitle}>{'Usuarios'}</Text>
        </View>
        <LoginButton onPress={() => {}} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── STATS ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: `${BLUE}18` }]}>
              <MaterialCommunityIcons name="account-multiple-outline" size={18} color={BLUE} />
            </View>
            <Text style={styles.statValue}>{users.length}</Text>
            <Text style={styles.statLabel}>{'Total usuarios'}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: `${GREEN}18` }]}>
              <MaterialCommunityIcons name="account-check-outline" size={18} color={GREEN} />
            </View>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>{'Activos'}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: `${PURPLE}18` }]}>
              <MaterialCommunityIcons name="shield-account-outline" size={18} color={PURPLE} />
            </View>
            <Text style={styles.statValue}>{adminCount}</Text>
            <Text style={styles.statLabel}>{'Administradores'}</Text>
          </View>
        </View>

        {/* ── BUSCADOR ── */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={18} color={TEXT_MID} />
            <TextInput
              placeholder="Buscar por nombre o correo..."
              placeholderTextColor={TEXT_MID}
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.85}
            onPress={() => setShowAddForm(!showAddForm)}
          >
            <MaterialCommunityIcons name={showAddForm ? 'close' : 'account-plus-outline'} size={18} color={WHITE} />
          </TouchableOpacity>
        </View>

        {/* ── FORMULARIO AGREGAR USUARIO ── */}
        {showAddForm && (
          <View style={styles.addForm}>
            <Text style={styles.addFormTitle}>{'Nuevo usuario'}</Text>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.fieldLabel}>{'Nombre'}</Text>
              <TextInput
                value={newUser.name}
                onChangeText={t => setNewUser(prev => ({ ...prev, name: t }))}
                style={styles.fieldInput}
                placeholder="Nombre completo"
                placeholderTextColor={TEXT_MID}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.fieldLabel}>{'Correo'}</Text>
              <TextInput
                value={newUser.email}
                onChangeText={t => setNewUser(prev => ({ ...prev, email: t }))}
                style={styles.fieldInput}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={TEXT_MID}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.fieldLabel}>{'Rol'}</Text>
              <View style={styles.roleRow}>
                {(['Usuario', 'Administrador'] as Role[]).map(r => (
                  <TouchableOpacity
                    key={r}
                    onPress={() => setNewUser(prev => ({ ...prev, role: r }))}
                    style={[styles.roleChip, newUser.role === r && styles.roleChipActive]}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.roleChipText, newUser.role === r && styles.roleChipTextActive]}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.addFormBtn} activeOpacity={0.85} onPress={handleAddUser}>
              <MaterialCommunityIcons name="check" size={15} color={WHITE} />
              <Text style={styles.addFormBtnText}>{'Crear usuario'}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── FILTROS DE ESTADO ── */}
        <View style={styles.filterRow}>
          {STATUS_FILTERS.map(f => {
            const active = statusFilter === f
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setStatusFilter(f)}
                style={[styles.filterChip, active && styles.filterChipActive]}
                activeOpacity={0.85}
              >
                <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{f}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* ── LISTA DE USUARIOS ── */}
        <View style={styles.listSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{'Lista de usuarios'}</Text>
            <Text style={styles.resultsCount}>{`${filteredUsers.length} resultados`}</Text>
          </View>

          {filteredUsers.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="account-search-outline" size={32} color={SUBTLE} />
              <Text style={styles.emptyStateText}>{'No encontramos usuarios con estos filtros'}</Text>
            </View>
          ) : (
            <FlatList
              data={filteredUsers}
              keyExtractor={item => item.id}
              renderItem={renderUser}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 12 }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default Interfaz_Administrador_usuarios

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

  // STATS
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 14,
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

  // SEARCH + ADD
  searchSection: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 18,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 16,
    paddingHorizontal: 14,
    gap: 8,
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: TEXT_DARK,
    fontSize: 13,
    paddingVertical: 12,
  },
  addBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ADD FORM
  addForm: {
    marginHorizontal: 16,
    marginTop: 12,
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
  addFormTitle: {
    color: TEXT_DARK,
    fontSize: 14,
    fontWeight: 'bold',
  },
  addFormBtn: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingVertical: 12,
  },
  addFormBtnText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },

  fieldLabel: {
    color: TEXT_MID,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: OFF_WHITE,
    borderWidth: 1,
    borderColor: SUBTLE,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: TEXT_DARK,
    fontSize: 13,
  },

  roleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  roleChip: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: OFF_WHITE,
    borderWidth: 1,
    borderColor: SUBTLE,
    borderRadius: 10,
    paddingVertical: 10,
  },
  roleChipActive: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  roleChipText: {
    color: TEXT_MID,
    fontSize: 11,
    fontWeight: '600',
  },
  roleChipTextActive: {
    color: WHITE,
  },

  // FILTERS
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 18,
  },
  filterChip: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: SUBTLE,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: BG,
    borderColor: BG,
  },
  filterChipText: {
    color: TEXT_MID,
    fontSize: 11,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: WHITE,
  },

  // LIST
  listSection: {
    marginTop: 22,
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
  resultsCount: {
    color: TEXT_MID,
    fontSize: 11,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyStateText: {
    color: TEXT_MID,
    fontSize: 12,
    textAlign: 'center',
  },

  // USER CARD
  userCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: SUBTLE,
    padding: 14,
    marginTop: 12,
    shadowColor: '#0d1b3e',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  userTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: `${BLUE}18`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: BLUE,
    fontSize: 13,
    fontWeight: 'bold',
  },
  userName: {
    color: TEXT_DARK,
    fontSize: 13,
    fontWeight: 'bold',
  },
  userEmail: {
    color: TEXT_MID,
    fontSize: 10,
    marginTop: 2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderWidth: 1,
  },
  statusPillGreen: {
    backgroundColor: `${GREEN}14`,
    borderColor: `${GREEN}44`,
  },
  statusPillRed: {
    backgroundColor: `${RED}14`,
    borderColor: `${RED}44`,
  },
  dotStatus: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusPillText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  roleBadge: {
    backgroundColor: `${PURPLE}14`,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  roleBadgeText: {
    color: PURPLE,
    fontSize: 9,
    fontWeight: 'bold',
  },

  // EXPANDED AREA
  expandedArea: {
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: SUBTLE,
    marginVertical: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: {
    color: TEXT_MID,
    fontSize: 11,
    fontWeight: '500',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  statusToggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: OFF_WHITE,
    borderWidth: 1,
    borderColor: SUBTLE,
    borderRadius: 10,
    paddingVertical: 10,
  },
  statusToggleBtnText: {
    color: TEXT_DARK,
    fontSize: 11,
    fontWeight: 'bold',
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: BG,
    borderRadius: 10,
    paddingVertical: 10,
  },
  deleteBtn: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${RED}14`,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${RED}33`,
  },
  cancelBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: OFF_WHITE,
    borderWidth: 1,
    borderColor: SUBTLE,
    borderRadius: 10,
    paddingVertical: 10,
  },
  cancelBtnText: {
    color: TEXT_MID,
    fontSize: 11,
    fontWeight: 'bold',
  },
  saveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: GREEN,
    borderRadius: 10,
    paddingVertical: 10,
  },
  saveBtnText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: 'bold',
  },
  deleteConfirmBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: RED,
    borderRadius: 10,
    paddingVertical: 10,
  },

  confirmDeleteBox: {
    backgroundColor: `${RED}0d`,
    borderWidth: 1,
    borderColor: `${RED}33`,
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
  },
  confirmDeleteText: {
    color: TEXT_MID,
    fontSize: 11,
    marginTop: 6,
    lineHeight: 15,
  },
})