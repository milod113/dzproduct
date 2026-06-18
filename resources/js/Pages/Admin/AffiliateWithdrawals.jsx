import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { useState } from 'react'

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
    sky: 'from-sky-50 to-white text-sky-700 border-sky-200/50',
    emerald: 'from-emerald-50 to-white text-emerald-700 border-emerald-200/50',
    rose: 'from-rose-50 to-white text-rose-700 border-rose-200/50',
    violet: 'from-violet-50 to-white text-violet-700 border-violet-200/50',
  }

  const iconBg = {
    slate: 'bg-slate-100 text-slate-600',
    amber: 'bg-amber-100 text-amber-600',
    sky: 'bg-sky-100 text-sky-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    rose: 'bg-rose-100 text-rose-600',
    violet: 'bg-violet-100 text-violet-600',
  }

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all hover:shadow-md ${colorMap[color]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
          <p className={`mt-2 text-3xl font-bold tracking-tight text-slate-900`}>{value}</p>
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

function StatusBadge({ status }) {
  const config = {
    pending: { label: 'Pending', variant: 'warning', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
    approved: { label: 'Approved', variant: 'info', icon: 'M4.5 12.75l6 6 9-13.5' },
    paid: { label: 'Paid', variant: 'success', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    rejected: { label: 'Rejected', variant: 'danger', icon: 'M6 18L18 6M6 6l12 12' },
  }
  const { label, variant, icon } = config[status] || config.pending
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
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm hover:shadow-md',
    warning: 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm hover:shadow-md',
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

// --- Main Component ---
export default function AffiliateWithdrawals({ withdrawals = [], stats }) {
  const [expandedId, setExpandedId] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredWithdrawals = withdrawals.filter(w => {
    const matchesStatus = filterStatus === 'all' ? true : w.status === filterStatus
    const matchesSearch = w.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         w.seller.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'paid', label: 'Paid' },
    { value: 'rejected', label: 'Rejected' },
  ]

  // Action Button Component (moved inside for access to useForm)
  function ActionButton({ withdrawalId, status, label, variant = 'primary', size = 'sm' }) {
    const { patch, processing } = useForm({
      status,
      admin_notes: '',
    })

    const submit = () => {
      patch(route('admin.affiliate-withdrawals.update', withdrawalId), {
        preserveScroll: true,
      })
    }

    return (
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={submit}
        loading={processing}
      >
        {label}
      </Button>
    )
  }

  const statIcons = {
    pending: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    approved: 'M4.5 12.75l6 6 9-13.5',
    paid: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    rejected: 'M6 18L18 6M6 6l12 12',
  }

  return (
    <AdminLayout>
      <Head title="Affiliate Withdrawals" />

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
                  <Badge variant="warning" className="mb-4">Affiliate Administration</Badge>
                  <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                    Withdrawal Management
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
                    Review affiliate withdrawal requests, validate payments, and track disbursed amounts.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-3 min-w-[280px]">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Requests</p>
                    <p className="mt-1 text-xl font-bold text-white">{stats.total}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Pending</p>
                    <p className="mt-1 text-xl font-bold text-amber-300">{stats.pending}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">To Pay</p>
                    <p className="mt-1 text-xl font-bold text-sky-300">{Number(stats.pendingAmount || 0).toLocaleString('fr-DZ')} DZD</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Paid</p>
                    <p className="mt-1 text-xl font-bold text-emerald-300">{Number(stats.paidAmount || 0).toLocaleString('fr-DZ')} DZD</p>
                  </div>
                </div>
              </div>
            </div>
          </Surface>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              label="Pending" 
              value={stats.pending} 
              icon={statIcons.pending}
              color="amber"
              trend={12}
            />
            <StatCard 
              label="Approved" 
              value={stats.approved} 
              icon={statIcons.approved}
              color="sky"
              trend={8}
            />
            <StatCard 
              label="Paid" 
              value={stats.paid} 
              icon={statIcons.paid}
              color="emerald"
              trend={15}
            />
            <StatCard 
              label="Rejected" 
              value={stats.rejected} 
              icon={statIcons.rejected}
              color="rose"
              trend={-3}
            />
          </div>

          {/* Withdrawals List */}
          <Surface className="overflow-hidden">
            {/* Header with Filters */}
            <div className="border-b border-slate-200/80 px-6 py-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Withdrawal Requests</h2>
                  <p className="text-sm text-slate-500">
                    {filteredWithdrawals.length} request{filteredWithdrawals.length > 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-[160px]">
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

            {filteredWithdrawals.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">No withdrawal requests</h3>
                <p className="mt-2 text-sm text-slate-500">Future requests from affiliates will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200/80">
                {filteredWithdrawals.map((withdrawal) => {
                  const isExpanded = expandedId === withdrawal.id
                  const paymentMethods = {
                    ccp: 'CCP',
                    baridimob: 'BaridiMob',
                    bank_transfer: 'Bank Transfer',
                  }

                  return (
                    <div key={withdrawal.id} className="px-6 py-5 transition-colors hover:bg-slate-50/50">
                      <div className="flex flex-col gap-4">
                        {/* Main Row */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          {/* Info Grid */}
                          <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Affiliate */}
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Affiliate</p>
                              <div className="mt-2 flex items-center gap-2">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                                  {String(withdrawal.seller.name).charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">{withdrawal.seller.name}</p>
                                  <p className="text-xs text-slate-500">{withdrawal.seller.email}</p>
                                </div>
                              </div>
                              {withdrawal.seller.phone && (
                                <p className="mt-1 text-xs text-slate-400">{withdrawal.seller.phone}</p>
                              )}
                            </div>

                            {/* Payment */}
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Payment</p>
                              <p className="mt-2 text-sm font-semibold text-slate-900">
                                {paymentMethods[withdrawal.payment_method] || withdrawal.payment_method}
                              </p>
                              <p className="mt-1 whitespace-pre-line text-xs text-slate-500">{withdrawal.account_info}</p>
                            </div>

                            {/* Amount */}
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Amount</p>
                              <p className="mt-2 text-xl font-bold text-emerald-600">
                                {Number(withdrawal.amount).toLocaleString('fr-DZ')} DZD
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                Requested {withdrawal.created_at}
                              </p>
                            </div>

                            {/* Status */}
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Status</p>
                              <div className="mt-2">
                                <StatusBadge status={withdrawal.status} />
                              </div>
                              {withdrawal.processed_at && (
                                <p className="mt-2 text-xs text-slate-400">
                                  Processed {withdrawal.processed_at}
                                  {withdrawal.processed_by_name && ` by ${withdrawal.processed_by_name}`}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end">
                            {withdrawal.status === 'pending' && (
                              <>
                                <ActionButton 
                                  withdrawalId={withdrawal.id} 
                                  status="approved" 
                                  label="Approve" 
                                  variant="success"
                                  size="sm"
                                />
                                <ActionButton 
                                  withdrawalId={withdrawal.id} 
                                  status="rejected" 
                                  label="Reject" 
                                  variant="danger"
                                  size="sm"
                                />
                              </>
                            )}
                            {withdrawal.status === 'approved' && (
                              <>
                                <ActionButton 
                                  withdrawalId={withdrawal.id} 
                                  status="paid" 
                                  label="Mark as Paid" 
                                  variant="primary"
                                  size="sm"
                                />
                                <ActionButton 
                                  withdrawalId={withdrawal.id} 
                                  status="rejected" 
                                  label="Reject" 
                                  variant="danger"
                                  size="sm"
                                />
                              </>
                            )}
                            {(withdrawal.notes || withdrawal.admin_notes) && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandedId(isExpanded ? null : withdrawal.id)}
                              >
                                {isExpanded ? 'Hide Notes' : 'Show Notes'}
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Expanded Notes */}
                        {isExpanded && (withdrawal.notes || withdrawal.admin_notes) && (
                          <div className="mt-4 space-y-3 border-t border-slate-200/60 pt-4">
                            {withdrawal.notes && (
                              <div className="rounded-xl border border-slate-200/60 bg-slate-50/80 px-4 py-3 text-sm">
                                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Affiliate Note</p>
                                <p className="mt-1.5 whitespace-pre-line text-slate-600">{withdrawal.notes}</p>
                              </div>
                            )}
                            {withdrawal.admin_notes && (
                              <div className="rounded-xl border border-sky-200/60 bg-sky-50/80 px-4 py-3 text-sm">
                                <p className="text-[10px] font-medium uppercase tracking-wider text-sky-500">Admin Note</p>
                                <p className="mt-1.5 whitespace-pre-line text-sky-800">{withdrawal.admin_notes}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Footer with Pagination Info */}
            {filteredWithdrawals.length > 0 && (
              <div className="border-t border-slate-200/80 px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    Showing {filteredWithdrawals.length} of {withdrawals.length} requests
                  </p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="secondary" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Surface>
        </div>
      </div>
    </AdminLayout>
  )
}