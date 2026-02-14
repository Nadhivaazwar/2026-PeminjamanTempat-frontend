const API_URL = "http://localhost:5030/api/tempat";

export async function createTempat(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Gagal menambah tempat");
  return response.json();
}

export async function getAllTempat() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Gagal mengambil tempat");
  return response.json();
}
