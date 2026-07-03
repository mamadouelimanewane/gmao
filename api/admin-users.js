import { createClient } from '@supabase/supabase-js';

function admin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function initials(name) {
  return name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ error: 'Non authentifié' });
    return;
  }

  const sb = admin();
  const { data: userData, error: userErr } = await sb.auth.getUser(token);
  if (userErr || !userData?.user) {
    res.status(401).json({ error: 'Session invalide' });
    return;
  }

  const { data: callerProfile } = await sb.from('profiles').select('role').eq('id', userData.user.id).single();
  if (!callerProfile || callerProfile.role !== 'admin') {
    res.status(403).json({ error: 'Accès réservé aux administrateurs' });
    return;
  }

  const { action } = req.body || {};

  try {
    if (action === 'create') {
      const { name, email, password, role, dept, lang } = req.body;
      if (!name || !email || !password || !role || !dept) {
        res.status(400).json({ error: 'Champs manquants (nom, email, mot de passe, rôle, département)' });
        return;
      }
      if (password.length < 6) {
        res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
        return;
      }
      const { data: created, error: createErr } = await sb.auth.admin.createUser({
        email, password, email_confirm: true,
      });
      if (createErr) { res.status(400).json({ error: createErr.message }); return; }

      const { error: profileErr } = await sb.from('profiles').insert({
        id: created.user.id, name, email, role, dept,
        avatar: initials(name), lang: lang || 'fr',
      });
      if (profileErr) {
        await sb.auth.admin.deleteUser(created.user.id);
        res.status(400).json({ error: profileErr.message });
        return;
      }
      res.status(200).json({ ok: true, id: created.user.id });
      return;
    }

    if (action === 'update') {
      const { id, role, dept, name } = req.body;
      if (!id) { res.status(400).json({ error: 'id requis' }); return; }
      const patch = {};
      if (role) patch.role = role;
      if (dept) patch.dept = dept;
      if (name) { patch.name = name; patch.avatar = initials(name); }
      const { error: updErr } = await sb.from('profiles').update(patch).eq('id', id);
      if (updErr) { res.status(400).json({ error: updErr.message }); return; }
      res.status(200).json({ ok: true });
      return;
    }

    if (action === 'delete') {
      const { id } = req.body;
      if (!id) { res.status(400).json({ error: 'id requis' }); return; }
      if (id === userData.user.id) {
        res.status(400).json({ error: 'Impossible de supprimer votre propre compte' });
        return;
      }
      const { error: delErr } = await sb.auth.admin.deleteUser(id);
      if (delErr) { res.status(400).json({ error: delErr.message }); return; }
      res.status(200).json({ ok: true });
      return;
    }

    res.status(400).json({ error: 'Action inconnue' });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Erreur serveur' });
  }
}
