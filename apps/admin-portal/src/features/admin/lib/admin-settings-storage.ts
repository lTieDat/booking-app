import {
  adminSettingsFormSchema,
  defaultAdminSettings,
  type AdminSettingsFormValues,
} from '../dto/admin-settings.dto';

export const ADMIN_SETTINGS_STORAGE_KEY = 'booking.admin.workspace-settings.v1';

export function readStoredAdminSettings(): AdminSettingsFormValues {
  if (typeof window === 'undefined') {
    return defaultAdminSettings;
  }

  const rawValue = window.localStorage.getItem(ADMIN_SETTINGS_STORAGE_KEY);
  if (!rawValue) {
    return defaultAdminSettings;
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    const result = adminSettingsFormSchema.safeParse(parsed);
    return result.success ? result.data : defaultAdminSettings;
  } catch {
    return defaultAdminSettings;
  }
}
