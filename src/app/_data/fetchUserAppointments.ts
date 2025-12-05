export interface AppointmentAPI {
  appointmentableType: string;
  appointmentableId: number;
  planedTo: string; // format "27/07/2025 06:08"
  planedToDetails: {
    year: number;
    month: number;
    day: number;
    hour: number;
  };
  category: string;
  createdAt: string;
  updatedAt: string;
  // Optionally: add product/name if available in your real API
}

export async function fetchUserAppointments(userId: number): Promise<AppointmentAPI[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/user/${userId}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des rendez-vous');
  }
  const data = await res.json();
  return data.data || [];
} 