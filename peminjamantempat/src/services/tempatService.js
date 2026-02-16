const API_URL = "http://localhost:5030/api/tempat";

async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text ? { message: text } : null;
  }

  if (!response.ok) {
    // Menangkap error dari backend (DTO validation atau NotFound)
    const errorMessage = data?.message || data?.title || "Terjadi kesalahan pada server";
    throw new Error(errorMessage);
  }

  return data;
}

// 1. Ambil Semua Data Tempat
export async function getAllTempat() {
  try {
    const response = await fetch(API_URL, {
      headers: { "Accept": "application/json" }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Gagal mengambil data tempat:", error);
    return []; 
  }
}

// 2. Ambil Satu Data Tempat (Penting untuk mode Edit)
export async function getTempatById(id) {
  // Memanggil endpoint GET api/tempat/{id}
  const response = await fetch(`${API_URL}/${id}`, {
    headers: { "Accept": "application/json" }
  });
  return await handleResponse(response);
}

// 3. Tambah Tempat Baru
export async function createTempat(data) {
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

// 4. Update Data Tempat (PUT)
export async function updateTempat(id, data) {
  // Backend menggunakan TempatUpdateDto yang membutuhkan properti 'Id'
  const payload = {
    id: parseInt(id), // Pastikan ID dikirim sebagai integer sesuai DTO
    name: data.name || data.nama,
    location: data.location || data.lokasi,
    capacity: parseInt(data.capacity || data.kapasitas),
    status: data.status,
    description: data.description
  };
  
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload),
  });
  return await handleResponse(response);
}

// 5. Hapus Data Tempat
export async function deleteTempat(id) {
  const response = await fetch(`${API_URL}/${id}`, { 
    method: "DELETE" 
  });

  if (!response.ok) {
    // Menangani pesan error hapus dari backend
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Gagal menghapus data ruangan");
  }
  
  return true;
}