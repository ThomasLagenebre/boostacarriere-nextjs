// Fonction pour extraire l'ID YouTube d'une URL
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  // Nettoyer l'URL en prenant seulement la première occurrence d'une URL YouTube
  let cleanUrl = url;
  
  // Si l'URL contient plusieurs URLs YouTube concaténées, prendre la première
  const firstYouTubeMatch = url.match(/https:\/\/www\.youtube\.com\/watch\?v=([^&\n?#]+)/);
  if (firstYouTubeMatch) {
    // Retourner directement l'ID extrait du premier match
    return firstYouTubeMatch[1];
  }
  
  // Gérer les autres formats d'URL YouTube
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

// Fonction pour parser la durée YouTube (format ISO 8601)
function parseYouTubeDuration(duration: string): number {
  // Format ISO 8601: PT1H2M3S (1 heure, 2 minutes, 3 secondes)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  // Convertir en minutes
  return hours * 60 + minutes + Math.round(seconds / 60);
}

// Fonction pour obtenir la durée d'une vidéo YouTube via l'API
export async function getYouTubeVideoDuration(videoId: string): Promise<number> {
  try {
    // Vous devez remplacer YOUR_API_KEY par votre vraie clé API YouTube
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    
    if (!apiKey) {
      console.warn('YouTube API key not found. Using default duration.');
      return 15; // Durée par défaut
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found');
    }

    const duration = data.items[0]?.contentDetails?.duration;
    
    if (!duration) {
      throw new Error('Duration not available');
    }

    // Parser la durée ISO 8601 et convertir en minutes
    const durationInMinutes = parseYouTubeDuration(duration);
    
    return durationInMinutes;
  } catch (error) {
    console.error('Error fetching YouTube video duration:', error);
    return 15; // Durée par défaut en cas d'erreur
  }
}

// Fonction pour formater la durée en minutes
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`;
} 