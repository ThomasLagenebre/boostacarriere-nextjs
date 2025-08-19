export interface FAQItem {
  question: string;
  response: string;
}

export async function fetchFAQ(): Promise<FAQItem[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des questions FAQ');
    }

    const data = await response.json();
    
    // Vérifier et normaliser la structure des données
    let faqArray: FAQItem[] = [];
    
    if (Array.isArray(data)) {
      // Si c'est directement un tableau
      faqArray = data;
    } else if (data && typeof data === 'object') {
      // Si c'est un objet avec une propriété qui contient le tableau
      if (data.data && Array.isArray(data.data)) {
        faqArray = data.data;
      } else if (data.questions && Array.isArray(data.questions)) {
        faqArray = data.questions;
      } else if (data.items && Array.isArray(data.items)) {
        faqArray = data.items;
      } else {
        // Essayer de convertir l'objet en tableau
        faqArray = Object.values(data).filter(item => 
          item && typeof item === 'object' && 'question' in item && 'response' in item
        ) as FAQItem[];
      }
    }
    
    // Valider que chaque élément a la bonne structure
    faqArray = faqArray.filter(item => 
      item && 
      typeof item === 'object' && 
      typeof item.question === 'string' && 
      typeof item.response === 'string'
    );
    
    // Si aucune donnée valide n'est trouvée, retourner les questions par défaut
    if (faqArray.length === 0) {
      console.warn('Aucune donnée FAQ valide reçue de l\'API, utilisation des questions par défaut');
      return getDefaultFAQ();
    }
    
    return faqArray;
    
  } catch (error) {
    console.error('Erreur fetchFAQ:', error);
    // Retourner des questions par défaut en cas d'erreur
    return getDefaultFAQ();
  }
}

// Fonction séparée pour les questions par défaut
function getDefaultFAQ(): FAQItem[] {
  return [
    {
      question: "Comment fonctionne le coaching individuel ?",
      response: "Le coaching individuel se déroule en sessions personnalisées de 1h à 2h selon vos besoins. Nous commençons par un diagnostic de votre situation actuelle, puis nous définissons ensemble vos objectifs et créons un plan d'action personnalisé. Chaque session est suivie d'un support par email pour maintenir votre motivation."
    },
    {
      question: "Quels sont les délais de livraison pour les formations en ligne ?",
      response: "Les formations en ligne sont accessibles immédiatement après votre achat. Vous recevez un email de confirmation avec vos identifiants de connexion. L'accès est illimité pendant 12 mois, vous permettant de progresser à votre rythme."
    },
    {
      question: "Puis-je annuler ou reporter un coaching ?",
      response: "Oui, vous pouvez annuler ou reporter votre coaching gratuitement jusqu'à 48h avant le rendez-vous. Entre 48h et 24h avant, 50% du montant sera facturé. Moins de 24h avant, 100% du montant sera facturé. En cas de force majeure, le report est possible sans frais sur présentation d'un justificatif."
    },
    {
      question: "Comment se déroule le processus d'inscription ?",
      response: "L'inscription se fait en ligne via notre site. Vous choisissez votre prestation, remplissez le formulaire avec vos informations personnelles et professionnelles, puis procédez au paiement sécurisé. Pour les coachings, vous recevrez ensuite un email pour prendre rendez-vous via notre calendrier en ligne."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      response: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) via notre plateforme de paiement sécurisée Stripe. Pour certains programmes, nous proposons également le paiement en plusieurs fois. Sur devis, nous acceptons le virement bancaire et le chèque."
    },
    {
      question: "Proposez-vous des formations en entreprise ?",
      response: "Oui, nous proposons des formations sur mesure pour les entreprises. Ces formations peuvent être organisées en présentiel dans vos locaux ou en visioconférence. Nous adaptons le contenu à vos besoins spécifiques et à votre secteur d'activité."
    }
  ];
}
