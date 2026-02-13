const BASE_URL = "http://localhost:5030/api";

export async function createPeminjaman(data) {
  const response = await fetch(`${BASE_URL}/Peminjaman`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal menyimpan peminjaman");
  }

  return response.json();
}
