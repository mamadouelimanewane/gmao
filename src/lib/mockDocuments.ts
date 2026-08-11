export const MOCK_DOCUMENTS = [
  {
    id: 'doc-1',
    title: "Manuel de service IRM Philips Ingenia 1.5T",
    type: "PDF",
    size: "14 MB",
    date: "12 Mars 2024",
    content: `
# MANUEL DE SERVICE TECHNIQUE
## Système IRM Philips Ingenia 1.5T

---

### CHAPITRE 1 : INTRODUCTION ET SÉCURITÉ
Ce manuel décrit les procédures de maintenance préventive et corrective pour le système d'Imagerie par Résonance Magnétique (IRM) Philips Ingenia 1.5T.
**ATTENTION : CONSIGNES DE SÉCURITÉ MAGNÉTIQUE**
L'aimant supraconducteur est TOUJOURS ACTIF (Always On). Le champ magnétique statique de 1.5 Tesla exerce des forces d'attraction extrêmes sur les objets ferromagnétiques.
- L'accès à la Zone 4 (salle de l'aimant) est strictement réservé au personnel habilité.
- L'utilisation d'outils amagnétiques (en titane ou béryllium) est obligatoire.
- Tout port de stimulateur cardiaque (Pacemaker) ou d'implant ferromagnétique est une contre-indication absolue pour le technicien.

### CHAPITRE 2 : SPÉCIFICATIONS TECHNIQUES
| Composant | Spécification | Tolérance |
|-----------|---------------|-----------|
| Intensité du Champ | 1.5 Tesla (63.86 MHz) | +/- 0.1 ppm |
| Homogénéité (DSV 50cm) | < 5 ppm | N/A |
| Gradient Maximum | 45 mT/m | +/- 5% |
| Slew Rate | 200 T/m/s | +/- 5% |
| Capacité Hélium Liquide | 1650 Litres | Niveau d'alerte à 40% |
| Taux d'évaporation (Boil-off) | < 0.01 L/h | Avec Cold Head fonctionnelle |

### CHAPITRE 3 : MAINTENANCE PRÉVENTIVE (PM) - PLANIFICATION
La maintenance préventive doit être effectuée tous les 6 mois (PM1) et 12 mois (PM2).

#### PM1 (Semestrielle)
1. **Inspection Visuelle :** Vérifier l'intégrité de la cage de Faraday. Contrôler les joints des portes RF (Radiofréquence). Nettoyer les contacts en cuivre avec de l'alcool isopropylique.
2. **Système de Refroidissement :**
   - Relever le niveau d'Hélium via le moniteur F2.
   - Vérifier la pression du compresseur d'eau glacée (Chiller) : 4.5 à 5.0 Bars.
3. **Tests RF :** Lancer le script de calibration \`RF_Coil_Check.sh\` depuis la console de service. Vérifier le rapport Signal/Bruit (SNR) de l'antenne Tête (Head Coil).

#### PM2 (Annuelle)
1. Exécuter toutes les tâches de la PM1.
2. **Remplacement de l'absorbeur (Adsorber) du compresseur HC-8E :**
   - Arrêter le compresseur.
   - Dépressuriser la ligne haute pression (fermer les vannes V1 et V2).
   - Remplacer la cartouche (Réf: 1000-AD-8). *Durée de vie maximale : 10 000 heures.*
3. **Vérification du Shimming :**
   - Utiliser le fantôme d'homogénéité standard (Sphère d'eau dopée au NiSO4).
   - Lancer la séquence \`B0_Map\`. Si l'écart type dépasse 5 ppm, un Active Shimming est requis.

### CHAPITRE 4 : MAINTENANCE DU SYSTÈME CRYOGÉNIQUE
L'hélium liquide (-269°C) maintient les bobines supraconductrices. Le système "Zero Boil-Off" utilise une Cold Head (Tête Froide) pour recondenser le gaz.

#### 4.1. Vérification de la Tête Froide (Cold Head)
- **Pression de retour du compresseur :** L'aiguille doit osciller entre 1.4 et 1.5 MPa à 1 Hz.
- **Acoustique :** Écouter le cycle chirping de la cold head. Un bruit métallique de martèlement indique une usure prématurée du displacer en displacium/plomb.
- **Intervention :** Si la température du bouclier thermique 50K dépasse 65K, la cold head doit être remplacée d'urgence (Code d'intervention : CH-9002A).

#### 4.2. Procédure d'urgence : QUENCH
Un Quench est la perte soudaine de la supraconductivité, entraînant l'ébullition massive de l'hélium.
- Le tuyau d'évacuation (Quench Pipe) rejette le gaz à l'extérieur du bâtiment.
- En cas de rupture du Quench Pipe, la salle se remplit de gaz blanc (risque d'asphyxie et gelure).
- **Action :** Évacuer immédiatement le patient. Casser la vitre de l'extracteur d'urgence. NE PAS ENTRER dans la salle sans masque à oxygène.

### CHAPITRE 5 : CODES D'ERREUR ET DÉPANNAGE
| Code | Description | Résolution |
|------|-------------|------------|
| **ERR_RF_001** | Amplificateur RF (RFPA) surchauffe. | Vérifier le débit d'eau du Chiller. Nettoyer les filtres à air du rack RF. Réinitialiser le disjoncteur CB3. |
| **ERR_GRAD_04** | Défaut de communication avec l'amplificateur de gradient Y. | Remplacer le câble fibre optique TX/RX entre le séquenceur et l'amplificateur Y. |
| **ERR_HEL_LOW** | Niveau d'hélium < 45%. | Alerte critique. Organiser une livraison de dewar d'hélium liquide sous 7 jours. |
| **ERR_DOOR_02** | Défaut d'étanchéité RF de la porte. | Les artefacts en "Zipper" apparaissent sur les images. Nettoyer les doigts de contact de la porte de la cage de Faraday. |

---
*Document Confidentiel - Philips Healthcare - Ne pas distribuer.*
    `
  },
  {
    id: 'doc-2',
    title: "Procédure d'étalonnage Respirateur Puritan Bennett 840",
    type: "DOCX",
    size: "2 MB",
    date: "05 Janvier 2024",
    content: `
# PROTOCOLE D'ÉTALONNAGE ET DE SÉCURITÉ
## Équipement : Respirateur de Réanimation Puritan Bennett 840

---

### 1. OBJET
Ce document détaille les procédures de vérification des performances (PV), de calibration (EST/SST) et de sécurité électrique pour le ventilateur PB 840.
**Fréquence requise :** Tous les 12 mois, ou 10 000 heures d'utilisation, ou après tout remplacement de pièce majeure (ex: BDU, GUI, compresseur).

### 2. ÉQUIPEMENT DE TEST REQUIS
Pour réaliser cette procédure, les équipements suivants sont obligatoires (avec certificats d'étalonnage valides) :
- Analyseur de débit / pression de gaz (ex: Fluke VT900 ou TSI Certifier FA Plus).
- Analyseur de sécurité électrique (ex: Fluke ESA620).
- Poumon d'essai (Test Lung) de 1000 mL avec compliance et résistance réglables.
- Bouteilles de gaz (Oxygène et Air médical) à 50 psi (3.5 Bars).

### 3. TEST DE SÉCURITÉ ÉLECTRIQUE (Norme IEC 60601-1)
*Ce test doit toujours être effectué EN PREMIER avant toute ouverture du boîtier.*
1. **Inspection physique :** Câble d'alimentation intact, fiches non tordues.
2. **Résistance de Terre (Ground Wire Resistance) :** Mesurer entre la broche de terre de la prise et le châssis métallique du compresseur. **Limite : < 0.2 Ω**.
3. **Courant de Fuite du Boîtier (Chassis Leakage) :** 
   - Polarité normale, neutre fermé : **< 100 µA**.
   - Polarité inversée, neutre ouvert (Single Fault Condition) : **< 300 µA**.

### 4. SHORT SELF TEST (SST)
Le SST teste le circuit patient et doit être fait par les infirmiers avant chaque nouveau patient. En tant que technicien, vérifiez son bon fonctionnement.
1. Connecter le circuit patient (tuyaux inspiratoire et expiratoire, filtre, Y-piece).
2. Bloquer le Y-piece (occlusion).
3. Allumer le respirateur, sélectionner "SST" sur l'écran tactile (GUI).
4. Le respirateur va tester :
   - Débitmètre (Flow Sensor).
   - Résistance du circuit.
   - Compliance du circuit.
   - Fuite du circuit.
5. **Résultat attendu :** Tous les tests affichent "PASSED". Si "Leak Test" échoue, vérifier le filtre expiratoire (Q3) ou l'humidificateur.

### 5. EXTENDED SELF TEST (EST) & CALIBRATION INTERNE
L'EST teste les composants internes du BDU (Breath Delivery Unit). L'EST requiert le bouchon de test "Gold Standard".
1. Retirer le circuit patient. Placer le bouchon de test sur le port inspiratoire et relier directement au port expiratoire avec un tube court.
2. Démarrer en mode Service (Maintenir la touche "TEST" pendant le boot).
3. Entrer le mot de passe technicien.
4. Lancer l'EST. Le test dure environ 15 minutes et couvre :
   - Test des vannes solénoïdes (PSOL).
   - Calibration du capteur d'oxygène (O2 Sensor).
   - Test des capteurs de pression expiratoire/inspiratoire.
   - Calibration de la vanne d'exhalation (EV).
5. **En cas d'échec de la calibration O2 :** Remplacer la cellule O2 galvanique. Durée de vie typique : 1 an.

### 6. VÉRIFICATION DES PERFORMANCES (Analyseur de gaz)
Une fois l'EST réussi, valider la précision des volumes délivrés.
1. Brancher l'analyseur VT900 à la sortie inspiratoire du respirateur, puis au Poumon d'essai.
2. Régler le respirateur en mode VC (Volume Contrôlé) :
   - Volume Courant (Vt) : 500 mL.
   - Fréquence (RR) : 15 bpm.
   - O2 : 21% (Air ambiant).
   - PEEP : 5 cmH2O.
3. Mesures de l'analyseur :
   - **Vt mesuré :** Doit être entre 450 mL et 550 mL (+/- 10%).
   - **PEEP mesurée :** Doit être entre 4.0 et 6.0 cmH2O.
   - **FiO2 :** Mettre le respirateur à 100% O2. L'analyseur doit lire > 97%.

### 7. CLÔTURE DE L'INTERVENTION
- Apposer l'étiquette de maintenance verte sur l'appareil.
- Renseigner l'intervention dans le logiciel de GMAO (Numéro de série, valeurs mesurées, pièces remplacées).
- Informer le chef de service de Réanimation que l'équipement est prêt à l'emploi.
    `
  },
  {
    id: 'doc-3',
    title: "Manuel de Dépannage - Défibrillateur Zoll M-Series",
    type: "PDF",
    size: "1 MB",
    date: "18 Février 2023",
    content: `
# GUIDE DE DÉPANNAGE TECHNIQUE
## Défibrillateur ZOLL M-Series - Évaluation et Réparation

---

### 1. INTRODUCTION
Le défibrillateur biphasique ZOLL M-Series est un équipement critique de survie (Life Support). Toute intervention technique doit être suivie d'un test complet de décharge sur un simulateur avant remise en service.
**DANGER : HAUTE TENSION.** Les condensateurs internes emmagasinent jusqu'à 200 Joules à plus de 2000 Volts. Une décharge mortelle est possible même après avoir éteint l'appareil. Suivez toujours la procédure de décharge manuelle des condensateurs avant d'ouvrir le boîtier principal.

### 2. MAINTENANCE RÉGULIÈRE
- **Quotidiennement (Utilisateur) :** Test de choc à 30 Joules sur le câble de test. Impression de la bande de confirmation.
- **Tous les 6 mois (Technicien) :** Vérification de l'énergie délivrée avec un analyseur de défibrillation. Test de l'ECG. Nettoyage des têtes thermiques de l'imprimante.
- **Tous les 2 ans :** Remplacement systématique de la batterie au plomb (SLA) principale.

### 3. LISTE DES CODES D'ERREURS ET ACTIONS CORRECTIVES

| Code d'Erreur | Signification | Action Corrective |
|---------------|----------------|-------------------|
| **ERR 01** | Défaut de l'auto-test au démarrage (CPU/RAM). | Éteindre l'appareil. Retirer la batterie pendant 30 secondes. Si l'erreur persiste, la carte mère (System Board) doit être changée. |
| **ERR 12** | Perte de communication avec le module d'acquisition ECG. | Ouvrir le panneau arrière. Vérifier la connexion de la nappe J14. Appliquer du spray contact. Si oxydation majeure, remplacer la carte Front-End. |
| **ERR 32** | Temps de charge trop long (Time-out). | Le système a mis plus de 10 secondes pour atteindre 200J. 1. Remplacer la batterie (elle s'écroule sous la charge). 2. Vérifier le circuit de charge haute tension (HV Charge Board). |
| **ERR 41** | Défaut du module de SpO2 (Nellcor). | Le capteur doigt est défectueux ou le câble d'extension est coupé. Tester avec un capteur neuf. |
| **ERR 44** | Panne de l'imprimante thermique intégrée. | Bourrage papier ou tête brûlée. Ouvrir la trappe papier, retirer le rouleau. Nettoyer la tête thermique noire avec un coton-tige imbibé d'alcool isopropylique à 99%. Ne jamais gratter avec un outil métallique. |
| **ERR 105** | Relais de décharge collé (Relay Sticking). | **Erreur critique.** Le relais de délivrance du choc est resté fermé. Remplacement obligatoire de la carte Haute Tension. Ne pas utiliser sur un patient. |
| **WARN 1** | Test quotidien non effectué depuis 24h. | Réaliser le test manuel à 30J (Select 30J, Charge, appuyer sur Shock avec le câble connecté à la borne de test du boîtier). |

### 4. TEST DE CALIBRATION DE L'ÉNERGIE (Avec Analyseur Impulse 7000DP)
Pour valider le défibrillateur, connecter les palettes (ou les électrodes adhésives avec adaptateur) sur l'analyseur de défibrillation.

1. Sélectionner une charge de **200 Joules** (Biphasique rectiligne).
2. Appuyer sur "Charge". Le bip continu doit se faire entendre en moins de 7 secondes (avec batterie pleine).
3. Appuyer sur "Shock" pour délivrer l'énergie dans l'analyseur.
4. L'analyseur doit mesurer l'énergie délivrée.
   - **Spécification :** L'énergie mesurée doit être de 200 J +/- 15% (soit entre 170 J et 230 J). 
   - *Note : En biphasique rectiligne, ZOLL garantit la constance du courant, l'énergie peut varier légèrement selon l'impédance de test (généralement 50 ohms).*
5. Répéter le test pour 50 Joules et 100 Joules.

### 5. CALIBRATION DU PACEMAKER EXTERNE (Option Pacing)
1. Brancher le câble de stimulation à l'analyseur (Mode Pacer).
2. Régler le défibrillateur en mode PACER.
3. Régler le taux (Rate) sur 60 ppm (pulsations par minute).
4. Augmenter le courant (Output) à 50 mA.
5. Vérifier sur l'analyseur que la fréquence est bien à 60 ppm (+/- 2 ppm) et le courant mesuré à 50 mA (+/- 5%).
6. Augmenter jusqu'à 140 mA pour vérifier la linéarité.

**Signature du technicien requise après toute intervention.**
    `
  }
];
