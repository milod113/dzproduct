const badgeStyles = {
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    topRated: 'bg-amber-50 text-amber-700 border-amber-200',
    official: 'bg-sky-50 text-sky-700 border-sky-200',
}

const badgeLabels = {
    verified: 'Verified Seller',
    topRated: 'Top Rated',
    official: 'Official Partner',
}

export default function SellerBadges({ seller, className = '', compact = false }) {
    if (!seller?.badges?.length) {
        return null
    }

    return (
        <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
            {seller.badges.map((badge) => (
                <span
                    key={badge}
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 font-medium ${compact ? 'text-[11px]' : 'text-xs'} ${badgeStyles[badge] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}
                >
                    {badgeLabels[badge] ?? badge}
                </span>
            ))}
        </div>
    )
}
