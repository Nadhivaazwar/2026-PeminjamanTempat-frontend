const API_URL = "http://localhost:5030/api/peminjaman";

async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text || null;
  }

  if (!response.ok) {
    console.error("ERROR BACKEND:", data);
    const errorMessage = typeof data === "string" 
      ? data 
      : (data?.title || data?.message || "Terjadi kesalahan pada server");
    throw new Error(errorMessage);
  }

  return data;
}

// 1. Ambil Semua Data
export async function getAllPeminjaman() {
  try {
    const response = await fetch(API_URL, {
      headers: { "Accept": "application/json" }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return [];
  }
}

// 2. Buat Peminjaman Baru
export async function createPeminjaman(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

// 3. Update Status (Untuk Verifikasi)
export async function updateStatusPeminjaman(id, status) {
  const response = await fetch(`${API_URL}/status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ status: status }),
  });
  return await handleResponse(response);
}

// 4. Hapus Data
export async function deletePeminjaman(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || "Gagal menghapus data");
  }
  return true;
}

// --- FUNGSI YANG DIPERBAIKI (TADI HILANG) ---

// 5. Ambil Satu Data Berdasarkan ID (Untuk Edit)
export async function getPeminjamanById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: { "Accept": "application/json" }
  });
  return await handleResponse(response);
}

// 6. Update Data Lengkap (Mode Edit)
export async function updatePeminjaman(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
}

