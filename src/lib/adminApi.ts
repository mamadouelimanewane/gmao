import { supabase } from './supabase';

async function call(payload: Record<string, unknown>): Promise<{ ok?: boolean; id?: string; error?: string }> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: 'Session expirée, reconnectez-vous.' };

  const res = await fetch('/api/admin-users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export interface NewUserInput {
  name: string;
  email: string;
  password: string;
  role: string;
  dept: string;
}

export const createUser = (input: NewUserInput) => call({ action: 'create', ...input });

export const updateUser = (id: string, patch: { role?: string; dept?: string; name?: string }) =>
  call({ action: 'update', id, ...patch });

export const deleteUser = (id: string) => call({ action: 'delete', id });
