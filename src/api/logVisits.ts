import "dotenv/config"

export async function logVisits() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/visit", { method: 'POST' });
    if (!res.ok) throw new Error('Failed to log visit');
    return await res.json();
  } catch (error) {
    console.error('Error logging visit:', error);
    return null;
  }
}