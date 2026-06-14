import AdminLayout from '@/Layouts/AdminLayout'

export default function Settings() {
    return (
        <AdminLayout title="Paramètres">
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                <p className="text-sm text-text-muted">Paramètres de la plateforme.</p>
            </div>
        </AdminLayout>
    )
}
