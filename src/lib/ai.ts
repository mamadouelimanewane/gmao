// src/lib/ai.ts

export interface AIContext {
  anomalies: any[];
  scheduling: any[];
  failures: any[];
}

export async function simulateAIStream(
  input: string, 
  context: AIContext, 
  onChunk: (chunk: string) => void
): Promise<string> {
  const lower = input.toLowerCase();
  let fullResponse = "";

  // 1. Détection d'intentions basée sur le RAG (Retrieval-Augmented Generation simulé)
  if (lower.includes("critique") || lower.includes("panne") || lower.includes("risque")) {
    const criticals = context.failures.filter(f => f.score >= 70).sort((a,b) => b.score - a.score);
    if (criticals.length > 0) {
      fullResponse = `🔍 **Analyse Prédictive (RAG)**\n\nJ'ai analysé les données des capteurs de votre parc. Actuellement, **${criticals.length} équipements** sont en zone critique :\n\n`;
      criticals.forEach(c => {
        fullResponse += `- **${c.name}** (Score de risque: ${c.score}/100). Panne estimée dans **${c.days} jours**.\n`;
      });
      fullResponse += `\nSouhaitez-vous que je génère automatiquement des bons d'intervention préventive pour ces équipements ?`;
    } else {
      fullResponse = `✅ Bonne nouvelle. Aucun équipement n'est actuellement en zone critique (score > 70). Votre parc est stable.`;
    }
  } 
  else if (lower.includes("stock") || lower.includes("pièce") || lower.includes("achat")) {
    fullResponse = `📦 **Analyse des Stocks (IA)**\n\nD'après les prévisions d'intervention des 14 prochains jours, vous risquez une rupture sur les éléments suivants :\n- **Filtres HEPA** (besoin de 5, stock actuel: 2)\n- **Sondes SpO2 pédiatriques** (besoin de 12, stock actuel: 1)\n\nJe vous conseille de lancez le workflow d'achat immédiatement.`;
  }
  else if (lower.includes("planning") || lower.includes("technicien") || lower.includes("optimis")) {
    const topTech = context.scheduling.sort((a,b) => b.score - a.score)[0];
    fullResponse = `📅 **Optimisation des Plannings**\n\nLe technicien le plus performant ce mois-ci est **${topTech.tech}** avec un score de ${topTech.score}%. L'algorithme a pu optimiser ses tournées en regroupant les interventions par zone géographique (économie de ${topTech.saved}).\n\nSouhaitez-vous appliquer cette optimisation à toute l'équipe ?`;
  }
  else {
    fullResponse = `🤖 **Copilot IA**\n\nJ'ai bien reçu votre requête : "${input}". \n\nEn tant qu'assistant intégré à votre GMAO, je peux analyser vos équipements en temps réel, optimiser les tournées de maintenance, surveiller vos stocks de pièces et générer des rapports KPI.\n\nComment puis-je vous aider spécifiquement aujourd'hui ?`;
  }

  // 2. Simulation d'un streaming réaliste (comme Gemini/ChatGPT)
  const chunks = fullResponse.split(/(\s+)/); // Découpage par mots pour un effet naturel
  let currentText = "";
  
  // Délai initial "Thinking..."
  await new Promise(r => setTimeout(r, 600));

  for (const chunk of chunks) {
    currentText += chunk;
    onChunk(currentText);
    // Délai aléatoire entre 10ms et 50ms pour simuler le réseau et la génération token par token
    const delay = Math.random() * 40 + 10;
    await new Promise(r => setTimeout(r, delay));
  }

  return fullResponse;
}
