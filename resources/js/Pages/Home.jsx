import { usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import HeroSection from '@/Components/HeroSection'
import StatsSection from '@/Components/StatsSection'
import CategoriesSection from '@/Components/CategoriesSection'
import FeaturesSection from '@/Components/FeaturesSection'
import TestimonialsSection from '@/Components/TestimonialsSection'
import CTABanner from '@/Components/CTABanner'
import StudentSpaceSection from '@/Components/StudentSpaceSection'

export default function Home() {
    const { categories, studentSpace } = usePage().props

    return (
        <AppLayout>
            <HeroSection />
            <StatsSection />
            <StudentSpaceSection studentSpace={studentSpace} />
            <CategoriesSection categories={categories} />
            <FeaturesSection />
            <TestimonialsSection />
            <CTABanner />
        </AppLayout>
    )
}
