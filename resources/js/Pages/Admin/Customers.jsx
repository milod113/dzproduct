import AdminLayout from '@/Layouts/AdminLayout'

export default function Customers() {
    return (
        <AdminLayout title="Clients">
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                <p className="text-sm text-text-muted">Gestion des clients.</p>
            </div>
        </AdminLayout>
    )
}
