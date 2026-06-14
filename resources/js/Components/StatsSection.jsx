function StatItem({ value, label, icon }) {
    return (
        <div className="flex items-center gap-4 px-6 py-5">
            <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary-dark">{value}</p>
                <p className="text-sm text-text-muted">{label}</p>
            </div>
        </div>
    )
}

export default function StatsSection() {
    return (
        <section className="-mt-10 relative z-10">
            <div className="container-max">
                <div className="bg-white rounded-2xl shadow-card border border-border divide-y md:divide-y-0 md:divide-x divide-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <StatItem
                        value="25.000+"
                        label="Clients satisfaits"
                        icon={
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        }
                    />
                    <StatItem
                        value="120.000+"
                        label="Téléchargements"
                        icon={
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        }
                    />
                    <StatItem
                        value="4.9/5"
                        label="Note moyenne"
                        icon={
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        }
                    />
                    <StatItem
                        value="100%"
                        label="Sécurisé en Algérie"
                        icon={
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                        }
                    />
                </div>
            </div>
        </section>
    )
}
