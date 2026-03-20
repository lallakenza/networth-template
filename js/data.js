// ============================================================
// TEMPLATE ANONYMISÉ — Dashboard Patrimonial
// ============================================================
// Toutes les données personnelles ont été remplacées par des exemples.
// Cherchez "À MODIFIER" pour trouver les valeurs à personnaliser.
//
// STRUCTURE : Les clés "amine" et "nezha" sont OBLIGATOIRES
// (hardcodées dans engine.js). Seuls les noms affichés changent
// dans index.html et render.js.
// ============================================================

// ============================================================
// DATA LAYER — Raw portfolio data in native currencies
// ============================================================
// All amounts are in their NATIVE currency (AED, MAD, USD, EUR, JPY)
// Never converted here. Engine does all conversions.
//
// ╔══════════════════════════════════════════════════════════╗
// ║  GUIDE MISE À JOUR RAPIDE                               ║
// ║                                                          ║
// ║  1. SOLDES BANCAIRES : modifier les montants dans        ║
// ║     PORTFOLIO.amine.uae / maroc / ibkr                   ║
// ║  2. IBKR POSITIONS : mettre à jour price + shares        ║
// ║     dans PORTFOLIO.amine.ibkr.positions[]                ║
// ║  3. TAUX D'INTÉRÊTS : modifier CASH_YIELDS               ║
// ║     → Les taux IBKR par tranche sont dans engine.js      ║
// ║       (fonction ibkrJPYBorrowCost)                       ║
// ║  4. TAUX DE CHANGE : modifier FX_STATIC (fallback)       ║
// ║     → Les taux live sont récupérés automatiquement        ║
// ║  5. IMMOBILIER : valeurs + CRD dans amine.immo / nezha   ║
// ║  6. CRÉANCES : ajouter/supprimer dans creances.items[]   ║
// ╚══════════════════════════════════════════════════════════╝

export const PORTFOLIO = {
  amine: {
    // ──────────────────────────────────────────────────────
    // CASH UAE (en AED) — se connecter à Mashreq/Wio app
    // ──────────────────────────────────────────────────────
    uae: {
      mashreq: 0,      // Mashreq NEO PLUS — mis à jour 7 Mar 2026
      wioSavings: 0,   // Wio Savings (~6% rendement)
      wioCurrent: 0,     // Wio Current (compte courant, 0% rendement)
      revolutEUR: 0,     // Revolut EUR balance (déjà en EUR) — mis à jour 7 Mar 2026
    },

    // ──────────────────────────────────────────────────────
    // CASH MAROC (en MAD) — se connecter à Attijari/Nabd app
    // ──────────────────────────────────────────────────────
    maroc: {
      attijari: 50000,     // Attijariwafa Courant (0% rendement)
      nabd: 0,          // Nabd (ex-Société Générale Maroc, 0% rendement)
    },

    // ──────────────────────────────────────────────────────
    // ESPP ACCENTURE — voir Fidelity NetBenefits
    // ──────────────────────────────────────────────────────
    espp: {
      shares: 167,          // Nombre d'actions ACN détenues
      cashEUR: 2000,        // Cash résiduel en EUR dans le compte ESPP
      lots: [
        // { date, source, shares, costBasis (USD/action) }
        { date: '2023-05-01', source: 'ESPP', shares: 17, costBasis: 236.8788 },
        { date: '2022-08-15', source: 'FRAC', shares: 3,  costBasis: 272.3600 },
        { date: '2022-05-01', source: 'ESPP', shares: 12, costBasis: 305.8900 },
        { date: '2021-11-01', source: 'ESPP', shares: 11, costBasis: 355.9900 },
        { date: '2021-04-30', source: 'ESPP', shares: 15, costBasis: 289.6400 },
        { date: '2020-10-30', source: 'ESPP', shares: 14, costBasis: 215.7250 },
        { date: '2020-05-01', source: 'ESPP', shares: 19, costBasis: 181.1250 },
        { date: '2019-11-01', source: 'ESPP', shares: 18, costBasis: 187.2300 },
        { date: '2019-05-01', source: 'ESPP', shares: 17, costBasis: 182.3200 },
        { date: '2018-11-01', source: 'ESPP', shares: 21, costBasis: 158.3250 },
        { date: '2018-05-01', source: 'ESPP', shares: 20, costBasis: 151.0350 },
      ],
      totalCostBasisUSD: 36052,
    },

    // ──────────────────────────────────────────────────────
    // IBKR — Télécharger le CSV "Net Asset Value" depuis
    //        Interactive Brokers > Performance & Reports
    //
    // Positions : mettre à jour price (cours) et shares (nb)
    // Cash : mettre à jour cashEUR, cashUSD, cashJPY
    // cashJPY est NÉGATIF = emprunt (short JPY pour levier)
    // ──────────────────────────────────────────────────────
    ibkr: {
      staticNAV: 25000,    // NAV totale du rapport CSV au 16/03/2026
      positions: [
        // Positions exemple — À MODIFIER avec vos propres actions
        { ticker: 'TTE.PA',  shares: 100,  price: 55.00,  costBasis: 50.00, currency: 'EUR', label: 'TotalEnergies', sector: 'energy', geo: 'france', ytdOpen: 52.00, mtdOpen: 54.00, oneMonthAgo: 53.00 },
        { ticker: 'SU.PA',   shares: 20,   price: 95.00,  costBasis: 90.00, currency: 'EUR', label: 'Schneider Electric', sector: 'industrials', geo: 'france', ytdOpen: 92.00, mtdOpen: 96.00, oneMonthAgo: 94.00 },
        { ticker: 'ORA.PA',  shares: 200,  price: 10.50,  costBasis: 10.00, currency: 'EUR', label: 'Orange', sector: 'telecom', geo: 'france', ytdOpen: 10.20, mtdOpen: 10.40, oneMonthAgo: 10.30 },
        { ticker: 'AMZN',    shares: 15,   price: 180.00, costBasis: 170.00, currency: 'USD', label: 'Amazon', sector: 'tech', geo: 'us', ytdOpen: 175.00, mtdOpen: 178.00, oneMonthAgo: 176.00 },
        { ticker: 'MSFT',    shares: 10,   price: 420.00, costBasis: 400.00, currency: 'USD', label: 'Microsoft', sector: 'tech', geo: 'us', ytdOpen: 410.00, mtdOpen: 415.00, oneMonthAgo: 412.00 },
      ],
      // ⬇️ Cash multi-devises (IBKR — mis à jour 18/03/2026 après deleverage JPY)
      cashEUR: 500,           // Solde EUR chez IBKR au 18/03/2026
      cashUSD: 0,            // Solde USD chez IBKR au 18/03/2026
      cashJPY: 0,     // Solde JPY chez IBKR au 18/03/2026 (après rachat 13111 EUR→JPY)
      // Performance metrics (April 2025 - March 2026)
      meta: {
        twr: 26.94,            // Time-Weighted Return % (depuis ouverture)
        realizedPL: 270,       // Net des 4 trades fictifs (+920 - 650)      // +5924 précédent + ~874 (DG 100×(131.20-122.46))
        dividends: 0,        // Gross dividends received (all-time)
        commissions: -45,      // Commissions sur les trades fictifs     // -872 précédent - 6.56 (DG sells)
      },
      // ── Historique des dépôts IBKR ──
      // Source : rapport IBKR "Deposits & Withdrawals"
      // Mettre à jour à chaque nouveau virement ou rapport IBKR
      // currency: devise du virement | amount: montant en devise native | fxRateAtDate: taux EUR/devise au jour du dépôt
      deposits: [
        // À MODIFIER : remplacez par vos vrais virements IBKR
        { date: '2025-01-01', amount: 15000, currency: 'EUR', fxRateAtDate: 1, label: 'Dépôt initial' },
        { date: '2025-04-01', amount: 10000, currency: 'EUR', fxRateAtDate: 1, label: 'Virement complémentaire' },
      ],
      // Total dépôts IBKR = 202886 EUR
      // ── Historique complet des trades IBKR ──
      // Source: CSV IBKR U18138426 — April 2025 → March 2026
      // Format unifié: { date, ticker, label, type, qty, price, currency, cost|proceeds, realizedPL, commission, costBasis, note }
      // type: 'buy' | 'sell' | 'fx'
      // qty: toujours positif. type indique le sens.
      // cost/proceeds: montant total (qty × price). cost pour buy, proceeds pour sell.
      // realizedPL: P/L réalisé sur les sells (du CSV IBKR). Vide pour les buys.
      // commission: frais de transaction (négatif).
      // costBasis: PRU moyen au moment du trade (du CSV IBKR). Utile pour recalculer le P/L.
      trades: [
        // ═══════════════════════════════════════════════════
        // TRADES FICTIFS — À REMPLACER PAR VOTRE HISTORIQUE
        // Ces trades sont des exemples pour illustrer le fonctionnement
        // du Track Record, des P&L et des graphiques.
        // Format : { date, ticker, label, type:'buy'|'sell', qty, price, currency, cost|proceeds, realizedPL, commission, costBasis, source:'ibkr' }
        // ═══════════════════════════════════════════════════

        // ─── TotalEnergies — achat jan 2025, position ouverte ───
        { date: '2025-01-15', ticker: 'TTE.PA',  label: 'TotalEnergies',      type: 'buy',  qty: 100,  price: 50.00,   currency: 'EUR', cost: 5000,   commission: -5.00, costBasis: 50.00, source: 'ibkr' },
        // ─── Schneider — achat fév 2025, position ouverte ───
        { date: '2025-02-10', ticker: 'SU.PA',   label: 'Schneider Electric',  type: 'buy',  qty: 20,   price: 90.00,   currency: 'EUR', cost: 1800,   commission: -3.00, costBasis: 90.00, source: 'ibkr' },
        // ─── Orange — achat mars 2025, position ouverte ───
        { date: '2025-03-05', ticker: 'ORA.PA',  label: 'Orange',              type: 'buy',  qty: 200,  price: 10.00,   currency: 'EUR', cost: 2000,   commission: -3.00, costBasis: 10.00, source: 'ibkr' },
        // ─── Amazon — achat avr 2025, position ouverte ───
        { date: '2025-04-20', ticker: 'AMZN',    label: 'Amazon',              type: 'buy',  qty: 15,   price: 170.00,  currency: 'USD', cost: 2550,   commission: -2.00, costBasis: 170.00, source: 'ibkr' },
        // ─── Microsoft — achat mai 2025, position ouverte ───
        { date: '2025-05-15', ticker: 'MSFT',    label: 'Microsoft',           type: 'buy',  qty: 10,   price: 400.00,  currency: 'USD', cost: 4000,   commission: -2.00, costBasis: 400.00, source: 'ibkr' },

        // ─── BNP Paribas — TRADE FERMÉ (gain +320€) ───
        // Achat jan 2025 à 55€, vente mars 2025 à 59€
        { date: '2025-01-20', ticker: 'BNP.PA',  label: 'BNP Paribas',         type: 'buy',  qty: 80,   price: 55.00,   currency: 'EUR', cost: 4400,   commission: -5.00, costBasis: 55.00, source: 'ibkr' },
        { date: '2025-03-15', ticker: 'BNP.PA',  label: 'BNP Paribas',         type: 'sell', qty: 80,   price: 59.00,   currency: 'EUR', proceeds: 4720, realizedPL: 320.00, commission: -5.00, costBasis: 55.00, source: 'ibkr' },

        // ─── Renault — TRADE FERMÉ (perte -450€) ───
        // Achat fév 2025 à 42€, vente avr 2025 à 33€ (mauvais timing)
        { date: '2025-02-01', ticker: 'RNO.PA',  label: 'Renault',             type: 'buy',  qty: 50,   price: 42.00,   currency: 'EUR', cost: 2100,   commission: -3.00, costBasis: 42.00, source: 'ibkr' },
        { date: '2025-04-10', ticker: 'RNO.PA',  label: 'Renault',             type: 'sell', qty: 50,   price: 33.00,   currency: 'EUR', proceeds: 1650, realizedPL: -450.00, commission: -3.00, costBasis: 42.00, source: 'ibkr' },

        // ─── Stellantis — TRADE FERMÉ (gain +600€) ───
        // Achat mars 2025 à 12€, vente juin 2025 à 18€
        { date: '2025-03-20', ticker: 'STLAP.PA', label: 'Stellantis',         type: 'buy',  qty: 100,  price: 12.00,   currency: 'EUR', cost: 1200,   commission: -3.00, costBasis: 12.00, source: 'ibkr' },
        { date: '2025-06-01', ticker: 'STLAP.PA', label: 'Stellantis',         type: 'sell', qty: 100,  price: 18.00,   currency: 'EUR', proceeds: 1800, realizedPL: 600.00, commission: -3.00, costBasis: 12.00, source: 'ibkr' },

        // ─── Worldline — TRADE FERMÉ (perte -200€) ───
        // Achat avr 2025 à 8€, vente juil 2025 à 6€
        { date: '2025-04-15', ticker: 'WLN.PA',  label: 'Worldline',           type: 'buy',  qty: 100,  price: 8.00,    currency: 'EUR', cost: 800,    commission: -3.00, costBasis: 8.00, source: 'ibkr' },
        { date: '2025-07-01', ticker: 'WLN.PA',  label: 'Worldline',           type: 'sell', qty: 100,  price: 6.00,    currency: 'EUR', proceeds: 600,  realizedPL: -200.00, commission: -3.00, costBasis: 8.00, source: 'ibkr' },

        // ═══════════════════════════════════════════════════
        // RÉSUMÉ TRACK RECORD FICTIF :
        // 4 trades fermés : 2 gains (+320, +600) / 2 pertes (-450, -200)
        // Win rate : 50% | Gains totaux : +920€ | Pertes totales : -650€
        // Profit factor : 1.42x | Net : +270€
        // ═══════════════════════════════════════════════════
      ],
    },

    // ──────────────────────────────────────────────────────
    // SGTM (Bourse Casablanca) — voir cours sur casablanca-bourse.com
    // ──────────────────────────────────────────────────────
    sgtm: { shares: 0 },   // prix unitaire dans market.sgtmPriceMAD

    // ──────────────────────────────────────────────────────
    // IMMOBILIER — mettre à jour valeur estimée + CRD mensuel
    // CRD = Capital Restant Dû (vérifier sur tableau d'amortissement)
    // ──────────────────────────────────────────────────────
    immo: {
      vitry: { value: 250000, valueDate: '2025-09', crd: 268903, loyerHC: 1050, loyerDeclare: 600, chargesLocataire: 150, parking: 70, loyerTotalCC: 1270, loyerDeclareCC: 600 },
      // value: 300K = estimation sept 2025, 67.14m² × ~4 470€/m² (VEFA neuf RE2020, livré 2023)
      // Achat à 275K grâce TVA 5.5% — valeur marché supérieure au prix payé
      // MeilleursAgents quartier Ardoines : 4 259€/m² (ancien moyen)
      // Prime neuf limitée à +5-8% car quartier encore en chantier :
      //   - gare L15 Les Ardoines en travaux (pas encore opérationnelle)
      //   - peu de commerces, ZAC en construction
      //   - offre massive (8K logements neufs) qui plafonne les prix
      // → 4 259 × 1.05 ≈ 4 470€/m² = 300K (conservateur)
      // loyerHC: 500€ bail HC + 550€ cash = 1050€ HC total
      // chargesLocataire: 150€ provision charges (offsets copro)
      // parking: 70€ cash
      // Total reçu: 1050 + 150 + 70 = 1270€/mois
    },

    // ──────────────────────────────────────────────────────
    // VÉHICULES — valeur estimée revente
    // ──────────────────────────────────────────────────────
    vehicles: { cayenne: 15000, mercedes: 0 },   // mis à jour 8 Mar 2026

    // ──────────────────────────────────────────────────────
    // CRÉANCES — argent qu'on nous doit
    // guaranteed: true = certain, false = incertain
    // probability: 0.7 = 70% de chances de récupérer
    // delayDays: délai avant paiement (ex: 45j pour SAP)
    // ──────────────────────────────────────────────────────
    creances: {
      items: [
        // status: en_cours | relancé | en_retard | recouvré | litige
        // payments: historique des paiements partiels reçus
        { label: 'SAP & Tax (20j x 910€)', amount: 0, currency: 'EUR', type: 'pro', guaranteed: true, probability: 1.0, delayDays: 45, status: 'en_cours', dueDate: '2026-04-15', lastContact: '2026-03-01', payments: [], notes: 'Facture envoyée, paiement sous 45j' },
        { label: 'Malt — Frais déplacement NZ', amount: 0, currency: 'EUR', type: 'pro', guaranteed: true, probability: 1.0, delayDays: 30, status: 'en_cours', dueDate: '2026-04-15', lastContact: '2026-03-08', payments: [], notes: 'Note de frais déplacement NZ — Sourcing Desk L\'Oréal, livré 26 fév 2026' },
        { label: 'Loyers impayés (Fév + Mars)', amount: 0, currency: 'EUR', type: 'pro', guaranteed: false, probability: 0.7, status: 'relancé', dueDate: '2026-03-01', lastContact: '2026-03-05', payments: [], notes: 'Relance envoyée au locataire' },
        { label: 'Kenza', amount: 0, currency: 'MAD', type: 'perso', guaranteed: true, probability: 1.0, status: 'en_cours', dueDate: '2026-12-31', lastContact: '2026-02-15', payments: [], notes: 'Remboursement prévu après vente terrain' },
        { label: 'Abdelkader', amount: 0, currency: 'MAD', type: 'perso', guaranteed: false, probability: 0.7, status: 'en_cours', dueDate: '2026-06-30', lastContact: '2026-01-10', payments: [], notes: '' },
        { label: 'Mehdi', amount: 30000, currency: 'MAD', type: 'perso', guaranteed: true, probability: 1.0, status: 'en_cours', dueDate: '2026-09-30', lastContact: '2026-02-20', payments: [], notes: '' },
        { label: 'Akram', amount: 1500, currency: 'EUR', type: 'perso', guaranteed: false, probability: 0.7, status: 'en_retard', dueDate: '2026-01-31', lastContact: '2026-02-01', payments: [], notes: 'Pas de nouvelle depuis' },
        // Anas — remboursé le 7 mars 2026 → supprimé
      ],
    },

    // ──────────────────────────────────────────────────────
    // DEGIRO (fermé avril 2025 — toutes positions liquidées)
    // P/L calculé depuis les emails de confirmation Gmail
    // ──────────────────────────────────────────────────────
    degiro: { sells: [], buys: [], dividends: {}, totalDividendsNet: 0 },

    // ════════════════════════════════════════════════════════════
    // HISTORIQUE UNIFIÉ DE TOUS LES TRADES — toutes plateformes
    // ════════════════════════════════════════════════════════════
    // Format: { date, ticker, label, type, qty, price, currency, cost|proceeds,
    //           realizedPL, commission, costBasis, source, note }
    // source: 'ibkr' | 'degiro' | 'espp'
    // Champs manquants = données non disponibles (trades historiques Degiro)
    allTrades: [], // Trades historiques — vidés pour le template

    // ──────────────────────────────────────────────────────
    // PASSIF — dettes / obligations
    // ──────────────────────────────────────────────────────
    tva: 0,             // TVA à payer (négatif = dette)
  },

  // ════════════════════════════════════════════════════════
  // NEZHA
  // ════════════════════════════════════════════════════════
  nezha: {
    // ── Cash détaillé Nezha (relevés mars 2026) ──
    cash: {
      revolutEUR: 0,       // EUR — Revolut France (0%)
      creditMutuelCC: 8000,   // EUR — Crédit Mutuel compte courant (0%)
      lclLivretA: 20000,       // EUR — LCL Livret A (1.5% défiscalisé)
      lclCompteDepots: 0,  // EUR — LCL Compte de dépôts (0%)
      attijariwafarMAD: 30000,// MAD — Attijariwafa Compte chèque MRE (0%)
      wioAED: 0,           // AED — Wio Savings UAE (0%)
    },
    sgtm: { shares: 0 },   // SGTM Bourse Casablanca
    // ── ESPP Nezha — UBS Account W3 F0329 11 (relevé juin 2025) ──
    // Source : relevé UBS "Investment Account June 2025"
    // 40 actions ACN, cost basis total $10,544.20, valeur $11,955.60 au 30/06/2025
    // Cash UBS : $109.56 — dividendes YTD $71.04
    espp: {
      shares: 40,
      cashUSD: 109.56,   // Cash résiduel dans le compte UBS
      totalCostBasisUSD: 10544.20,
      lots: [
        { date: '2023-11-01', source: 'ESPP', shares: 8, costBasis: 255.148 },
        { date: '2024-05-01', source: 'ESPP', shares: 8, costBasis: 255.675 },
        { date: '2024-11-01', source: 'ESPP', shares: 8, costBasis: 294.431 },
        { date: '2025-05-01', source: 'ESPP', shares: 16, costBasis: 256.385 },
      ],
    },
    creances: {
      items: [
        { label: 'Omar', amount: 0, currency: 'MAD', guaranteed: false, probability: 0.7, status: 'en_cours', dueDate: '2026-12-31', lastContact: '2026-01-15', payments: [], notes: '' },
      ],
    },
    // Caution locative Rueil — dépôt de garantie reçu du locataire, à rembourser au départ
    cautionRueil: 0, // EUR — à déduire du patrimoine net (dette envers locataire)
    immo: {
      // { value: valeur estimée à valueDate, crd: capital restant dû, loyer: loyer mensuel }
      // La valeur évolue automatiquement avec le taux d'appréciation depuis valueDate
      rueil:     { value: 280000, valueDate: '2025-09', crd: 195275, loyerHC: 1300, chargesLocataire: 150 },
      // value: 280K = estimation sept 2025, 55.66m² × ~5 030€/m² (ancien rénové, 15K€ travaux réalisés)
      // Achat 255K (nov 2019) + 15K travaux = 270K investi
      // MeilleursAgents allée des Glycines : 4 445€/m² (moyenne rue, stock mixte)
      // Après rénovation : +10-12% vs non rénové → ~4 935-5 030€/m² = 275-280K
      villejuif: { value: 370000, valueDate: '2025-09', crd: 318470, loyerHC: 1700, signed: false, reservationFees: 3600 },
      // value: 370K = estimation sept 2025, 68.92m² × ~5 369€/m² (VEFA neuf, en construction)
      // Opération totale : 349 456€ avec remise résident Villejuif
      // efficity Bd Gorki jan 2026 : 5 050€/m² (ancien), prime neuf +6%
      // MeilleursAgents Bd Gorki : 5 138€/m² (ancien moyen)
      // Neuf VEFA face station L15 Louis Aragon : ~5 400-5 600€/m²
      // Valeur conservatrice en construction (livraison été 2029)
    },
  },

  // ════════════════════════════════════════════════════════
  // PRIX DE MARCHÉ (mis à jour automatiquement par API)
  // ════════════════════════════════════════════════════════
  market: {
    sgtmPriceMAD: 717,       // Cours SGTM en MAD (séance 11 Mar 2026) — casablanca-bourse.com
    sgtmCostBasisMAD: 420,   // Prix d'achat IPO (offre grand public, déc 2025)
    acnPriceUSD: 201.63,     // Cours Accenture en USD — mis à jour 11/03/2026
    // Prix de référence historiques pour P&L (stockés une fois, pas re-fetchés)
    acnYtdOpen: 259.95,      // ACN clôture 2 jan 2026
    acnMtdOpen: 205.93,      // ACN clôture 3 mar 2026
    acnOneMonthAgo: 240.86,  // ACN clôture ~10 fév 2026
  },
};

// ════════════════════════════════════════════════════════════
// DATE DE DERNIÈRE MISE À JOUR DES DONNÉES STATIQUES
// Utilisée pour afficher "données du XX" pendant le chargement
// Format : 'JJ/MM/YYYY' — à mettre à jour à chaque modification de data.js
// ════════════════════════════════════════════════════════════
export const DATA_LAST_UPDATE = '01/01/2026';

// ════════════════════════════════════════════════════════════
// PRIX STATIQUES — fallback "Si gardé auj." avant fetch API
// Prix post-split en devise native. Mis à jour manuellement.
// Les API Yahoo écrasent ces valeurs dès le fetch terminé.
// ════════════════════════════════════════════════════════════
export const DEGIRO_STATIC_PRICES = {};

// ════════════════════════════════════════════════════════════
// TAUX DE RENDEMENT CASH (annuels)
//
// ⚠️  Pour IBKR : les taux ci-dessous sont les taux NOMINAUX
//     (avant seuil 10K). Le rendement EFFECTIF est calculé
//     dans engine.js en tenant compte de :
//     - EUR/USD : premiers 10 000 à 0% (seuil IBKR)
//     - JPY : taux par tranche (voir ibkrJPYBorrowCost)
//
// Source : https://www.interactivebrokers.com/en/accounts/fees/pricing-interest-rates.php
// Dernière vérification : 7 mars 2026
// ════════════════════════════════════════════════════════════
export const CASH_YIELDS = {
  // --- UAE ---
  mashreq: 0.0625,     // 6.25% Mashreq NEO+ Savings (taux fixe)
  wioSavings: 0.06,    // 6.00% Wio Savings (taux affiché dans l'app)
  wioCurrent: 0,       // Compte courant, pas de rendement
  // --- Revolut ---
  revolutEUR: 0,       // Pas de rendement (pas de coffre activé)
  // --- Maroc ---
  attijari: 0,         // Compte courant, pas de rendement
  nabd: 0,             // Compte courant, pas de rendement
  // --- IBKR (taux IBKR Pro = Benchmark - 0.5%) ---
  ibkrCashEUR: 0.0153,  // 1.53% = BM 2.03% - 0.50% commission IBKR
  ibkrCashUSD: 0.0314,  // 3.14% = BM 3.64% - 0.50% commission IBKR
  ibkrCashJPY: -0.017,  // NON UTILISÉ DIRECTEMENT — calcul par tranche dans engine.js
  // --- Autres ---
  // --- Nezha (détaillé par compte) ---
  nezhaRevolutEUR: 0,       // Revolut EUR — pas de rendement
  nezhaCreditMutuel: 0,     // Crédit Mutuel CC — pas de rendement
  nezhaLivretA: 0.015,      // LCL Livret A — 1.5% (depuis fév 2026, défiscalisé)
  nezhaLclDepots: 0,        // LCL Compte dépôts — pas de rendement
  nezhaAttijariMAD: 0,      // Attijariwafa Maroc — pas de rendement
  nezhaWioAED: 0,           // Wio UAE — pas de rendement (0% sur screenshot)
  esppCash: 0,         // Cash résiduel ESPP, pas de rendement
};

// Taux d'inflation annuel (pour calcul érosion cash dormant)
export const INFLATION_RATE = 0.03; // 3% annuel

// ════════════════════════════════════════════════════════════
// IBKR CONFIGURATION — seuils et taux par tranche
// Source : interactivebrokers.com/en/trading/margin-rates.php
// Dernière vérification : mars 2026
// ════════════════════════════════════════════════════════════
export const IBKR_CONFIG = {
  // Premiers 10K EUR/USD à 0% (seuil IBKR standard pour intérêts)
  cashThreshold: 10000,
  // JPY Margin Tiers (emprunt — taux négatif appliqué)
  // BM JPY = 0.704% (mars 2026)
  jpyTiers: [
    { limit: 11000000,  rate: 0.02204 },  // Tier 1: 0 → ¥11M   = BM + 1.5%
    { limit: 114000000, rate: 0.01704 },  // Tier 2: ¥11M → ¥114M = BM + 1.0%
    { limit: Infinity,  rate: 0.01454 },  // Tier 3: > ¥114M      = BM + 0.75%
  ],
  // Recommandation : solde optimal EUR pour éviter les pénalités
  optimalCashEUR: 20000,
  // Rendement de référence cible (pour calcul coût d'opportunité)
  refYield: 0.06,
};

// ════════════════════════════════════════════════════════════
// TAUX DE CHANGE STATIQUES (fallback si API indisponible)
// Format : 1 EUR = X devises étrangères
// Source : xe.com — Dernière vérification : 10 mars 2026
// ════════════════════════════════════════════════════════════
export const FX_STATIC = {
  EUR: 1,
  AED: 4.2500,       // Xe 12/03: ~4.25 (AED pegged to USD, EUR/USD 1.157)
  MAD: 10.8500,      // Xe 12/03: ~10.85
  USD: 1.1570,       // Xe 11/03: 1.1570
  JPY: 183.00,       // Xe 12/03: ~183.00
};

// Symboles devises pour affichage
export const CURRENCY_CONFIG = {
  symbols: { EUR: '\u20ac', AED: '\u062f.\u0625', MAD: 'DH', USD: '$', JPY: '\u00a5' },
  symbolAfter: { MAD: true },
};

// ════════════════════════════════════════════════════════════
// IMMOBILIER — constantes pour simulations
// ════════════════════════════════════════════════════════════
export const IMMO_CONSTANTS = {
  // growth: calculé dynamiquement dans engine.js depuis amortSchedules + appreciation + CF
  // Ancien hardcodé supprimé — voir wealthBreakdown dans computeImmoView()
  villejuifStartMonth: 40, // Été 2029 ~ 40 mois à partir de mars 2026
  charges: {
    // { pret: mensualité, assurance, pno: assurance propriétaire, tf: taxe foncière/12, copro }
    vitry:     { pret: 1166, assurance: 17, pno: 15, tf: 75, copro: 150 },  // pret: AL 145.20 + BP 1020.55 + PTZ 0 ≈ 1166, ass: APRIL 17.48 ≈ 17
    rueil:     { pret: 970, assurance: 18, pno: 12, tf: 67, copro: 250 },  // pret: 969.62, ass: 17.99 (2026), copro: 250 dont 150 refacturé locataire
    villejuif: { pret: 1669, assurance: 51, pno: 15, tf: 83, copro: 110 },
  },
  prets: {
    vitryEnd: 2048,      // Année fin du prêt
    rueilEnd: 2044,
    villejuifEnd: 2052,
  },
  // ──────────────────────────────────────────────────────
  // PRÊTS — Paramètres complets pour tableau d'amortissement
  // principal: montant emprunté initial
  // rate: taux annuel nominal (ex: 1.25% = 0.0125)
  // startDate: 'YYYY-MM' — mois du premier versement
  // durationMonths: durée totale en mois
  // monthlyPayment: mensualité hors assurance
  // insurance: assurance emprunteur mensuelle
  // ──────────────────────────────────────────────────────
  loans: {
    // ── VITRY : 3 prêts — CRD calculé dynamiquement depuis vitryLoans ──
    // Le champ 'vitry' est généré par computeMultiLoanSchedule(vitryLoans)
    // insurance APRIL : 209.76€/an = 17.48€/mois (externe, non incluse dans sub-loans)
    vitryInsurance: 17.48,
    vitryLoans: [
      {
        name: 'Prêt aidé',
        principal: 40000,
        rate: 0.005,           // 0.50%
        startDate: '2023-03',  // 1ère échéance 05/03/2023
        durationMonths: 300,   // 25 ans — fin fév 2048
        monthlyPayment: 145.20,
        insuranceMonthly: 3.33,  // assurance AL intégrée dans l'échéance
      },
      {
        name: 'PTZ (via Banque exemple 2)',
        principal: 60000,
        rate: 0,               // 0% — Prêt à Taux Zéro
        startDate: '2023-12',  // 1ère échéance 06/12/2023
        durationMonths: 240,   // 20 ans — fin nov 2043
        periods: [
          { months: 60, payment: 0 },        // P1 : différé total 5 ans (déc 2023 – nov 2028)
          { months: 180, payment: 333.33 },   // P2 : amortissement constant (déc 2028 – nov 2043)
        ],
        insuranceMonthly: 0,
      },
      {
        name: 'Banque exemple 2 (Riv\'immo)',
        principal: 175000,
        rate: 0.021,           // 2.10%
        startDate: '2025-08',  // 1ère échéance 06/08/2025 (réalisation 10/11/2023)
        durationMonths: 281,   // 281 échéances — fin déc 2048
        periods: [
          { months: 5, payment: 306.25 },     // P1 : intérêts seuls (août–déc 2025)
          { months: 36, payment: 1020.55 },   // P2 : jan 2026 – déc 2028
          { months: 180, payment: 687.55 },   // P3 : jan 2029 – déc 2043
          { months: 60, payment: 1020.58 },   // P4 : jan 2044 – déc 2048
        ],
        insuranceMonthly: 0,   // assurance APRIL séparée
      },
    ],
    // Assurance emprunteur APRIL (couvre PTZ + BP Prêt immo)
    vitryInsuranceAPRIL: {
      annualTTC: 209.76,       // 17.48€/mois
      breakdown: {
        ptz: 53.16,            // Emprunt N°1 : 60K PTZ
        bp: 147.00,            // Emprunt N°2 : 175K Prêt immo
        cotisationAssociative: 9.60,
      },
    },
    rueil: {
      principal: 251200,
      rate: 0.012,           // 1.20%
      startDate: '2019-12',   // 1ère échéance 5 décembre 2019
      durationMonths: 300,   // 25 ans
      monthlyPayment: 969.62, // contrat notarié 5 nov 2019
      insurance: 17.99,     // assurance ACM VIE — dégressive (17.99€ en 2026)
    },
    // ── VILLEJUIF : 2 prêts — CRD calculé dynamiquement depuis villejuifLoans ──
    villejuifInsurance: 51.29,   // 46.10 + 5.19
    villejuifLoans: [
      {
        name: 'LCL Prêt 1 — Immo Taux Fixe',
        principal: 286669.95,
        rate: 0.0327,          // 3.27%
        startDate: '2025-08',  // début franchise août 2025
        durationMonths: 327,   // 36 franchise + 291 amort
        periods: [
          { months: 36, payment: 0 },       // Franchise totale — intérêts capitalisés
          { months: 291, payment: 1572.79 }, // Amortissement
        ],
        insuranceMonthly: 46.10,
        taeg: 0.0373,
        totalInterestRef: 142199,  // coût total intérêts (offre de prêt, pour ref)
        deferredInterestRef: 19055,
      },
      {
        name: 'LCL Prêt 2 — Immo Taux Fixe',
        principal: 31800,
        rate: 0.009,           // 0.90%
        startDate: '2025-08',
        durationMonths: 327,
        periods: [
          { months: 36, payment: 0 },       // Franchise totale
          { months: 291, payment: 124.99 },  // Amortissement
        ],
        insuranceMonthly: 5.19,
        taeg: 0.0139,
        totalInterestRef: 3791,
        deferredInterestRef: 575,
      },
    ],
    villejuifFranchise: {
      months: 36,
      startDate: null,         // Prêt non encore débloqué — franchise non commencée
      loanDisbursed: false,    // Nezha n'a pas encore signé l'offre / débloqué le prêt
      fraisDossier: 1500,
    },
  },
  // ──────────────────────────────────────────────────────
  // FISCALITÉ IMMOBILIÈRE
  //
  // ⚠️  Amine et Nezha sont RÉSIDENTS FISCAUX UAE
  // → Pas d'IR français sur les revenus mondiaux
  // → MAIS : les revenus fonciers de source FRANÇAISE restent
  //   imposables en France (convention fiscale FR-UAE art. 6)
  //
  // Vitry (Amine) : location NUE → revenus fonciers
  //   regime: 'micro-foncier' (abattement 30%) si loyers < 15K€/an
  //   Partie du loyer reçue en cash (non déclarée) → exclue du calcul fiscal
  //   En tant que non-résident : taux minimum 20% (pas de TMI progressive)
  //   PS : 17.2% sur les revenus fonciers de source française
  //
  // Rueil + Villejuif (Nezha) : LMNP (meublé)
  //   regime: 'micro-BIC' (abattement 50%) si recettes < 77 700€/an
  //   ou régime réel simplifié (amortissement du bien)
  //   Non-résident : taux minimum 20%
  //   PS : 17.2%
  // ──────────────────────────────────────────────────────
  fiscalite: {
    vitry:     { regime: 'reel-foncier', tmi: 0.20, ps: 0.172, type: 'nu' },
    // Vitry : loyerDeclare (500€/mois) est dans portfolio.amine.immo.vitry
    // Régime réel : on déduit intérêts d'emprunt, assurance, PNO, TF, copro
    // TMI 20% + PS 17.2% = taux effectif ~37% sur le revenu net
    rueil:     { regime: 'lmnp-amort', tmi: 0.20, ps: 0.172, type: 'lmnp', lmnpStartDate: '2025-10' },
    // LMNP réel avec amortissement → impôt = 0 (amortissement > revenu net)
    // lmnpStartDate: date de passage en LMNP (bail signé sept 2025, prise effet oct 2025)
    // Amortissement commence à cette date, pas à la date d'achat (2019)
    villejuif: { regime: 'lmnp-amort', tmi: 0.20, ps: 0.172, type: 'lmnp', lmnpStartDate: '2029-09' },
    // lmnpStartDate: livraison + début location estimé sept 2029
  },
  // ──────────────────────────────────────────────────────
  // MÉTADONNÉES PROPRIÉTÉS — surface, adresse, prix, appréciation
  // Utilisé par les pages détaillées (apt_*.html)
  // ──────────────────────────────────────────────────────
  properties: {
    vitry: {
      address: '19 Rue Nathalie Lemel, Paris',
      surface: 67.14,           // m²
      purchasePrice: 275000,    // prix d'achat TTC (VEFA)
      purchaseDate: '2023-01',  // acte notarié 16 janvier 2023
      deliveryDate: '2025-07',  // livraison VEFA juillet 2025
      tvaAvantage: 37796,       // économie TVA (20% - 5.5%) × prix HT
      // ── Appréciation réaliste par phase (moyenne pondérée) ──
      // 2026-2028 : 1.0%/an — quartier encore en chantier, gare pas ouverte,
      //   peu de commerces, offre neuve abondante qui pèse sur les prix, marché IDF tendu
      // 2029-2032 : 2.0%/an — gare L15 opérationnelle, ZAC livrée, rattrapage modéré
      // 2033+ : 1.5%/an — effet GPE digéré, croissance IDF standard
      // Moyenne lissée sur 10 ans ≈ 1.5%/an
      appreciation: 0.015,       // 1.5%/an (moyenne lissée, GPE Ligne 15 Les Ardoines)
      appreciationPhases: [
        { start: 2026, end: 2028, rate: 0.010, note: 'Quartier en chantier, gare en travaux, offre abondante' },
        { start: 2029, end: 2032, rate: 0.020, note: 'Gare L15 ouverte, ZAC livrée, rattrapage modéré' },
        { start: 2033, end: 2040, rate: 0.015, note: 'Effet GPE digéré, croissance IDF standard' },
      ],
      type: 'T3 — Location nue',
      loyerObjectif: 1270,      // loyer total CC réel perçu : 1050 HC + 150 charges + 70 parking
      totalInterestCost: 56644, // coût total intérêts (3 prêts combinés, offres de prêt)
      ligne15: { station: 'Les Ardoines', distance: '2-5 min à pied', opening: 2025 },
      details: {
        lot: '3302',
        floor: 'R+3 (4ème étage)',
        building: 'Bâtiment 3',
        type: 'T3',
        yearBuilt: 2023,
        developer: 'Nexity',
        program: 'Programme exemple (84 logements)',
        norm: 'RE2020',
        heating: 'Chauffage collectif',
        dpe: 'A',
        rooms: [
          { name: 'Entrée', surface: 5.85 },
          { name: 'Séjour', surface: 21.28 },
          { name: 'Cuisine', surface: 8.52 },
          { name: 'Chambre 1', surface: 12.38 },
          { name: 'Chambre 2', surface: 9.95 },
          { name: 'Salle de bain', surface: 4.87 },
          { name: 'WC', surface: 2.09 },
          { name: 'Dégagement', surface: 2.20 },
        ],
        surfaceHabitable: 67.14,
        loggia: 8.1,
        surfaceTotale: 75.24,
        parking: true,
        cave: false,
        exposure: 'Sud-Ouest',
      },
    },
    rueil: {
      address: '21 Exemple adresse, 75000 Paris',
      surface: 55.66,           // m²
      purchasePrice: 240000,    // prix d'achat acte notarié (5 nov 2019) — hors frais notaire
      purchaseDate: '2019-11',  // acte notarié date achat exemple
      purchaseDateLabel: 'date achat exemple',
      // ── Appréciation réaliste par phase ──
      // 2026-2029 : 0.5%/an — marché plat, station L15 Rueil lointaine (~2030-2032),
      //   quartier Fouilleuse/Mazurières sous-performe le reste de Rueil (-37% vs ville)
      //   MeilleursAgents: 4 445€/m² allée des Glycines vs 5 920€ ville
      //   Orpi: prix Rueil -1.5% sur 2 ans (2023-2025)
      // 2030+ : 1.5%/an — si L15 Ouest ouvre, effet indirect (station à 15-20 min à pied)
      // Moyenne lissée sur 10 ans ≈ 1.0%/an
      appreciation: 0.01,        // 1.0%/an (moyenne lissée, effet L15 indirect et tardif)
      appreciationPhases: [
        { start: 2026, end: 2029, rate: 0.005, note: 'Marché plat, L15 Ouest pas avant 2030-2032' },
        { start: 2030, end: 2040, rate: 0.015, note: 'L15 Ouest ouvre, effet indirect à 15-20 min à pied' },
      ],
      type: 'T3 meublé — LMNP',
      ligne15: { station: 'Rueil-Suresnes', distance: '15-20 min à pied', opening: '2030-2032' },
      details: {
        lot: '894',
        floor: 'RDC',
        building: 'Bâtiment IX, escalier A',
        type: 'T3',
        yearBuilt: '1949-1974',
        developer: null,
        program: 'Résidence exemple',
        norm: null,
        heating: 'Chauffage collectif, eau chaude collective',
        dpe: null,
        rooms: [
          { name: 'Entrée + placard', surface: 4.39 },
          { name: 'Dégagement', surface: 3.25 },
          { name: 'Cuisine', surface: 6.11 },
          { name: 'Salon', surface: 16.62 },
          { name: 'Chambre 1 + placard', surface: 11.49 },
          { name: 'Chambre 2', surface: 9.60 },
          { name: 'WC', surface: 0.99 },
          { name: 'Salle de bain', surface: 3.21 },
        ],
        surfaceHabitable: 55.66,
        loggia: null,
        surfaceTotale: 55.66,
        parking: false,
        cave: true,
        caveLots: ['924 (cave)', '954 (séchoir)'],
        tantiemes: '249/100000',
        exposure: null,
      },
    },
    villejuif: {
      address: '167 Exemple adresse, Casablanca',
      surface: 68.92,           // m²
      purchasePrice: 349456,    // prix d'achat total opération VEFA
      totalOperation: 349456,   // montant total opération VEFA
      purchaseDate: '2025-04',  // signature VEFA
      deliveryDate: '2029-06',  // livraison été 2029
      // ── Appréciation réaliste par phase ──
      // 2025-2028 : 3.0%/an — L15 Sud ouverture avril 2027, déjà L14 prolongée,
      //   en face station Villejuif Louis Aragon (future L15), pôle santé Gustave Roussy
      //   MeilleursAgents: Bd Gorki ~5 138€/m², hausse +20% entre 2021-2025
      //   efficity: 5 050€/m² jan 2026, +6% vs ville
      // 2029+ : 1.5%/an — livraison du bien, L15 roulera depuis 2 ans, effet déjà pricé
      // Moyenne lissée sur 10 ans ≈ 2.0%/an
      appreciation: 0.02,        // 2.0%/an (moyenne lissée, hub L14+L15, pôle santé)
      appreciationPhases: [
        { start: 2025, end: 2028, rate: 0.030, note: 'Anticipation L15 + L14 déjà là, pôle santé Gustave Roussy' },
        { start: 2029, end: 2040, rate: 0.015, note: 'Livraison bien, L15 roulera depuis 2 ans, effet pricé' },
      ],
      type: 'T3 — VEFA — LMNP',
      ligne15: { station: 'Villejuif Louis Aragon', distance: 'En face (<1 min)', opening: '2027-04' },
      details: {
        lot: 'A27',
        floor: '2ème étage',
        building: null,
        type: 'T3',
        yearBuilt: 2029,
        developer: 'Fair\' Promotion',
        program: 'Programme exemple 2',
        norm: 'RE2020, PMR évolutif',
        heating: null,
        dpe: null,
        rooms: [
          { name: 'Entrée', surface: 3.60 },
          { name: 'Séjour/Cuisine', surface: 35.09 },
          { name: 'Chambre 1', surface: 11.24 },
          { name: 'Chambre 2', surface: 11.24 },
          { name: 'Salle de bain', surface: 5.45 },
          { name: 'WC', surface: 2.32 },
        ],
        surfaceHabitable: 68.94,
        loggia: 9.51,
        surfaceTotale: 78.45,
        parking: false,
        cave: false,
        exposure: 'Sud-Ouest',
      },
    },
  },
};

// ════════════════════════════════════════════════════════════
// FRAIS DE SORTIE IMMOBILIER — Plus-value, agence, notaire
//
// Permet de calculer la "net equity après sortie" à tout moment.
// La plus-value immobilière des NON-RÉSIDENTS est taxée à :
//   - IR : 19% (taux forfaitaire non-résident)
//   - PS : 17.2% (prélèvements sociaux)
//   - Surtaxe : 0-6% si PV > 50K€
//   = Total de base : 36.2%
//
// Abattements progressifs selon la durée de détention :
//   IR (19%) : exonéré après 22 ans
//   PS (17.2%) : exonéré après 30 ans
//
// Sources : BOFiP, CGI art. 150 U / 150 VB / 150 VC
// ════════════════════════════════════════════════════════════
export const EXIT_COSTS = {
  // Abattements IR (par année de détention, à partir de la 6ème année)
  // Années 1-5 : 0%  |  Années 6-21 : 6%/an  |  Année 22 : 4%  →  100% après 22 ans
  irAbattement: [
    { fromYear: 1, toYear: 5, ratePerYear: 0 },
    { fromYear: 6, toYear: 21, ratePerYear: 0.06 },
    { fromYear: 22, toYear: 22, ratePerYear: 0.04 },
    // Au-delà de 22 ans : exonéré (100%)
  ],
  // Abattements PS (par année de détention)
  // Années 1-5 : 0%  |  Années 6-21 : 1.65%/an  |  Année 22 : 1.60%  |  Année 23-30 : 9%/an  →  100% après 30 ans
  psAbattement: [
    { fromYear: 1, toYear: 5, ratePerYear: 0 },
    { fromYear: 6, toYear: 21, ratePerYear: 0.0165 },
    { fromYear: 22, toYear: 22, ratePerYear: 0.016 },
    { fromYear: 23, toYear: 30, ratePerYear: 0.09 },
    // Au-delà de 30 ans : exonéré (100%)
  ],
  irRate: 0.19,     // Taux forfaitaire non-résident
  psRate: 0.172,    // Prélèvements sociaux
  // Surtaxe sur plus-values élevées (CGI art. 1609 nonies G)
  surtaxe: [
    { from: 0,      to: 50000,  rate: 0 },
    { from: 50001,  to: 100000, rate: 0.02 },
    { from: 100001, to: 150000, rate: 0.03 },
    { from: 150001, to: 200000, rate: 0.04 },
    { from: 200001, to: 250000, rate: 0.05 },
    { from: 250001, to: Infinity, rate: 0.06 },
  ],
  // Frais d'agence (à la charge du vendeur en France)
  agencyFeePct: 0.04,    // ~4% du prix de vente (fourchette 3-5%)
  // Diagnostics obligatoires avant vente
  diagnosticsCost: 500,  // DPE, amiante, plomb, etc.
  // Frais de mainlevée hypothécaire si prêt en cours
  mainleveeFixe: 500,    // Frais fixes huissier/notaire
  mainleveePct: 0.003,   // ~0.3% du capital initial emprunté

  // Indemnités de remboursement anticipé (IRA)
  // Plafond légal : min(6 mois d'intérêts, 3% du CRD)
  // PTZ et Prêt aidé : 0€ d'IRA (remboursement anticipé sans pénalité)
  iraMonthsInterest: 6,  // 6 mois d'intérêts restants
  iraPctCRD: 0.03,       // 3% du CRD
  iraExemptTypes: ['ptz', 'action-logement'],  // pas d'IRA sur ces prêts

  // ── Contraintes spécifiques par dispositif ──
  vitry: {
    // TVA 5.5% — Article 278 sexies du CGI
    // Si revente avant 10 ans : remboursement du différentiel TVA (20% - 5.5% = 14.5%)
    // Prorata temporis : 1/10ème par année restante
    tvaReduite: {
      tauxReduit: 0.055,
      tauxNormal: 0.20,
      dureeEngagement: 10,       // années depuis livraison
      prixHTApprox: 260000,      // prix HT approximatif (275K TTC à TVA 5.5%)
      dateLivraison: '2025-07',  // obligation 10 ans commence à la livraison VEFA
      dateFinObligation: '2035-07', // fin obligation TVA
    },
    // PTZ — Prêt à Taux Zéro
    // Doit occuper comme résidence principale pendant 6 ans (2023-2029)
    // Remboursement anticipé sans pénalité (pas de frais de sortie PTZ)
    // Mais si mis en location avant 6 ans : peut être rappelé
    ptz: {
      dureeOccupation: 6,        // années en résidence principale (ou assimilé)
      dateDebut: '2023-11',      // premier déblocage PTZ ~novembre 2023
      dateFin: '2029-12',        // fin obligation RP (~décembre 2029)
      differeTotalMois: 60,      // 60 mois de différé total
      montant: 60000,
      mensualite: 333,           // ~333€/mois après fin du différé (dec 2028)
      note: 'Location nue possible après 6 ans. Meublé possible après PTZ. Rappel CRD si infraction.',
    },
    // Prêt aidé
    // Conditions : plafond de ressources du locataire
    // Pas de pénalité spécifique à la revente, mais le prêt doit être remboursé
    actionLogement: {
      montant: 40000,
      taux: 0.01,               // 1%/an
      duree: 300,               // 300 mois (25 ans)
      dateDebut: '2023-02',
      dateFin: '2048-02',       // obligation RP jusqu'à fin prêt
      plafondRessources: true,   // locataire doit respecter plafonds PLS
      sanction: 'Rappel immédiat du CRD (40K€)',
      note: 'Obligation RP toute la durée du prêt. Rappel CRD en cas de manquement.',
    },
  },
  rueil: {
    // Pas de dispositif particulier — achat classique ancien
    // LMNP : pas de contrainte de revente spécifique
    // Mais : si LMNP réel, les amortissements déduits sont réintégrés
    // dans le calcul de la plus-value (amortissements = majoration du prix d'achat !)
    // Attention : depuis loi de finances 2025, les amortissements LMNP
    // sont désormais réintégrés dans le calcul de la PV (art. 150 VB bis CGI)
    lmnpAmortReintegration: true,
    note: 'LMNP réel : amortissements réintégrés dans la PV depuis 2025 (loi de finances 2025)',
    timeline: [
      { date: '2019-11', event: 'Acte notarié signé (5 nov 2019) — achat 240K€', icon: 'doc', done: true },
      { date: '2019-12', event: 'Début prêt Banque exemple (251K€ à 1.20%, 25 ans)', icon: 'bank', done: true },
      { date: '2019-12', event: 'Résidence principale Nezha', icon: 'home', done: true },
      { date: '2025-09', event: 'Bail meublé signé (Docusign 25/09/2025) — passage LMNP réel', icon: 'doc', done: true },
      { date: '2025-10', event: 'Début location meublée (1 300€ HC + 150€ charges)', icon: 'key', done: true },
      { date: '2025-11', event: '6 ans détention — abattement PV IR 6%', icon: 'tax', done: true },
      { date: '2026-10', event: 'Fin bail initial (1 an) → reconduction tacite', icon: 'doc' },
      { date: '2030-11', event: '11 ans détention — abattement IR 36%, PS 8.25%', icon: 'tax' },
      { date: '2041-11', event: '22 ans détention — exonération totale IR (100%)', icon: 'free' },
      { date: '2044-12', event: 'Fin prêt Crédit Mutuel (25 ans)', icon: 'check' },
      { date: '2049-11', event: '30 ans détention — exonération totale IR + PS (100%)', icon: 'free' },
    ],
  },
  villejuif: {
    // VEFA en cours — pas encore livré
    // LMNP ou JEANBRUN selon le choix
    // Si LMNP réel : même règle de réintégration des amortissements
    lmnpAmortReintegration: true,
    note: 'VEFA — choix régime à faire avant livraison (été 2029)',
    timeline: [
      { date: '2025-04', event: 'Signature VEFA (réservation — 3 600€ versés)', icon: 'doc', done: true },
      { date: '2025-08', event: 'Offre de prêt LCL (287K + 32K, franchise 36 mois)', icon: 'bank' },
      { date: '2026-06', event: 'Choix régime fiscal (LMNP vs Jeanbrun) — décision avant livraison', icon: 'tax' },
      { date: '2027-04', event: 'Ouverture L15 Sud — station Villejuif Louis Aragon', icon: 'metro' },
      { date: '2028-08', event: 'Fin franchise → début remboursement (1 698€/mois)', icon: 'money' },
      { date: '2029-06', event: 'Livraison VEFA + remise des clés', icon: 'key' },
      { date: '2029-09', event: 'Début location (LMNP ou Jeanbrun)', icon: 'home' },
      { date: '2031-06', event: 'Fin exonération TF (construction neuve 2 ans)', icon: 'tax' },
      { date: '2035-04', event: '10 ans détention — abattement PV IR commence', icon: 'tax' },
      { date: '2052-08', event: 'Fin prêts LCL (Prêt 1 + Prêt 2)', icon: 'check' },
      { date: '2055-04', event: '30 ans détention — exonération totale IR + PS', icon: 'free' },
    ],
  },
};

// ════════════════════════════════════════════════════════════
// CONTRAINTES VITRY — Rappel de toutes les obligations
// liées aux dispositifs de financement et TVA réduite
// ════════════════════════════════════════════════════════════
export const VITRY_CONSTRAINTS = {
  summary: 'Vitry cumule 4 dispositifs avec obligations : Anti-spéculation, TVA 5.5%, PTZ, Prêt aidé',
  constraints: [
    {
      dispositif: 'Anti-Spéculation (Municipal)',
      reference: 'Acte de vente art. 5.1.3',
      obligation: 'Interdiction de revente avec profit pendant 5 ans',
      dateDebut: '2023-01',
      dateFin: '2028-01',       // 5 ans depuis acte 16/01/2023
      penalite: 'Reversement de 100% du profit net à la commune',
      details: [
        'Clause anti-spéculation inscrite dans l\'acte notarié du 16/01/2023',
        'Durée : 5 ans → expire le 16 janvier 2028',
        'Si vente avant : 100% de la plus-value nette reversée à la mairie',
        'Après 5 ans : aucune contrainte, vente libre',
      ],
      status: 'actif',
      yearsRemaining: 2,  // à partir de mars 2026
    },
    {
      dispositif: 'TVA 5.5%',
      reference: 'CGI art. 278 sexies',
      obligation: 'Résidence principale pendant 10 ans depuis livraison',
      dateDebut: '2025-07',     // obligation depuis livraison VEFA
      dateFin: '2035-07',       // 10 ans depuis livraison juillet 2025
      penalite: 'Remboursement différentiel TVA (14.5% × prix HT) au prorata des années restantes',
      details: [
        'Bien acheté 275 000€ TTC à TVA 5.5% au lieu de 20%',
        'Économie TVA : 37 796€ (différentiel 14.5% × 260 000€ HT)',
        'Obligation : RP 10 ans depuis livraison VEFA (juillet 2025)',
        'Pénalité dégressive : -1/10ème par an',
        'Après juillet 2035 : aucune pénalité — conversion LMNP possible',
        'Zone ANRU / QPV Balzac — condition de localisation respectée',
        'RP maintenue via déclaration fiscale conjointe (Nezha résidente France)',
      ],
      status: 'actif',
      yearsRemaining: 9,  // à partir de mars 2026
    },
    {
      dispositif: 'PTZ (Prêt à Taux Zéro)',
      reference: 'Code de la construction L.31-10-6',
      obligation: 'Résidence principale ou assimilé pendant 6 ans',
      dateDebut: '2023-11',     // premier déblocage PTZ
      dateFin: '2029-12',       // fin obligation RP (~décembre 2029)
      penalite: 'Rappel du prêt PTZ (remboursement immédiat de 60 000€)',
      details: [
        'Montant PTZ : 60 000€ à 0%',
        'Différé total : 60 mois → début remboursement ~décembre 2028',
        'Mensualité post-différé : ~333€/mois',
        'Obligation : RP pendant 6 ans (jusqu\'à ~décembre 2029)',
        'Location nue autorisée (motif légitime : éloignement professionnel)',
        'Conditions : bail nu, plafonds PLS, notification LRAR',
        'Après décembre 2029 : meublé possible, conversion LMNP envisageable',
        'Remboursement anticipé : sans pénalité ni frais',
      ],
      status: 'actif',
      yearsRemaining: 4,
    },
    {
      dispositif: 'Prêt aidé',
      reference: 'Convention entre employeur et Prêt aidé Services',
      obligation: 'Résidence principale pendant toute la durée du prêt',
      dateDebut: '2023-02',
      dateFin: '2048-02',       // 25 ans
      penalite: 'Rappel immédiat du CRD (40 000€)',
      details: [
        'Montant : 40 000€ à 1%',
        'Obligation RP pendant toute la durée (25 ans → février 2048)',
        'Sanction si manquement : rappel immédiat du capital restant dû',
        'Le locataire doit respecter les plafonds de ressources PLS',
        'Fréquence d\'audit : rare',
        'Remboursement anticipé : possible sans pénalité',
      ],
      status: 'actif',
      yearsRemaining: 22,
    },
    {
      dispositif: 'Location nue (régime foncier)',
      reference: 'CGI art. 14 / 28',
      obligation: 'Déclaration des revenus fonciers de source française',
      dateDebut: '2026-04',
      dateFin: null,
      penalite: 'Redressement fiscal si non-déclaration',
      details: [
        'Non-résident UAE : IR 20% minimum + PS 17.2% = 37.2%',
        'Régime réel foncier (intérêts + charges déductibles)',
        'Loyer déclaré : 500€/mois (partie bail officiel)',
        'Complément en espèces non déclaré (stratégie Scénario D)',
        'Loyer de marché comparable : 1 250€ HC (référence rapport stratégique)',
        'Justification loyer bas : 6 clauses (état équipement, parking, acoustique, QPV, GPE, stabilité)',
      ],
      status: 'actif',
      yearsRemaining: null,
    },
  ],
  timeline: [
    { date: '2023-01', event: 'Acte notarié VEFA signé (16 janvier)', icon: 'doc', done: true },
    { date: '2025-07', event: 'Livraison VEFA + début occupation', icon: 'key', done: true },
    { date: '2025-08', event: 'Début prêt BP — intérêts seuls 306€/mois (5 mois)', icon: 'bank', done: true },
    { date: '2026-01', event: 'Début remboursement capital BP (1 021€/mois)', icon: 'money', done: true },
    { date: '2026-04', event: 'Début location nue', icon: 'home' },
    { date: '2027-12', event: 'Fin exonération TF (construction neuve 2 ans)', icon: 'tax' },
    { date: '2028-01', event: 'Fin clause anti-spéculation (5 ans)', icon: 'unlock' },
    { date: '2028-12', event: 'Fin différé PTZ → début remboursement 333€/mois', icon: 'money' },
    { date: '2029-12', event: 'Fin obligation RP PTZ (6 ans) → meublé possible', icon: 'unlock' },
    { date: '2035-07', event: 'Fin obligation TVA 5.5% (10 ans livraison) → LMNP possible', icon: 'free' },
    { date: '2043-11', event: 'Fin prêt PTZ', icon: 'check' },
    { date: '2048-02', event: 'Fin prêt Prêt aidé + fin obligation RP', icon: 'check' },
    { date: '2048-12', event: 'Fin prêt Banque exemple 2 (Riv\'immo)', icon: 'check' },
  ],
};

// ════════════════════════════════════════════════════════════
// VILLEJUIF — Comparaison JEANBRUN vs LMNP vs LMP
//
// Le bien sera livré été 2029. Il faut choisir le régime AVANT.
// 3 options :
//   1. Dispositif JEANBRUN (neuf, loi 2025) — location nue
//   2. LMNP réel (meublé) — avec amortissement
//   3. LMP (si seuil dépassé) — meublé professionnel
//
// Paramètres de simulation :
//   - Meublé : +3 000€ de mobilier initial + +100€ de loyer/mois
//   - Nue (JEANBRUN) : pas de frais mobilier, loyer de base
// ════════════════════════════════════════════════════════════
export const VILLEJUIF_REGIMES = null;

// ════════════════════════════════════════════════════════════
// HISTORIQUE PATRIMOINE — Points manuels + dernier point live
// Le dernier point (coupleNW/amineNW/nezhaNW = null) est rempli
// dynamiquement par engine.js avec les valeurs actuelles.
// Pour ajouter un point : insérer AVANT la dernière ligne.
// ════════════════════════════════════════════════════════════
// NW_HISTORY: Removed invented historical data (v150)
// This array should be populated with real historical net worth snapshots
// Structure: [{ date: 'YYYY-MM', coupleNW, amineNW, nezhaNW, note? }, ...]
// ════════════════════════════════════════════════════════════
export const NW_HISTORY = [];

// ════════════════════════════════════════════════════════════
// TAUX WHT (Withholding Tax) PAR PAYS
// Applicable aux dividendes pour résident fiscal UAE
// UAE : 0% income tax, mais WHT prélevé à la source par le pays émetteur
// Plus-values : 0% WHT partout → objectif = éliminer les dividendes
// ════════════════════════════════════════════════════════════
export const WHT_RATES = {
  france: 0.30,       // 30% WHT dividendes France (pas de convention FR-UAE, taux de droit commun)
  germany: 0.26375,   // 26.375% WHT dividendes Allemagne
  us: 0.15,           // 15% WHT (convention US via W-8BEN)
  japan: 0.15,        // 15% WHT (convention JP)
  crypto: 0,          // ETFs crypto = pas de dividendes
  morocco: 0.15,      // 15% WHT Maroc
};

// Dividend yields estimés par position (annualisé)
export const DIV_YIELDS = {
  'TTE.PA': 0.055,    // TotalEnergies ~5.5%
  'SU.PA': 0.018,     // Schneider ~1.8%
  'ORA.PA': 0.065,    // Orange ~6.5%
};

// ════════════════════════════════════════════════════════════
// CALENDRIER DIVIDENDES — DPS (Dividend Per Share) + Ex-dates
// Utilisé pour calculer la projection WHT et les deadlines de vente
// Données: mis à jour 8 Mar 2026 (sources: stockanalysis.com, dividendmax.com)
//
// dps: dividende par action (dans la devise de l'action)
// exDates: liste des ex-dividend dates à venir (YYYY-MM-DD)
//   → vendre AVANT cette date pour éviter la WHT
// frequency: 'annual' | 'semi-annual' | 'quarterly'
// ════════════════════════════════════════════════════════════
export const DIV_CALENDAR = {
  'TTE.PA': { dps: 3.01, exDates: ['2026-06-20'], frequency: 'semi-annual' },
  'ORA.PA': { dps: 0.72, exDates: ['2026-06-10'], frequency: 'annual' },
};

// ════════════════════════════════════════════════════════════
// BUDGET — Dépenses mensuelles fixes
// freq: 'monthly' | 'quarterly' | 'yearly'
// zone: 'Dubai' | 'France' | 'Digital'
// type: 'Logement' | 'Crédits' | 'Utilities' | 'Abonnements'
// Les crédits immo sont générés dynamiquement par engine.js depuis IMMO_CONSTANTS.charges
// ════════════════════════════════════════════════════════════
export const BUDGET_EXPENSES = [
  { label: 'Loyer Dubai',     amount: 145000, currency: 'AED', freq: 'yearly',    zone: 'Dubai',   type: 'Logement' },
  { label: 'Électricité',     amount: 840,    currency: 'AED', freq: 'monthly',   zone: 'Dubai',   type: 'Utilities' },
  { label: 'Fibre Internet',  amount: 360,    currency: 'AED', freq: 'monthly',   zone: 'Dubai',   type: 'Utilities' },
  { label: 'Gaz',             amount: 120,    currency: 'AED', freq: 'quarterly', zone: 'Dubai',   type: 'Utilities' },
  { label: 'Téléphone',       amount: 1669,   currency: 'AED', freq: 'yearly',    zone: 'Dubai',   type: 'Abonnements' },
  { label: 'Claude (AI)',     amount: 100,    currency: 'USD', freq: 'monthly',   zone: 'Digital', type: 'Abonnements' },
  { label: 'Spotify',         amount: 75,     currency: 'MAD', freq: 'monthly',   zone: 'Digital', type: 'Abonnements' },
  { label: 'Assurance Classe A', amount: 114,  currency: 'EUR', freq: 'monthly',   zone: 'France',  type: 'Assurance' },
  { label: 'Assurance Porsche Cayenne', amount: 8000, currency: 'AED', freq: 'yearly', zone: 'Dubai', type: 'Assurance' },
  { label: 'Amex Platinum',   amount: 720,    currency: 'EUR', freq: 'yearly',    zone: 'France',  type: 'Abonnements' },
  { label: 'On/Off',          amount: 58.99,  currency: 'EUR', freq: 'yearly',    zone: 'Digital', type: 'Abonnements' },
  { label: 'YouTube Premium', amount: 110,    currency: 'MAD', freq: 'monthly',   zone: 'Digital', type: 'Abonnements' },
  { label: 'Careem Plus',    amount: 19,     currency: 'AED', freq: 'monthly',   zone: 'Dubai',   type: 'Abonnements' },
  { label: 'Noon One',       amount: 25,     currency: 'AED', freq: 'monthly',   zone: 'Dubai',   type: 'Abonnements' },
  { label: 'iCloud+ 2TB',    amount: 39.99,  currency: 'AED', freq: 'monthly',   zone: 'Dubai',   type: 'Abonnements' },
  { label: 'Netflix',        amount: 65,     currency: 'MAD', freq: 'monthly',   zone: 'Digital', type: 'Abonnements' },
];
