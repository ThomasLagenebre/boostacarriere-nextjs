import Cookies from 'js-cookie';

interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
  adress: string;
  zip_code: number;
  city: string;
  noted: string;
  role_id: number;
  description: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: any;
  token: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const registerData = await response.json();
    
    // Retourner les données d'inscription sans faire de login automatique
    return registerData;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  console.log('Login: Je suis dans la fonction login');
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const authData = await response.json();

    // Store the token in cookies instead of localStorage
    Cookies.set('auth_token', authData.token, { 
      expires: 7,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: false // Permet l'accès côté client
    });

    window.location.reload();
    return authData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}; 

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cookies.get('auth_token')}`
      },
    });
    if (!response.ok) {
      console.log('Logout: Erreur lors de la déconnexion', response);
      throw new Error('Logout failed');
    }
    Cookies.remove('auth_token');
    console.log('Logout: Déconnexion réussie');
    window.location.reload();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
