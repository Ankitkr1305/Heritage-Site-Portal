'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LiveNoticeTicker from '@/components/LiveNoticeTicker';
import HeroSection from '@/components/HeroSection';
import QuickPassReservationBar from '@/components/QuickPassReservationBar';
import LiveMonumentOverview from '@/components/LiveMonumentOverview';
import DestinationsExplorer from '@/components/DestinationsExplorer';
import VisitorAmenitiesGuide from '@/components/VisitorAmenitiesGuide';
import SmartSafetySection from '@/components/SmartSafetySection';
import VisitorReviewsAndTips from '@/components/VisitorReviewsAndTips';
import VisitorGuidelinesSection from '@/components/VisitorGuidelinesSection';
import dynamic from 'next/dynamic';
// Unit V: Performance & Code Splitting - Lazy Loading Heavy Modals
const PassModal = dynamic(() => import('@/components/PassModal'), { ssr: false });
const MyPassesModal = dynamic(() => import('@/components/MyPassesModal'), { ssr: false });
const LiveCommandDashboardModal = dynamic(() => import('@/components/LiveCommandDashboardModal'), { ssr: false });
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';
import { INITIAL_MONUMENTS, INITIAL_SENSORS, INITIAL_ALERTS, } from '@/data/initialData';
export default function HomePage() {
    const [monuments, setMonuments] = useState(INITIAL_MONUMENTS);
    const [sensors, setSensors] = useState(INITIAL_SENSORS);
    const [alerts, setAlerts] = useState(INITIAL_ALERTS);
    // Modals state
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingSelectedSlug, setBookingSelectedSlug] = useState('taj-mahal');
    const [bookingSelectedSlot, setBookingSelectedSlot] = useState('');
    const [bookingSelectedTier, setBookingSelectedTier] = useState('');
    const [activePass, setActivePass] = useState(null);
    const [isPassModalOpen, setIsPassModalOpen] = useState(false);
    const [isMyPassesOpen, setIsMyPassesOpen] = useState(false);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    // Load live data from API on mount
    useEffect(() => {
        async function loadLiveData() {
            try {
                const monRes = await fetch('/api/monuments');
                const monData = await monRes.json();
                if (monData.success && monData.monuments) {
                    setMonuments(monData.monuments);
                }
                const sensRes = await fetch('/api/sensors');
                const sensData = await sensRes.json();
                if (sensData.success && sensData.sensors) {
                    setSensors(sensData.sensors);
                }
                const alertRes = await fetch('/api/alerts');
                const alertData = await alertRes.json();
                if (alertData.success && alertData.alerts) {
                    setAlerts(alertData.alerts);
                }
            }
            catch (err) {
                console.warn('Using local heritage datasets');
            }
        }
        loadLiveData();
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const bookSlug = params.get('book');
            if (bookSlug) {
                setBookingSelectedSlug(bookSlug);
                setIsBookingOpen(true);
            }
        }
    }, []);
    const handleOpenBooking = (monumentSlug, slotTime, tierName) => {
        if (monumentSlug)
            setBookingSelectedSlug(monumentSlug);
        if (slotTime)
            setBookingSelectedSlot(slotTime);
        if (tierName)
            setBookingSelectedTier(tierName);
        setIsBookingOpen(true);
    };
    const handleBookingSuccess = (booking) => {
        setActivePass(booking);
        setIsPassModalOpen(true);
    };
    const handleTriggerIntervention = async (title, chokepoint, actionText) => {
        try {
            const res = await fetch('/api/alerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    chokepoint,
                    message: `Queue build-up detected at ${chokepoint}. Precautionary gate diversion active.`,
                    actionTaken: actionText || 'Electronic signs updated and marshals deployed to guide visitors.',
                    type: 'DIVERSION',
                    severity: 'high',
                }),
            });
            const data = await res.json();
            if (data.success && data.alert) {
                setAlerts((prev) => [data.alert, ...prev]);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    const handleScrollToDestination = (slug) => {
        setBookingSelectedSlug(slug);
        const el = document.getElementById('destinations');
        if (el)
            el.scrollIntoView({ behavior: 'smooth' });
    };
    return (<div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} onOpenDashboard={() => setIsDashboardOpen(true)} onOpenPasses={() => setIsMyPassesOpen(true)} activeAlertCount={alerts.length}/>

      {/* Official Real-Time Live Advisory Ticker */}
      <LiveNoticeTicker />

      {/* Hero Section */}
      <HeroSection onOpenBooking={() => handleOpenBooking()} onOpenDashboard={() => setIsDashboardOpen(true)} onExploreDestinations={() => {
            const el = document.getElementById('live-status');
            if (el)
                el.scrollIntoView({ behavior: 'smooth' });
        }}/>

      {/* Express Digital Pass Reservation Bar (Instant Checkout Widget) */}
      <QuickPassReservationBar monuments={monuments} onBookPass={(slug, slot, tier) => handleOpenBooking(slug, slot, tier)}/>

      {/* Real-time Footfall, Weather, & Gate Status Cards (With State Filtering & Search) */}
      <LiveMonumentOverview monuments={monuments} onSelectMonument={(slug) => handleScrollToDestination(slug)} onBookPass={(slug) => handleOpenBooking(slug)}/>

      {/* In-Depth Destination Explorer (History, Architecture, Tickets, Slots) */}
      <DestinationsExplorer monuments={monuments} onSelectSlotBooking={(slug, slot, tier) => handleOpenBooking(slug, slot, tier)}/>

      {/* Essential On-Site Amenities & Barrier-Free Accessibility Guide */}
      <VisitorAmenitiesGuide />

      {/* How the Safety System Works */}
      <SmartSafetySection onOpenDashboard={() => setIsDashboardOpen(true)}/>

      {/* Verified Tourist Reviews, Entrance Advice & Crowd Tips */}
      <VisitorReviewsAndTips />

      {/* Visitor Guidelines, Dos & Don'ts, Helpline FAQ */}
      <VisitorGuidelinesSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} monuments={monuments} initialSlug={bookingSelectedSlug} initialSlot={bookingSelectedSlot} initialTier={bookingSelectedTier} onBookingSuccess={handleBookingSuccess}/>

      <PassModal isOpen={isPassModalOpen} onClose={() => setIsPassModalOpen(false)} booking={activePass}/>

      <MyPassesModal isOpen={isMyPassesOpen} onClose={() => setIsMyPassesOpen(false)} onSelectPass={(pass) => {
            setActivePass(pass);
            setIsPassModalOpen(true);
        }} onBookNew={() => setIsBookingOpen(true)}/>

      <LiveCommandDashboardModal isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} sensors={sensors} alerts={alerts} onTriggerIntervention={handleTriggerIntervention}/>
    </div>);
}
