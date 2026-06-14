import AdminLayout from '@/Layouts/AdminLayout'

export default function Orders() {
    return (
        <AdminLayout title="Commandes">
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                <p className="text-sm text-text-muted">Gestion des commandes.</p>
            </div>
        </AdminLayout>
    )
}
