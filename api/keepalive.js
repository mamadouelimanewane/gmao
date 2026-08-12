import { createClient } from '@supabase/supabase-js';

// Ping quotidien (Vercel Cron, voir vercel.json) pour éviter la mise en
// veille automatique du projet Supabase gratuit après 7 jours d'inactivité.
export default async function handler(req, res) {
  try {
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await sb.from('profiles').select('id').limit(1);
    if (error) throw error;
    res.status(200).json({ ok: true, ts: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || 'Erreur serveur' });
  }
}
