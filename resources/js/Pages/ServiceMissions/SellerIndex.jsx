import { Link, usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

export default function SellerServiceMissionsIndex() {
    const { missions = [] } = usePage().props

    return (
        <SellerLayout title="Missions services">
            <div className="rounded-[30px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-8">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-text-dark">Missions clients</h1>
                        <p className="mt-2 text-sm text-text-muted">Gerez les briefs, la production, la livraison et les revisions.</p>
                    </div>
                    <span className="rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary">
                        {missions.length} mission{missions.length > 1 ? 's' : ''}
                    </span>
                </div>

                <div className="mt-6 grid gap-4">
                    {missions.length ? missions.map((mission) => (
                        <Link key={mission.id} href={`/vendeur/services/${mission.id}`} className="rounded-2xl border border-border bg-[#fbfcfb] p-5 transition-colors hover:border-primary/30">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-bold text-text-dark">{mission.product_name}</p>
                                    <p className="mt-1 text-xs text-text-muted">{mission.mission_number} . Client: {mission.client_name}</p>
                                </div>
                                <span className="rounded-full border border-primary/15 bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                                    {mission.status_label}
                                </span>
                            </div>
                        </Link>
                    )) : (
                        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-text-muted">
                            Aucune mission service active pour le moment.
                        </div>
                    )}
                </div>
            </div>
        </SellerLayout>
    )
}
