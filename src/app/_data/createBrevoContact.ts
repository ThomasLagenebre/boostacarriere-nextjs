import Cookies from 'js-cookie';

interface CreateBrevoContactData {
  email: string;
  firstname: string;
  lastname: string;
}

interface CreateBrevoContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const createBrevoContact = async (data: CreateBrevoContactData): Promise<CreateBrevoContactResponse> => {
  try {
    const token = Cookies.get('auth_token');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter-registers`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return {
      success: true,
      message: 'Contact créé avec succès',
      data: responseData.data
    };
  } catch (error) {
    console.error('Error creating Brevo contact:', error);
    throw new Error(error instanceof Error ? error.message : 'Une erreur est survenue lors de la création du contact');
  }
}; 