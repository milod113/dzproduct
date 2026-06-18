import { useEffect, useMemo, useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'

// --- Modern Surface Component ---
function Surface({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-white/80 backdrop-blur-xl border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
    glass: 'bg-white/40 backdrop-blur-2xl border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.04)]',
    dark: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.2)]',
  }
  return (
    <section className={`rounded-3xl border ${variants[variant]} ${className}`}>
      {children}
    </section>
  )
}

// --- Modern Stat Card ---
function StatCard({ label, value, icon, hint, trend, trendValue, color = 'indigo' }) {
  const colorMap = {
    indigo: 'from-indigo-50 to-white text-indigo-700 border-indigo-100/50',
    emerald: 'from-emerald-50 to-white text-emerald-700 border-emerald-100/50',
    amber: 'from-amber-50 to-white text-amber-700 border-amber-100/50',
    sky: 'from-sky-50 to-white text-sky-700 border-sky-100/50',
    rose: 'from-rose-50 to-white text-rose-700 border-rose-100/50',
    violet: 'from-violet-50 to-white text-violet-700 border-violet-100/50',
  }

  const iconBg = {
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
    sky: 'bg-sky-100 text-sky-600',
    rose: 'bg-rose-100 text-rose-600',
    violet: 'bg-violet-100 text-violet-600',
  }

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all hover:shadow-md ${colorMap[color]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
          {trend && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
              <span className="text-xs text-slate-400">{trendValue || 'vs last month'}</span>
            </div>
          )}
        </div>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg[color]}`}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </div>
      </div>
    </div>
  )
}

// --- Modern Badge ---
function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    info: 'bg-sky-100 text-sky-700 border-sky-200',
    danger: 'bg-rose-100 text-rose-700 border-rose-200',
    purple: 'bg-violet-100 text-violet-700 border-violet-200',
    gold: 'bg-amber-100 text-amber-700 border-amber-200',
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

// --- Modern Status Badge ---
function StatusBadge({ status }) {
  const config = {
    active: { label: 'Active', variant: 'success', icon: 'M4.5 12.75l6 6 9-13.5' },
    expired: { label: 'Expired', variant: 'danger', icon: 'M6 18L18 6M6 6l12 12' },
    pending: { label: 'Pending', variant: 'warning', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
  }
  const { label, variant, icon } = config[status] || config.active
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-${variant}-50 text-${variant}-700 border border-${variant}-200/50`}>
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {label}
    </span>
  )
}

// --- Plan Badge ---
function PlanBadge({ plan }) {
  const config = {
    elite: { label: 'Elite', variant: 'gold' },
    pro: { label: 'Pro', variant: 'purple' },
    starter: { label: 'Starter', variant: 'default' },
  }
  const { label, variant } = config[plan] || config.starter
  return <Badge variant={variant}>{label}</Badge>
}

// --- Modern Input ---
function Input({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium tracking-wide text-slate-600">{label}</label>}
      <input
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-500"
      />
    </div>
  )
}

// --- Modern Select ---
function Select({ label, options, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium tracking-wide text-slate-600">{label}</label>}
      <select
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

// --- Modern Textarea ---
function Textarea({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium tracking-wide text-slate-600">{label}</label>}
      <textarea
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  )
}

// --- Modern Button ---
function Button({ children, variant = 'primary', loading, className = '', ...props }) {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  }
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {loading ? (
        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : children}
    </button>
  )
}

// --- Main Component ---
export default function AdminSellers() {
  const { sellers = [], sellerStats, topPerformers = [] } = usePage().props
  const [selectedSellerId, setSelectedSellerId] = useState(sellers[0]?.id ?? null)
  const [planFilter, setPlanFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSellers = useMemo(() => {
    return sellers.filter((seller) => {
      const matchesPlan = planFilter === 'all' ? true : seller.seller_plan === planFilter
      const matchesStatus = (() => {
        if (statusFilter === 'expired') return seller.is_plan_expired
        if (statusFilter === 'pending') return seller.has_pending_validation
        if (statusFilter === 'top') return topPerformers.some((p) => p.id === seller.id)
        return true
      })()
      const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           seller.email.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesPlan && matchesStatus && matchesSearch
    })
  }, [planFilter, sellers, statusFilter, topPerformers, searchQuery])

  const selectedSeller = useMemo(() => {
    return filteredSellers.find((s) => s.id === selectedSellerId) ||
      sellers.find((s) => s.id === selectedSellerId) ||
      filteredSellers[0] || sellers[0] || null
  }, [filteredSellers, selectedSellerId, sellers])

  const form = useForm({
    name: '', email: '', phone: '', wilaya: '', bio: '',
    seller_plan: 'starter', whatsapp_cta_text: '',
    is_verified_seller: false, is_top_rated_seller: false, is_official_partner: false,
  })

  const messageForm = useForm({ subject: '', message: '' })

  useEffect(() => {
    if (!selectedSeller) return
    setSelectedSellerId(selectedSeller.id)
    form.setData({
      name: selectedSeller.name || '',
      email: selectedSeller.email || '',
      phone: selectedSeller.phone || '',
      wilaya: selectedSeller.wilaya || '',
      bio: selectedSeller.bio || '',
      seller_plan: selectedSeller.seller_plan || 'starter',
      whatsapp_cta_text: selectedSeller.whatsapp_cta_text || '',
      is_verified_seller: selectedSeller.badges?.is_verified_seller ?? false,
      is_top_rated_seller: selectedSeller.badges?.is_top_rated_seller ?? false,
      is_official_partner: selectedSeller.badges?.is_official_partner ?? false,
    })
    messageForm.reset()
  }, [selectedSeller])

  const submit = (e) => { e.preventDefault(); if (selectedSeller) form.patch(`/admin/vendeurs/${selectedSeller.id}`) }
  const sendMessage = (e) => { e.preventDefault(); if (selectedSeller) messageForm.post(`/admin/vendeurs/${selectedSeller.id}/messages`, { preserveScroll: true, onSuccess: () => messageForm.reset() }) }

  const statIcons = {
    total: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    starter: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    pro: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    elite: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    expired: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z',
    pending: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  }

  const statCards = [
    { label: 'Total Sellers', value: sellerStats?.total ?? 0, icon: statIcons.total, hint: 'registered on platform', color: 'indigo', trend: 12 },
    { label: 'Starter', value: sellerStats?.starter ?? 0, icon: statIcons.starter, hint: 'free plan', color: 'sky', trend: -3 },
    { label: 'Pro', value: sellerStats?.pro ?? 0, icon: statIcons.pro, hint: 'premium plan', color: 'violet', trend: 8 },
    { label: 'Elite', value: sellerStats?.elite ?? 0, icon: statIcons.elite, hint: 'exclusive plan', color: 'amber', trend: 15 },
    { label: 'Expired', value: sellerStats?.expired ?? 0, icon: statIcons.expired, hint: 'need renewal', color: 'rose', trend: -5 },
    { label: 'Pending', value: sellerStats?.pendingValidation ?? 0, icon: statIcons.pending, hint: 'awaiting validation', color: 'amber' },
  ]

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'expired', label: 'Expired' },
    { value: 'pending', label: 'Pending' },
    { value: 'top', label: 'Top Performers' },
  ]

  const planOptions = [
    { value: 'all', label: 'All Plans' },
    { value: 'starter', label: 'Starter' },
    { value: 'pro', label: 'Pro' },
    { value: 'elite', label: 'Elite' },
  ]

  return (
    <AdminLayout title="Manage Sellers">
      {/* Hero Header */}
      <Surface variant="dark" className="relative mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-amber-500/10" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative px-8 py-12 md:px-12 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge variant="gold" className="mb-4">Administration</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Sellers Management</h1>
              <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
                Supervise seller profiles, manage plans, badges, and validations from a centralized dashboard.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 min-w-[240px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Avg. Plan</p>
                <p className="mt-1 text-xl font-bold capitalize text-white">{sellerStats?.mostCommonPlan ?? '-'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Active</p>
                <p className="mt-1 text-xl font-bold text-white">{(sellerStats?.total ?? 0) - (sellerStats?.expired ?? 0)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Top</p>
                <p className="mt-1 text-xl font-bold text-white">{topPerformers.length}</p>
              </div>
            </div>
          </div>
        </div>
      </Surface>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Filters */}
          <Surface className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">Filters</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">Find Sellers</h2>
                <p className="text-sm text-slate-500">Filter by plan, status, or search by name.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="min-w-[160px]">
                  <Select
                    label="Plan"
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    options={planOptions}
                  />
                </div>
                <div className="min-w-[160px]">
                  <Select
                    label="Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    options={statusOptions}
                  />
                </div>
                <div className="min-w-[200px]">
                  <Input
                    placeholder="Search sellers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Surface>

          {/* Seller Table */}
          <Surface className="overflow-hidden p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">Directory</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">Sellers List</h2>
                <p className="text-sm text-slate-500">{filteredSellers.length} sellers displayed</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 pb-3 text-left font-medium text-slate-600">Seller</th>
                    <th className="px-4 pb-3 text-left font-medium text-slate-600 hidden md:table-cell">Plan</th>
                    <th className="px-4 pb-3 text-left font-medium text-slate-600 hidden lg:table-cell">Status</th>
                    <th className="px-4 pb-3 text-right font-medium text-slate-600">Sales</th>
                    <th className="px-4 pb-3 text-right font-medium text-slate-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSellers.length ? filteredSellers.map((seller, index) => {
                    const status = seller.is_plan_expired ? 'expired' : seller.has_pending_validation ? 'pending' : 'active'
                    return (
                      <tr key={seller.id} className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                              {String(seller.name).charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{seller.name}</p>
                              <p className="text-xs text-slate-500">{seller.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <PlanBadge plan={seller.seller_plan} />
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <StatusBadge status={status} />
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900">{seller.total_sales}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedSellerId(seller.id)}
                            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                              selectedSeller?.id === seller.id
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                            }`}
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    )
                  }) : (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-sm text-slate-500">No sellers match your filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Surface>

          {/* Top Performers */}
          <Surface className="p-6">
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">Ranking</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">Top Performers</h2>
              <p className="text-sm text-slate-500">Based on sales, ratings, and estimated revenue.</p>
            </div>

            <div className="space-y-3">
              {topPerformers.map((seller, index) => (
                <button
                  key={seller.id}
                  type="button"
                  onClick={() => setSelectedSellerId(seller.id)}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200/60 bg-white/50 p-4 text-left transition-all hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-base font-bold text-indigo-600">
                    #{index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">{seller.name}</p>
                    <p className="text-xs text-slate-500">{seller.total_sales} sales · {seller.estimated_revenue.toLocaleString('fr-DZ')} DZD est.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">{seller.performance_score}</p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Score</p>
                  </div>
                </button>
              ))}
            </div>
          </Surface>
        </div>

        {/* Right Column - Seller Detail */}
        <Surface className="p-6">
          {selectedSeller ? (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">Profile</p>
                  <PlanBadge plan={selectedSeller.seller_plan} />
                </div>
                <h2 className="mt-1 text-xl font-bold text-slate-900">{selectedSeller.name}</h2>
                <p className="text-sm text-slate-500">Manage seller profile and marketplace status.</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Products', value: selectedSeller.products_count, icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
                  { label: 'Sales', value: selectedSeller.total_sales, icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' },
                  { label: 'Revenue', value: `${selectedSeller.estimated_revenue.toLocaleString('fr-DZ')} DZD`, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2' },
                  { label: 'Rating', value: `${selectedSeller.average_rating}/5`, icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3">
                    <div className="flex items-center gap-2">
                      <svg className="h-3.5 w-3.5 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{item.label}</p>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Alerts */}
              {(selectedSeller.is_plan_expired || selectedSeller.has_pending_validation) && (
                <div className="rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 text-sm">
                  {selectedSeller.is_plan_expired && <p className="text-amber-800">⚠️ The seller plan has expired and needs renewal.</p>}
                  {selectedSeller.has_pending_validation && <p className={selectedSeller.is_plan_expired ? 'mt-2' : 'text-amber-800'}>{selectedSeller.pending_validation_label}</p>}
                </div>
              )}

              {/* Edit Form */}
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Name" type="text" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                  <Input label="Email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Phone" type="text" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} />
                  <Input label="Wilaya" type="text" value={form.data.wilaya} onChange={(e) => form.setData('wilaya', e.target.value)} />
                </div>
                <Textarea label="Bio" rows={3} value={form.data.bio} onChange={(e) => form.setData('bio', e.target.value)} />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Seller Plan"
                    value={form.data.seller_plan}
                    onChange={(e) => form.setData('seller_plan', e.target.value)}
                    options={[
                      { value: 'starter', label: 'Starter' },
                      { value: 'pro', label: 'Pro' },
                      { value: 'elite', label: 'Elite' },
                    ]}
                  />
                  <Input
                    label="WhatsApp CTA"
                    type="text"
                    value={form.data.whatsapp_cta_text}
                    onChange={(e) => form.setData('whatsapp_cta_text', e.target.value)}
                    disabled={form.data.seller_plan !== 'elite'}
                    placeholder="Instant Purchase"
                  />
                </div>

                <div className="space-y-2">
                  {[
                    { key: 'is_verified_seller', label: 'Verified Seller' },
                    { key: 'is_top_rated_seller', label: 'Top Rated' },
                    { key: 'is_official_partner', label: 'Official Partner' },
                  ].map((item) => (
                    <label key={item.key} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200/60 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={form.data[item.key]}
                        onChange={(e) => form.setData(item.key, e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>

                <Button type="submit" loading={form.processing} className="w-full">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Update Seller
                </Button>
              </form>

              {/* Message */}
              <div className="border-t border-slate-200 pt-6">
                <div className="mb-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">Communication</p>
                  <h3 className="text-base font-bold text-slate-900">Admin Message</h3>
                  <p className="text-sm text-slate-500">Send an internal message to the seller.</p>
                </div>

                <form onSubmit={sendMessage} className="space-y-4">
                  <Input
                    label="Subject"
                    type="text"
                    value={messageForm.data.subject}
                    onChange={(e) => messageForm.setData('subject', e.target.value)}
                    placeholder="e.g., Profile Verification"
                  />
                  {messageForm.errors.subject && <p className="text-sm text-rose-600">{messageForm.errors.subject}</p>}
                  
                  <Textarea
                    label="Message"
                    rows={4}
                    value={messageForm.data.message}
                    onChange={(e) => messageForm.setData('message', e.target.value)}
                    placeholder="Hello, please update your seller information..."
                  />
                  {messageForm.errors.message && <p className="text-sm text-rose-600">{messageForm.errors.message}</p>}
                  
                  <Button type="submit" variant="secondary" loading={messageForm.processing} className="w-full">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.75 3.75M6 12l10.5-2.25m-10.5 2.25l10.5 2.25M6 12l-2.25 10.5" />
                    </svg>
                    Send to Seller
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-200 p-10 text-center">
              <div>
                <p className="text-sm text-slate-500">No seller selected</p>
                <p className="text-xs text-slate-400 mt-1">Select a seller from the list to manage their profile</p>
              </div>
            </div>
          )}
        </Surface>
      </div>
    </AdminLayout>
  )
}