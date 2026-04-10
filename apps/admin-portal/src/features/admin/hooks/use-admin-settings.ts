import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  adminSettingsFormSchema,
  type AdminSettingsFormValues,
} from '../dto/admin-settings.dto';
import { defaultAdminSettings } from '../dto/admin-settings.dto';
import { ADMIN_SETTINGS_STORAGE_KEY, readStoredAdminSettings } from '../lib/admin-settings-storage';

export function useAdminSettings() {
  const [status, setStatus] = useState<string | null>(null);
  const initialValues = useMemo(() => readStoredAdminSettings(), []);
  const form = useForm<AdminSettingsFormValues>({
    resolver: zodResolver(adminSettingsFormSchema),
    defaultValues: initialValues,
  });
  const preview = useWatch({
    control: form.control,
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  const submit = form.handleSubmit(async (values) => {
    window.localStorage.setItem(ADMIN_SETTINGS_STORAGE_KEY, JSON.stringify(values));
    setStatus('Workspace preferences saved on this device.');
  });

  const resetToDefaults = () => {
    form.reset(defaultAdminSettings);
    setStatus('Settings reset to recommended defaults. Save to persist them.');
  };

  return {
    form,
    preview,
    status,
    submit,
    resetToDefaults,
  };
}
