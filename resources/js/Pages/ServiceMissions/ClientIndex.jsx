import { Link, usePage } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'

export default function ClientServiceMissionsIndex() {
    const { missions = [] } = usePage().props

    return (
        <ClientLayout title="Mes services">
            <div className="card p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-text-dark">Mes services reserves</h1>
                        <p className="mt-2 text-sm text-text-muted">Suivez vos briefs, revisions et livraisons de prestations.</p>
                    </div>
                    <span className="rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary">
                        {missions.length} mission{missions.length > 1 ? 's' : ''}
                    </span>
                </div>

                <div className="mt-6 grid gap-4">
                    {missions.length ? missions.map((mission) => (
                        <Link key={mission.id} href={`/mes-services/${mission.id}`} className="rounded-2xl border border-border bg-[#fbfcfb] p-5 transition-colors hover:border-primary/30">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-bold text-text-dark">{mission.product_name}</p>
                                    <p className="mt-1 text-xs text-text-muted">{mission.mission_number} . Vendeur: {mission.seller_name}</p>
                                </div>
                                <span className="rounded-full border border-primary/15 bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                                    {mission.status_label}
                                </span>
                            </div>
                        </Link>
                    )) : (
                        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-text-muted">
                            Aucune mission service pour le moment.
                        </div>
                    )}
                </div>
            </div>
        </ClientLayout>
    )
}
