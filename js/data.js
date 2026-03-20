// ============================================================
// PATRIMONIAL DASHBOARD — ANONYMIZED TEMPLATE DATA
// ============================================================
// This template demonstrates the structure for a dual-person net worth tracker.
// Replace the data with your own information while keeping the key structure:
// - Keys "amine" and "nezha" MUST remain unchanged (hardcoded in engine.js)
// - Display names can be changed in index.html and render.js
// ============================================================

export const PORTFOLIO = {
  amine: {
    // ──────────────────────────────────────────────────────
    // CASH FRANCE — Comptes courants et livrets
    // ──────────────────────────────────────────────────────
    cash: {
      lclCC: 5000,           // LCL Carte de crédit (0%)
      lclLivretA: 20000,     // LCL Livret A (3.0% défiscalisé)
      revolutEUR: 0,         // Revolut EUR (à remplir si applicable)
    },

    // ──────────────────────────────────────────────────────
    // CASH UAE — Comptes aux Émirats
    // ──────────────────────────────────────────────────────
    uae: {
      mashreq: 0,            // Mashreq NEO PLUS — à remplir si applicable
      wioSavings: 0,         // Wio Savings (à remplir si applicable)
      wioCurrent: 0,         // Wio Current (à remplir si applicable)
      revolutEUR: 0,         // Revolut EUR balance (à remplir si applicable)
    },

    // ──────────────────────────────────────────────────────
    // CASH MAROC — Comptes au Maroc
    // ──────────────────────────────────────────────────────
    maroc: {
      attijari: 50000,       // Attijariwafa Courant (0%)
      nabd: 0,               // Nabd / autres (à remplir si applicable)
    },

    // ──────────────────────────────────────────────────────
    // ESPP ACCENTURE — Stock options si applicable
    // ──────────────────────────────────────────────────────
    espp: {
      shares: 0,             // À mettre à jour depuis Fidelity NetBenefits
      cashEUR: 0,            // Cash résiduel en EUR
      lots: [],              // Lot historique (format: { date, source, shares, costBasis })
      totalCostBasisUSD: 0,
    },

    // ──────────────────────────────────────────────────────
    // IBKR — Interactive Brokers
    // ──────────────────────────────────────────────────────
    ibkr: {
      staticNAV: 25000,      // NAV totale du rapport "Net Asset Value"
      positions: [
        // Exemple simplifié : 3 positions European
        { ticker: 'BN.PA',   shares: 50,   price: 62.00,  costBasis: 60.00, currency: 'EUR', label: 'BNP Paribas', sector: 'finance', geo: 'france', ytdOpen: 60.00, mtdOpen: 61.00, oneMonthAgo: 60.50 },
        { ticker: 'BNPPE',   shares: 100,  price: 55.00,  costBasis: 54.00, currency: 'EUR', label: 'TotalEnergies', sector: 'energy', geo: 'france', ytdOpen: 56.00, mtdOpen: 54.50, oneMonthAgo: 55.00 },
        { ticker: 'AIR.PA',  shares: 10,   price: 170.00, costBasis: 168.00, currency: 'EUR', label: 'Air Liquide', sector: 'industrials', geo: 'france', ytdOpen: 169.00, mtdOpen: 171.00, oneMonthAgo: 170.50 },
      ],
      // Cash multi-devises
      cashEUR: 500,
      cashUSD: 0,
      cashJPY: 0,
      // Performance metrics
      meta: {
        twr: 5,              // Time-Weighted Return % (depuis ouverture)
        realizedPL: 0,       // Realized P&L
        dividends: 0,        // Gross dividends received
        commissions: -50,    // Transaction fees
      },
      // Historique des dépôts
      deposits: [
        { date: '2025-01-01', amount: 25000, currency: 'EUR', fxRateAtDate: 1, label: 'Dépôt initial' },
      ],
      // Historique complet des trades
      trades: [],            // À remplir avec vos transactions
    },

    // ──────────────────────────────────────────────────────
    // IMMOBILIER — Biens immobiliers
    // ──────────────────────────────────────────────────────
    immo: {
      vitry: {
        value: 250000,       // Valeur estimée
        valueDate: '2026-01',
        crd: 200000,         // Capital restant dû
        loyerHC: 0,          // Loyer mensuel (0 si résidence principale)
        chargesLocataire: 0,
      },
    },

    // ──────────────────────────────────────────────────────
    // VÉHICULE
    // ──────────────────────────────────────────────────────
    vehicle: 15000,          // Valeur du/des véhicule(s)

    // ──────────────────────────────────────────────────────
    // CREANCES — Prêts consentis
    // ──────────────────────────────────────────────────────
    creances: {
      items: [],             // Format: { label, amount, currency, guaranteed, probability, status, dueDate, ... }
    },

    // ──────────────────────────────────────────────────────
    // TVA À PAYER
    // ──────────────────────────────────────────────────────
    tva: 0,                  // TVA à payer (négatif = dette)
  },

  // ════════════════════════════════════════════════════════
  // PERSONNE 2 (NEZHA)
  // ════════════════════════════════════════════════════════
  nezha: {
    // ── Cash détaillé ──
    cash: {
      sgCC: 8000,            // Société Générale compte courant
      assuranceVie: 30000,   // Assurance vie / Livret
      revolutEUR: 0,         // Revolut (à remplir si applicable)
      creditMutuelCC: 0,     // Autres comptes (à remplir si applicable)
      lclLivretA: 0,
      lclCompteDepots: 0,
      attijariwafarMAD: 30000, // Maroc
      wioAED: 0,             // UAE (à remplir si applicable)
    },

    sgtm: { shares: 0 },     // SGTM Bourse Casablanca (si applicable)

    // ── ESPP si applicable ──
    espp: {
      shares: 0,
      cashUSD: 0,
      totalCostBasisUSD: 0,
      lots: [],
    },

    // ── Créances / prêts consentis ──
    creances: {
      items: [],
    },

    // ── Caution locative (si applicable) ──
    cautionRueil: 0,         // Dépôt de garantie reçu (à déduire)

    // ── IMMOBILIER ──
    immo: {
      rueil: {
        value: 300000,       // Valeur estimée
        valueDate: '2026-01',
        crd: 240000,         // Capital restant dû
        loyerHC: 1300,       // Loyer mensuel
        chargesLocataire: 150,
      },
      villejuif: {
        value: 0,            // À remplir si/quand applicable
        valueDate: '2026-01',
        crd: 0,              // Capital restant dû
        loyerHC: 0,
        chargesLocataire: 0,
        signed: false,       // Acte non signé
        reservationFees: 0,  // Frais de réservation payés
      },
    },
  },

  // ════════════════════════════════════════════════════════
  // PRIX DE MARCHÉ GLOBAUX
  // ════════════════════════════════════════════════════════
  market: {
    sgtmPriceMAD: 717,       // Cours SGTM en MAD
    sgtmCostBasisMAD: 420,   // Prix d'achat
    acnPriceUSD: 201.63,     // Cours Accenture en USD
    acnYtdOpen: 259.95,      // ACN clôture début d'année
    acnMtdOpen: 205.93,      // ACN clôture début du mois
    acnOneMonthAgo: 240.86,  // ACN clôture ~1 mois avant
  },
};

// ════════════════════════════════════════════════════════════
// DATE DE DERNIÈRE MISE À JOUR
// Format : 'JJ/MM/YYYY'
// ════════════════════════════════════════════════════════════
export const DATA_LAST_UPDATE = '19/03/2026';

// ════════════════════════════════════════════════════════════
// PRIX STATIQUES DEGIRO (si applicable)
// ════════════════════════════════════════════════════════════
export const DEGIRO_STATIC_PRICES = {};

// ════════════════════════════════════════════════════════════
// RENDEMENTS DES LIVRETS
// ════════════════════════════════════════════════════════════
export const CASH_YIELDS = {
  livretA: 0.03,             // Livret A — 3%
  creditMutuel: 0,           // Compte courant — 0%
  lclCC: 0,
  revolutEUR: 0,
  mashreq: 0,
  wioSavings: 0.06,          // Wio — ~6% annualisé (à vérifier)
  wioCurrent: 0,
  attijari: 0,
  nabd: 0,
  sgCC: 0,
  assuranceVie: 0.02,        // Assurance vie — ~2% (exemple)
};

export const INFLATION_RATE = 0.03; // 3% annuel

// ════════════════════════════════════════════════════════════
// CONFIGURATION IBKR (non utilisée directement mais gardée)
// ════════════════════════════════════════════════════════════
export const IBKR_CONFIG = {
  accountId: 'U12345678',    // À remplacer par votre ID IBKR
  fetchURL: 'https://api.ibkr.com/...',
  refreshInterval: 3600000,  // 1 heure en ms
};

// ════════════════════════════════════════════════════════════
// TAUX DE CHANGE STATIQUES
// ════════════════════════════════════════════════════════════
export const FX_STATIC = {
  EUR: 1,
  MAD: 10.85,
  AED: 4.25,
  USD: 1.10,
  JPY: 160.50,
};

// ════════════════════════════════════════════════════════════
// CONFIGURATION DEVISES
// ════════════════════════════════════════════════════════════
export const CURRENCY_CONFIG = {
  symbols: {
    EUR: '€',
    USD: '$',
    MAD: 'د.م.',
    AED: 'د.إ',
    JPY: '¥',
  },
  symbolAfter: {
    EUR: false,
    USD: false,
    MAD: true,
    AED: true,
    JPY: true,
  },
};

// ════════════════════════════════════════════════════════════
// CONSTANTES IMMOBILIÈRES
// ════════════════════════════════════════════════════════════
export const IMMO_CONSTANTS = {
  // Taux d'appréciation annuelle estimée par région/type
  appreciation: {
    vitry: 0.02,             // 2% annuel pour Vitry
    rueil: 0.025,            // 2.5% annuel pour Rueil
    villejuif: 0.03,         // 3% annuel pour Villejuif (neuf)
  },

  // Charges immobilières annuelles (incluent taxes, maintenance, etc.)
  charges: {
    vitry: { annual: 1200, monthly: 100 },
    rueil: { annual: 1800, monthly: 150 },
    villejuif: { annual: 2400, monthly: 200 },
  },

  // Prêts hypothécaires — structure simplifiée
  prets: {
    vitry: {
      lender: 'LCL',
      initialAmount: 250000,
      startDate: '2020-01-15',
      endDate: '2045-01-15',
      rate: 0.015,           // 1.5% fixe
      remainingTermMonths: 240,
    },
    rueil: {
      lender: 'Société Générale',
      initialAmount: 250000,
      startDate: '2019-11-01',
      endDate: '2044-11-01',
      rate: 0.018,           // 1.8% fixe
      remainingTermMonths: 228,
    },
    villejuif: {
      lender: 'Crédit Mutuel',
      initialAmount: 350000,
      startDate: '2026-06-01',
      endDate: '2046-06-01',
      rate: 0.02,            // 2.0% fixe
      remainingTermMonths: 240,
    },
  },

  // Fiscalité locative
  fiscalite: {
    villejuif: {
      regime: 'VEFA',        // VEFA = Vente en État Futur d'Achèvement
      microBic: false,
      deficitImputable: true,
    },
    vitry: {
      regime: 'classique',
      microBic: false,
      deficitImputable: true,
    },
    rueil: {
      regime: 'LMNP',        // Meublé
      microBic: true,
      deficitImputable: true,
    },
  },

  // Biens immobiliers
  properties: {
    vitry: {
      address: '19 Rue de l\'Exemple, Vitry-sur-Seine',
      surface: 67,
      type: 'apartment',
      rentRegime: 'location nue',
    },
    rueil: {
      address: '21 Allée de l\'Exemple, Rueil-Malmaison',
      surface: 56,
      type: 'apartment',
      rentRegime: 'meublé touristique',
    },
    villejuif: {
      address: '167 Boulevard de l\'Exemple, Villejuif',
      surface: 69,
      type: 'apartment',
      rentRegime: 'location (futur)',
    },
  },
};

// ════════════════════════════════════════════════════════════
// FRAIS DE SORTIE (vente immobilière, impôts, etc.)
// ════════════════════════════════════════════════════════════
export const EXIT_COSTS = {
  // Frais d'agence immobilière
  realEstateFee: 0.07,       // 7% du prix de vente

  // Frais notariés (environ 8% sur l'immobilier ancien, 2-3% neuf)
  notaryFeeUsed: 0.08,       // 8% ancien
  notaryFeeNew: 0.025,       // 2.5% neuf (VEFA)

  // Frais de mutation / droits d'enregistrement
  transferTax: 0.06,         // 6% (exemple France)

  // Coûts de transaction sur actions/crypto
  brokerage: 0.002,          // 0.2%
  slippage: 0.005,           // 0.5% (écart bid-ask)

  // Frais de refinancement hypothécaire
  refinancingFee: 0.015,     // 1.5% du montant refinancé
};

// ════════════════════════════════════════════════════════════
// CONTRAINTES / LIMITATIONS VITRY (si applicable)
// ════════════════════════════════════════════════════════════
export const VITRY_CONSTRAINTS = {
  // Contraintes de vente/location selon régime fiscal
  constraints: {
    occupancy: {
      minOccupancyPct: 0.6,  // Minimum 60% occupé
      consequences: 'Perte d\'avantage fiscal',
    },
    rent: {
      maxRentIncrease: 0.01, // Maximum 1% par an
      basis: 'IRL',          // Indice de référence des loyers
    },
    holding: {
      minYears: 9,           // Minimum 9 ans pour la réduction d\'impôt
      year1Available: false, // Dès la 1ère année?
    },
  },
};

// ════════════════════════════════════════════════════════════
// RÉGIMES VILLEJUIF (VEFA)
// ════════════════════════════════════════════════════════════
export const VILLEJUIF_REGIMES = null;

// ════════════════════════════════════════════════════════════
// HISTORIQUE NET WORTH (pour graphiques évolutifs)
// ════════════════════════════════════════════════════════════
export const NW_HISTORY = [];

// ════════════════════════════════════════════════════════════
// RETENUE À LA SOURCE (impôts sur dividendes)
// ════════════════════════════════════════════════════════════
export const WHT_RATES = {
  default: 0.15,             // 15% par défaut
  france: 0.12,              // 12% France
  usa: 0.15,                 // 15% USA
  germany: 0.26,             // 26% Allemagne
};

// ════════════════════════════════════════════════════════════
// RENDEMENTS DES DIVIDENDES (estimations)
// ════════════════════════════════════════════════════════════
export const DIV_YIELDS = {
  'BN.PA': 0.015,            // Danone
  'SAN.PA': 0.028,           // Sanofi
  'MC.PA': 0.008,            // LVMH
  'OR.PA': 0.012,            // L'Oréal
  'AIR.PA': 0.018,           // Airbus
  'DG.PA': 0.024,            // Vinci
};

// ════════════════════════════════════════════════════════════
// CALENDRIER VERSEMENT DIVIDENDES
// ════════════════════════════════════════════════════════════
export const DIV_CALENDAR = {
  'BN.PA': {
    name: 'Danone',
    exDate: '2026-05-01',
    payDate: '2026-05-15',
  },
  'SAN.PA': {
    name: 'Sanofi',
    exDate: '2026-04-15',
    payDate: '2026-05-01',
  },
};

// ════════════════════════════════════════════════════════════
// BUDGET MENSUEL (Exemple pour simulations)
// ════════════════════════════════════════════════════════════
export const BUDGET_EXPENSES = [
  { category: 'Rent/Housing', monthly: 0 },
  { category: 'Utilities', monthly: 150 },
  { category: 'Groceries', monthly: 600 },
  { category: 'Transport', monthly: 200 },
  { category: 'Insurance', monthly: 300 },
  { category: 'Miscellaneous', monthly: 400 },
];
