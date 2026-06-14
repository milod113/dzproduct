import AdminLayout from '@/Layouts/AdminLayout'

export default function BlogPosts() {
    return (
        <AdminLayout title="Articles">
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                <p className="text-sm text-text-muted">Gestion des articles de blog.</p>
            </div>
        </AdminLayout>
    )
}
