# Dashboard Patrimonial — Guide d'Installation

Bienvenue! Ce guide vous aidera à personnaliser le template du dashboard patrimonial avec vos propres données.

## 🎯 Qu'est-ce que c'est?

Le **Dashboard Patrimonial** est un outil de tracking de patrimoine (net worth tracking) pour couples ou familles. Il vous permet de:

- **Consolider tous vos comptes financiers** : comptes courants, épargne, crypto, actions
- **Tracker votre immobilier** : valeurs estimées, crédits hypothécaires, loyers
- **Analyser votre allocation patrimoniale** : quel pourcentage en actions, immobilier, cash?
- **Simuler vos projections** : comment évoluera votre patrimoine dans 5, 10, 20 ans?
- **Visualiser l'évolution** : graphiques, treemaps, et historique détaillé

**Toutes les données restent sur votre ordinateur.** Rien n'est envoyé à un serveur externe.

---

## 🚀 Installation Rapide

### Étape 1 : Clonez ou téléchargez ce repository

```bash
git clone <votre-repo-url> networth-template
cd networth-template
```

### Étape 2 : Ouvrez le site localement

Pour tester localement, lancez un serveur HTTP simple :

```bash
# Python 3
python3 -m http.server 8000

# Ou Node.js
npx http-server
```

Puis ouvrez : **http://localhost:8000**

### Étape 3 : Remplissez vos données

Ouvrez `/js/data.js` et remplacez tous les `0` et exemples avec **vos données réelles**.

Recherchez les commentaires `// À MODIFIER` pour trouver les points clés à mettre à jour.

### Étape 4 : Déployez sur GitHub Pages

```bash
# Committez vos données
git add js/data.js
git commit -m "Update with my data"
git push origin main

# Activez GitHub Pages dans les settings du repo
# Sélectionnez "main branch" comme source
```

Votre site sera accessible à : `https://<votre-username>.github.io/<nom-du-repo>`

---

## 📋 Données à Préparer

Avant de remplir `data.js`, rassemblez les documents suivants :

### Comptes Bancaires
- [ ] Relevés de compte (derniers 3 mois) de tous les comptes courants
- [ ] Relevés de livrets d'épargne (Livret A, Assurance vie, etc.)
- [ ] Soldes Revolut, Wise, ou autres fintech
- [ ] Relevés comptes Maroc (Attijariwafa, etc.) si applicable
- [ ] Relevés comptes UAE (Mashreq, Wio, etc.) si applicable

### Portefeuille Actions & Crypto
- [ ] **Relevé IBKR (Interactive Brokers)** : "Net Asset Value" report avec positions et cash
- [ ] **Relevé Degiro** (si applicable) : export CSV des positions
- [ ] **Relevé Boursorama PEA** (si applicable)
- [ ] **Rapport ESPP/Employee Stock** : statement de Fidelity, Computershare, ou courtier
- [ ] **Holdings Crypto** : positions sur Coinbase, Kraken, etc.

### Immobilier
- [ ] **Estimations de valeur** : MeilleursAgents, SeLoger, ou expertise récente
- [ ] **Tableaux d'amortissement des prêts** : pour chaque crédit immobilier
  - Date de début, taux, durée, capital restant dû
  - Amortissement mensuel et intérêts
- [ ] **Loyers mensuels** : pour chaque bien loué
- [ ] **Charges annuelles** : taxes, assurance, maintenance

### Fiscalité & Allocations
- [ ] **Relevés IFU** (Impôt sur les plus-values) : pour calcul coût moyen pondéré
- [ ] **Rapports courtiers** : commissions, taux de change, historique trades
- [ ] **Contrats d'assurance-vie** : taux de rendement, versements
- [ ] **Fiches TVA/TVA déductible** (si applicable pour activité)

---

## 📝 Structure de Données : Comment Remplir?

### 1. **Personnes** (Clés: `amine` et `nezha`)

⚠️ **IMPORTANT** : Les clés de l'objet DOIVENT rester `amine` et `nezha` car elles sont hardcodées dans `engine.js` (100+ références).

Les **noms affichés** (Personne 1, Personne 2) peuvent être changés dans `index.html` et `render.js`.

```javascript
export const PORTFOLIO = {
  amine: {
    // Vos données Personne 1
  },
  nezha: {
    // Vos données Personne 2
  }
};
```

### 2. **Comptes de Cash**

```javascript
cash: {
  lclCC: 5000,           // LCL Compte courant
  lclLivretA: 20000,     // LCL Livret A
  revolutEUR: 0,         // Revolut EUR
},
```

**Ajoutez autant de lignes que vous avez de comptes.** Chaque montant doit être en **devise native** (EUR pour France, MAD pour Maroc, AED pour UAE).

### 3. **Actions & ETFs via IBKR**

```javascript
ibkr: {
  staticNAV: 25000,      // NAV totale (depuis rapport IBKR)
  positions: [
    {
      ticker: 'BNPPA',           // Ticker (Yahoo Finance format)
      shares: 50,                // Nombre d'actions
      price: 62.00,              // Prix actuel (fallback)
      costBasis: 60.00,          // Prix d'achat moyen (PRU)
      currency: 'EUR',           // Devise
      label: 'BNP Paribas',      // Libellé
      sector: 'finance',         // Secteur
      geo: 'france',             // Géographie
      ytdOpen: 60.00,            // Prix ouverture année
      mtdOpen: 61.00,            // Prix ouverture mois
      oneMonthAgo: 60.50,        // Prix il y a ~1 mois
    },
  ],
  trades: [],                    // Historique des trades
  deposits: [
    {
      date: '2025-01-01',        // Date du virement
      amount: 25000,             // Montant
      currency: 'EUR',           // Devise
      fxRateAtDate: 1,           // Taux EUR/devise ce jour-là
      label: 'Dépôt initial'
    }
  ],
},
```

**Où trouver les données ?**
- **staticNAV** : Rapport IBKR → Performance & Reports → "Net Asset Value"
- **positions** : Même rapport, section "Holdings"
- **trades** : IBKR → Performance & Reports → "Trades" (export CSV)

### 4. **Immobilier**

```javascript
immo: {
  vitry: {
    value: 250000,       // Valeur estimée (EUR)
    valueDate: '2026-01', // Mois dernière estimation (YYYY-MM)
    crd: 200000,         // Capital Restant Dû (crédit hypothécaire)
    loyerHC: 0,          // Loyer mensuel (0 si résidence principale)
    chargesLocataire: 0, // Charges payées par locataire
  },
},
```

**Où trouver?**
- **value** : MeilleursAgents, SeLoger, ou expertise récente
- **valueDate** : Date de l'estimation
- **crd** : Tableau d'amortissement du crédit (relevé bancaire)
- **loyerHC** : Contrat de location
- **chargesLocataire** : Contrat de location

### 5. **Rendements & Taux**

Mettez à jour les rendements réels de vos comptes :

```javascript
export const CASH_YIELDS = {
  livretA: 0.03,        // Livret A — 3%
  assuranceVie: 0.02,   // Assurance vie — 2%
  // Etc.
};
```

**Où trouver?** Relevés bancaires, sites des banques, ou contrats d'assurance.

### 6. **Taux de Change**

Si vous avez des comptes dans plusieurs devises, mettez à jour les taux :

```javascript
export const FX_STATIC = {
  EUR: 1,
  MAD: 10.85,           // 1 EUR = 10.85 MAD
  AED: 4.25,            // 1 EUR = 4.25 AED
  USD: 1.10,            // 1 EUR = 1.10 USD
};
```

**Où trouver?** XE.com, OANDA, ou relevés bancaires.

---

## 🤖 Comment Utiliser Claude pour Automatiser?

Pour **accélérer le processus de saisie**, vous pouvez utiliser Claude :

### Option 1 : Traitement Direct des PDFs

1. **Uploadez vos relevés** (relevés IBKR, tableaux d'amortissement, etc.) à Claude
2. **Demandez à Claude d'extraire les données** au format JSON

### Prompt à Copier-Coller :

```
Tu es un expert en gestion de patrimoine. Je vais t'envoyer des relevés bancaires, de courtage et immobiliers.

Extrais les informations clés et formate-les en JSON compatible avec ce template JavaScript :

Format attendu :
{
  "cash": { "account_name": amount_number },
  "ibkr_positions": [
    {
      "ticker": "...",
      "shares": number,
      "price": number,
      "costBasis": number,
      "currency": "EUR|USD|JPY",
      "label": "...",
      "sector": "...",
      "geo": "..."
    }
  ],
  "ibkr_deposits": [
    { "date": "YYYY-MM-DD", "amount": number, "currency": "EUR", "label": "..." }
  ],
  "ibkr_trades": [
    {
      "date": "YYYY-MM-DD",
      "ticker": "...",
      "type": "buy|sell|fx",
      "qty": number,
      "price": number,
      "currency": "EUR",
      "cost": number,
      "commission": number,
      "label": "..."
    }
  ],
  "immo": {
    "property_name": {
      "value": number,
      "valueDate": "YYYY-MM",
      "crd": number,
      "loyerHC": number
    }
  }
}

Sois exhaustif et extrais TOUTES les transactions.
Utilise les dates EXACTES des documents.
Les montants doivent être en devise native (EUR, MAD, AED, etc).
```

---

## ✅ Validation

Après avoir rempli `js/data.js`, vérifiez que :

1. **Syntaxe valide** :
   ```bash
   node -c js/data.js
   ```
   Si OK, vous verrez : `✓ Syntax valid`

2. **Le site charge sans erreurs** :
   - Ouvrez http://localhost:8000 dans le navigateur
   - Vérifiez la console (F12 → Console) : pas d'erreurs rouges
   - Vérifiez que les montants s'affichent correctement

3. **Total net worth < 300K EUR** (template de démonstration)

---

## 🔒 Confidentialité & Sécurité

- ✅ **Les données ne quittent jamais votre ordinateur**
- ✅ **Pas de serveur, pas de cloud, pas de tracking**
- ✅ **Fichiers locaux, déployment sur GitHub Pages si vous choisissez**
- ⚠️ **Ne shararez JAMAIS votre `data.js` public!** Gardez le privé.

Si vous déployez sur GitHub Pages :
- Assurez-vous que le repo est **PRIVÉ**
- Ou anonymisez les données (ce que ce template de base fait)

---

## 🚨 Dépannage

### "data.js has syntax error"
- Vérifiez les virgules manquantes après chaque propriété
- Vérifiez les guillemets fermés
- Lancez `node -c js/data.js` pour plus de détails

### "undefined is not an object"
- Assurez-vous que toutes les clés existent (`amine` et `nezha`)
- Vérifiez que les arrays `positions` et `trades` ne sont pas vides

### Les montants ne s'affichent pas
- Vérifiez que vous avez mis des **nombres**, pas des strings (`"5000"` → `5000`)
- Vérifiez les taux de change dans `FX_STATIC`

### Je veux changer les noms des personnes
- Modifiez dans `index.html` : remplacez "Personne 1" → votre nom
- Cherchez dans `render.js` aussi pour les labels détaillés
- **NE changez PAS les clés `amine` et `nezha`** dans `data.js`

---

## 📚 Ressources

- **Yahoo Finance** : https://finance.yahoo.com (prix actions)
- **MeilleursAgents** : https://www.meilleursagents.com (estimation immobilier)
- **XE.com** : https://xe.com (taux de change)
- **IBKR Reports** : https://ibkr.com (comptes brokerage)

---

## 🎉 Prêt?

1. Remplissez `js/data.js` avec vos données
2. Lancez `python3 -m http.server 8000`
3. Ouvrez http://localhost:8000
4. Appréciez votre tableau de bord patrimonial!

**Besoin d'aide?** Vous pouvez relancer Claude avec ce prompt pour vous aider à structurer vos données.

Bonne chance! 🚀
