export async function createFormation(formData: FormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/formations`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la création de la formation');
  }

  const data = await response.json();
  return data;
} 