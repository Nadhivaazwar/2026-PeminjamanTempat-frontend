const API_URL = "http://localhost:5030/api/peminjaman";

export async function createPeminjaman(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Gagal membuat peminjaman");
  return response.json();
}

export async function getAllPeminjaman() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Gagal mengambil data");
  return response.json();
}

export async function updateStatusPeminjaman(id, status) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Gagal update status");
}
