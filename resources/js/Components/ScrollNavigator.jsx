import { useEffect, useState } from 'react'

function ScrollButton({ onClick, direction, label, visible }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={`group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/82 text-text-muted shadow-[0_16px_36px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:text-primary ${
                visible ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2'
            }`}
        >
            <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={direction === 'up' ? 'M7.5 15l4.5-4.5 4.5 4.5' : 'M16.5 9l-4.5 4.5L7.5 9'}
                />
            </svg>
        </button>
    )
}

export default function ScrollNavigator() {
    const [scrollY, setScrollY] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)

    useEffect(() => {
        const updateScrollState = () => {
            const currentY = window.scrollY
            const availableScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
            setScrollY(currentY)
            setMaxScroll(availableScroll)
        }

        updateScrollState()
        window.addEventListener('scroll', updateScrollState, { passive: true })
        window.addEventListener('resize', updateScrollState)

        return () => {
            window.removeEventListener('scroll', updateScrollState)
            window.removeEventListener('resize', updateScrollState)
        }
    }, [])

    const canScroll = maxScroll > 240
    const showUp = canScroll && scrollY > 220
    const showDown = canScroll && scrollY < maxScroll - 220

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const scrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }

    return (
        <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
            <ScrollButton onClick={scrollToTop} direction="up" label="Monter en haut" visible={showUp} />
            <ScrollButton onClick={scrollToBottom} direction="down" label="Descendre en bas" visible={showDown} />
        </div>
    )
}
