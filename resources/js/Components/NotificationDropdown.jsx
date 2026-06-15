import { Link, useForm, usePage } from '@inertiajs/react'
import { useState } from 'react'

function kindTone(kind) {
    if (kind === 'seller_plan_request_submitted') {
        return 'bg-sky-50 text-sky-700 border-sky-200'
    }

    if (kind === 'seller_plan_request_reviewed') {
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }

    if (kind === 'seller_plan_expiring') {
        return 'bg-amber-50 text-amber-700 border-amber-200'
    }

    if (kind === 'service_mission') {
        return 'bg-sky-50 text-sky-700 border-sky-200'
    }

    return 'bg-slate-100 text-slate-700 border-slate-200'
}

export default function NotificationDropdown() {
    const [open, setOpen] = useState(false)
    const { props } = usePage()
    const notifications = props?.notifications?.items || []
    const unreadCount = props?.notifications?.unreadCount || 0
    const markAllForm = useForm({})
    const markOneForm = useForm({})

    const markAllRead = () => {
        markAllForm.post('/notifications/read-all', {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        })
    }

    const markRead = (id) => {
        markOneForm.post(`/notifications/${id}/read`, {
            preserveScroll: true,
        })
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-white text-text-dark transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Notifications"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.082 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-1 text-[10px] font-bold leading-none text-white">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-12 z-50 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[24px] border border-border bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
                    <div className="flex items-center justify-between border-b border-border px-4 py-4">
                        <div>
                            <p className="text-sm font-bold text-text-dark">Notifications</p>
                            <p className="mt-1 text-xs text-text-muted">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</p>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={markAllRead}
                                className="text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
                            >
                                Tout marquer lu
                            </button>
                        )}
                    </div>

                    <div className="max-h-[420px] overflow-y-auto p-3">
                        {notifications.length ? notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`mb-3 rounded-2xl border p-3 last:mb-0 ${notification.read_at ? 'bg-white' : 'bg-primary-light/20'} ${kindTone(notification.kind)}`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold">{notification.title}</p>
                                        <p className="mt-1 text-xs leading-6 opacity-90">{notification.message}</p>
                                        <p className="mt-2 text-[11px] opacity-70">{notification.created_at}</p>
                                    </div>
                                    {!notification.read_at && (
                                        <button
                                            type="button"
                                            onClick={() => markRead(notification.id)}
                                            className="shrink-0 text-[11px] font-semibold underline underline-offset-2"
                                        >
                                            Lu
                                        </button>
                                    )}
                                </div>
                                {notification.action_url && (
                                    <Link href={notification.action_url} className="mt-3 inline-flex text-xs font-semibold underline underline-offset-2">
                                        Ouvrir
                                    </Link>
                                )}
                            </div>
                        )) : (
                            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-text-muted">
                                Aucune notification pour le moment.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
