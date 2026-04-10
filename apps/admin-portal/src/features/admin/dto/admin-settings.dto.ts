import { z } from 'zod';

export const adminSettingsFormSchema = z.object({
  defaultLanding: z.enum([
    '/admin/managePage/dashboard',
    '/admin/managePage/manage-booking',
    '/admin/managePage/manage-properties',
  ]),
  bookingsPerPage: z.number().int().min(5).max(50),
  autoRefreshMinutes: z.number().int().min(0).max(60),
  lowRatingThreshold: z.number().int().min(1).max(5),
  revenueView: z.enum(['gross', 'portfolio']),
  compactTables: z.boolean(),
  emailDigest: z.boolean(),
  lowRatingAlerts: z.boolean(),
  notes: z.string().trim().max(240, 'Keep notes under 240 characters'),
});

export type AdminSettingsFormValues = z.infer<typeof adminSettingsFormSchema>;

export const defaultAdminSettings: AdminSettingsFormValues = {
  defaultLanding: '/admin/managePage/dashboard',
  bookingsPerPage: 8,
  autoRefreshMinutes: 15,
  lowRatingThreshold: 3,
  revenueView: 'portfolio',
  compactTables: false,
  emailDigest: true,
  lowRatingAlerts: true,
  notes: '',
};
