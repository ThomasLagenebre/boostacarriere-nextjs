export interface AdminStats {
  users_count: number;
  users_last_7_days: number;
  users_prev_7_days: number;
  users_diff: number;
  coachings_count: number;
  coachings_last_7_days: number;
  coachings_prev_7_days: number;
  coachings_diff: number;
  orders_count: number;
  orders_last_7_days: number;
  orders_prev_7_days: number;
  orders_diff: number;
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des statistiques admin');
  }
  const data = await res.json();
  return data;
} 