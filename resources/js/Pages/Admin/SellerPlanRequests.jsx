import { useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'

// --- Modern Components ---

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

function StatCard({ label, value, icon, trend, trendValue, color = 'slate' }) {
  const colorMap = {
    slate: 'from-slate-50 to-white text-slate-700 border-slate-200/50',
    amber: 'from-amber-50 to-white text-amber-700 border-amber-200/50',
    emerald: 'from-emerald-50 to-white text-emerald-700 border-emerald-200/50',
    rose: 'from-rose-50 to-white text-rose-700 border-rose-200/50',
    sky: 'from-sky-50 to-white text-sky-700 border-sky-200/50',
    violet: 'from-violet-50 to-white text-violet-700 border-violet-200/50',
  }

  const iconBg = {
    slate: 'bg-slate-100 text-slate-600',
    amber: 'bg-amber-100 text-amber-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    rose: 'bg-rose-100 text-rose-600',
    sky: 'bg-sky-100 text-sky-600',
    violet: 'bg-violet-100 text-violet-600',
  }

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all hover:shadow-md ${colorMap[color]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
              <span className="text-xs text-slate-400">{trendValue || 'vs last month'}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg[color]}`}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    info: 'bg-sky-100 text-sky-700 border-sky-200',
    danger: 'bg-rose-100 text-rose-700 border-rose-200',
    purple: 'bg-violet-100 text-violet-700 border-violet-200',
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

function StatusBadge({ status, type = 'request' }) {
  const configs = {
    request: {
      pending: { label: 'Pending', variant: 'warning', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
      approved: { label: 'Approved', variant: 'success', icon: 'M4.5 12.75l6 6 9-13.5' },
      rejected: { label: 'Rejected', variant: 'danger', icon: 'M6 18L18 6M6 6l12 12' },
    },
    payment: {
      pending: { label: 'Pending', variant: 'warning', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
      paid: { label: 'Paid', variant: 'success', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      expired: { label: 'Expired', variant: 'default', icon: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z' },
      approved: { label: 'Approved', variant: 'info', icon: 'M4.5 12.75l6 6 9-13.5' },
    }
  }
  
  const config = configs[type][status] || configs.request.pending
  const { label, variant, icon } = config
  
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-${variant}-50 text-${variant}-700 border border-${variant}-200/50`}>
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {label}
    </span>
  )
}

function Button({ children, variant = 'primary', size = 'md', loading, className = '', ...props }) {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm hover:shadow-md',
    warning: 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm hover:shadow-md',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
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

function Input({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium tracking-wide text-slate-600">{label}</label>}
      <input
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  )
}

function Textarea({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium tracking-wide text-slate-600">{label}</label>}
      <textarea
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  )
}

// --- Plan Upgrade Badge ---
function PlanUpgradeBadge({ from, to }) {
  const planColors = {
    starter: 'bg-slate-100 text-slate-700 border-slate-200',
    pro: 'bg-violet-100 text-violet-700 border-violet-200',
    elite: 'bg-amber-100 text-amber-700 border-amber-200',
  }
  
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span className={`rounded-full border px-2.5 py-0.5 ${planColors[from] || planColors.starter}`}>
        {from}
      </span>
      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
      <span className={`rounded-full border px-2.5 py-0.5 ${planColors[to] || planColors.starter}`}>
        {to}
      </span>
    </span>
  )
}

// --- Main Component ---
export default function SellerPlanRequests() {
  const { requests = [], stats } = usePage().props
  const [selectedRequest, setSelectedRequest] = useState(requests[0] || null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const approveForm = useForm({ admin_note: '' })
  const rejectForm = useForm({ admin_note: '' })

  const filteredRequests = requests.filter(request => {
    const matchesStatus = filterStatus === 'all' ? true : request.status === filterStatus
    const matchesSearch = request.seller?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.seller?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const approve = (event) => {
    event.preventDefault()
    if (!selectedRequest) return
    approveForm.patch(`/admin/demandes-plans-vendeurs/${selectedRequest.id}/approve`)
  }

  const reject = (event) => {
    event.preventDefault()
    if (!selectedRequest) return
    rejectForm.patch(`/admin/demandes-plans-vendeurs/${selectedRequest.id}/reject`)
  }

  const statIcons = {
    total: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    pending: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    approved: 'M4.5 12.75l6 6 9-13.5',
    rejected: 'M6 18L18 6M6 6l12 12',
    expired: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z',
  }

  const statusOptions = [
    { value: 'all', label: 'All Requests' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ]

  return (
    <AdminLayout title="Seller Plan Requests">
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          
          {/* Hero Header */}
          <Surface variant="dark" className="relative mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-500/10" />
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative px-8 py-12 md:px-12 md:py-16">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <Badge variant="warning" className="mb-4">Plan Administration</Badge>
                  <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                    Plan Upgrade Requests
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
                    Review seller plan upgrade requests, validate payments, and manage plan activations.
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-3 min-w-[300px]">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Total</p>
                    <p className="mt-1 text-lg font-bold text-white">{stats?.total ?? 0}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Pending</p>
                    <p className="mt-1 text-lg font-bold text-amber-300">{stats?.pending ?? 0}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Approved</p>
                    <p className="mt-1 text-lg font-bold text-emerald-300">{stats?.approved ?? 0}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Rejected</p>
                    <p className="mt-1 text-lg font-bold text-rose-300">{stats?.rejected ?? 0}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Expired</p>
                    <p className="mt-1 text-lg font-bold text-slate-300">{stats?.expired ?? 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </Surface>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard 
              label="Total Requests" 
              value={stats?.total ?? 0} 
              icon={statIcons.total}
              color="slate"
            />
            <StatCard 
              label="Pending" 
              value={stats?.pending ?? 0} 
              icon={statIcons.pending}
              color="amber"
              trend={12}
            />
            <StatCard 
              label="Approved" 
              value={stats?.approved ?? 0} 
              icon={statIcons.approved}
              color="emerald"
              trend={8}
            />
            <StatCard 
              label="Rejected" 
              value={stats?.rejected ?? 0} 
              icon={statIcons.rejected}
              color="rose"
              trend={-3}
            />
            <StatCard 
              label="Expired" 
              value={stats?.expired ?? 0} 
              icon={statIcons.expired}
              color="slate"
            />
          </div>

          {/* Main Grid */}
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            {/* Left Column - Requests List */}
            <Surface className="overflow-hidden">
              <div className="border-b border-slate-200/80 px-6 py-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Requests</h2>
                    <p className="text-sm text-slate-500">
                      {filteredRequests.length} request{filteredRequests.length > 1 ? 's' : ''} found
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="min-w-[150px]">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="min-w-[200px]">
                      <Input
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {filteredRequests.length ? (
                  <div className="divide-y divide-slate-200/80">
                    {filteredRequests.map((request) => (
                      <button
                        key={request.id}
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className={`w-full px-6 py-4 text-left transition-all hover:bg-slate-50/80 ${
                          selectedRequest?.id === request.id ? 'bg-indigo-50/60 border-l-4 border-indigo-500' : ''
                        }`}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                                  {String(request.seller?.name || '?').charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900">{request.seller?.name || 'Unknown'}</p>
                                  <p className="text-xs text-slate-500">{request.seller?.email || 'No email'}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-1.5">
                              <StatusBadge status={request.status} type="request" />
                              <StatusBadge status={request.payment_status} type="payment" />
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <PlanUpgradeBadge from={request.current_plan} to={request.requested_plan} />
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs font-medium text-emerald-600">{request.plan_price_label}</span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{request.seller?.wilaya || 'No wilaya'}</span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{request.created_at}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-slate-900">No requests found</h3>
                    <p className="mt-1 text-sm text-slate-500">Requests will appear here when sellers apply.</p>
                  </div>
                )}
              </div>
            </Surface>

            {/* Right Column - Request Details */}
            <Surface className="p-6">
              {selectedRequest ? (
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">Request Details</p>
                      <StatusBadge status={selectedRequest.status} type="request" />
                      <StatusBadge status={selectedRequest.payment_status} type="payment" />
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">{selectedRequest.seller?.name}</h2>
                    <p className="text-sm text-slate-500">{selectedRequest.seller?.email}</p>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Plan Upgrade</p>
                      <div className="mt-1">
                        <PlanUpgradeBadge from={selectedRequest.current_plan} to={selectedRequest.requested_plan} />
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Amount</p>
                      <p className="mt-1 text-base font-bold text-emerald-600">{selectedRequest.plan_price_label}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Payment Method</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">{selectedRequest.payment_method}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Phone</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">{selectedRequest.seller?.phone || 'Not provided'}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3 col-span-2">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Payment Reference</p>
                      <p className="mt-1 text-sm font-mono text-slate-900">{selectedRequest.payment_reference || 'Not provided'}</p>
                    </div>
                  </div>

                  {/* Seller Note */}
                  {selectedRequest.seller_note && (
                    <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-4">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Seller Note</p>
                      <p className="mt-1.5 text-sm text-slate-700">{selectedRequest.seller_note}</p>
                    </div>
                  )}

                  {/* Payment Proof */}
                  {selectedRequest.payment_proof_url && (
                    <a
                      href={selectedRequest.payment_proof_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      View Payment Proof
                    </a>
                  )}

                  {/* Timeline */}
                  <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Timeline</p>
                    <div className="mt-2 space-y-1.5 text-sm">
                      <p className="text-slate-600">Requested: <span className="text-slate-900">{selectedRequest.created_at}</span></p>
                      {selectedRequest.paid_at && (
                        <p className="text-slate-600">Payment reported: <span className="text-slate-900">{selectedRequest.paid_at}</span></p>
                      )}
                      {selectedRequest.expires_at && (
                        <p className="text-slate-600">Scheduled expiry: <span className="text-slate-900">{selectedRequest.expires_at}</span></p>
                      )}
                      {selectedRequest.reviewed_at && (
                        <p className="text-slate-600">Reviewed: <span className="text-slate-900">{selectedRequest.reviewed_at}</span></p>
                      )}
                      {selectedRequest.reviewer_name && (
                        <p className="text-slate-600">By: <span className="text-slate-900">{selectedRequest.reviewer_name}</span></p>
                      )}
                    </div>
                  </div>

                  {/* Admin Note if exists */}
                  {selectedRequest.admin_note && (
                    <div className="rounded-xl border border-sky-200/60 bg-sky-50/80 p-4">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-sky-500">Admin Note</p>
                      <p className="mt-1.5 text-sm text-sky-800">{selectedRequest.admin_note}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {selectedRequest.status === 'pending' && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <form onSubmit={approve} className="rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-4">
                        <p className="text-sm font-bold text-emerald-800">Approve & Activate Plan</p>
                        <Textarea
                          rows={3}
                          value={approveForm.data.admin_note}
                          onChange={(event) => approveForm.setData('admin_note', event.target.value)}
                          placeholder="Optional internal note..."
                          disabled={selectedRequest.payment_status !== 'paid'}
                          className="mt-3"
                        />
                        {selectedRequest.payment_status !== 'paid' && (
                          <p className="mt-2 text-xs text-emerald-700/70">
                            ⚠️ Payment must be marked as paid before approval
                          </p>
                        )}
                        <Button
                          type="submit"
                          variant="success"
                          size="md"
                          loading={approveForm.processing}
                          disabled={selectedRequest.payment_status !== 'paid'}
                          className="mt-3 w-full"
                        >
                          Approve Request
                        </Button>
                      </form>

                      <form onSubmit={reject} className="rounded-xl border border-rose-200/60 bg-rose-50/50 p-4">
                        <p className="text-sm font-bold text-rose-800">Reject Request</p>
                        <Textarea
                          rows={3}
                          value={rejectForm.data.admin_note}
                          onChange={(event) => rejectForm.setData('admin_note', event.target.value)}
                          placeholder="Explain why the request is rejected..."
                          className="mt-3"
                        />
                        {rejectForm.errors.admin_note && (
                          <p className="mt-1.5 text-xs text-rose-600">{rejectForm.errors.admin_note}</p>
                        )}
                        <Button
                          type="submit"
                          variant="danger"
                          size="md"
                          loading={rejectForm.processing}
                          className="mt-3 w-full"
                        >
                          Reject Request
                        </Button>
                      </form>
                    </div>
                  )}

                  {selectedRequest.status !== 'pending' && (
                    <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-4 text-center">
                      <p className="text-sm font-medium text-slate-600">
                        This request has been {selectedRequest.status}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-[500px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75H5.25a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V9.75m-6 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                    <p className="mt-4 text-sm font-medium text-slate-900">No request selected</p>
                    <p className="mt-1 text-sm text-slate-500">Select a request from the list to view details</p>
                  </div>
                </div>
              )}
            </Surface>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}