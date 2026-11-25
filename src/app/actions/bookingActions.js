'use server';
import { revalidatePath } from 'next/cache';
import { createBooking } from '@/lib/dbService';
// Unit III: Next.js Server Action with Form Data Mutation and Validation
export async function bookSlotAction(prevState, formData) {
    const monumentSlug = formData.get('monumentSlug');
    const visitorName = formData.get('visitorName');
    const email = formData.get('email');
    const phone = formData.get('phone') || '+91 99999 99999';
    const date = formData.get('date');
    const timeSlot = formData.get('timeSlot');
    const ticketTier = formData.get('ticketTier');
    const ticketCount = Number(formData.get('ticketCount')) || 1;
    // Server-side Form Validation
    const errors = {};
    if (!visitorName || visitorName.trim().length < 3) {
        errors.visitorName = 'Please enter your full name (minimum 3 characters).';
    }
    if (!email || !email.includes('@')) {
        errors.email = 'Please provide a valid email address.';
    }
    if (!date) {
        errors.date = 'Please select a visit date.';
    }
    if (!timeSlot) {
        errors.timeSlot = 'Please select a valid time-slot.';
    }
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: 'Validation failed. Please correct the highlighted errors.',
            errors,
        };
    }
    try {
        // Data Mutation in MongoDB
        const result = await createBooking({
            monumentSlug,
            visitorName,
            email,
            phone,
            date,
            timeSlot,
            ticketTier,
            ticketCount,
        });
        if (result.success) {
            // Unit II: Revalidate ISR cache for instant freshness
            revalidatePath('/');
            revalidatePath(`/monuments/${monumentSlug}`);
            return {
                success: true,
                message: 'Pass reserved successfully via Next.js Server Action!',
                booking: result.booking,
            };
        }
        else {
            return {
                success: false,
                message: 'Failed to reserve slot in database.',
            };
        }
    }
    catch (err) {
        return {
            success: false,
            message: err.message || 'Server Action execution error.',
        };
    }
}
