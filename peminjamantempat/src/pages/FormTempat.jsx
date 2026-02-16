import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTempat, getTempatById, updateTempat } from "../services/tempatService";

function FormTempat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    kapasitas: "",
  });
  
  const [loading, setLoading] = useState(false);

  // Perbaikan: Gunakan useEffect untuk reset form jika pindah dari Edit ke Tambah baru
  useEffect(() => {
    if (isEditMode) {
      loadTempatDetail();
    } else {
      // Jika masuk ke rute "/baru", pastikan form kosong
      setFormData({ nama: "", lokasi: "", kapasitas: "" });
    }
  }, [id, isEditMode]); // Jalankan ulang jika ID berubah

  async function loadTempatDetail() {
    try {
      setLoading(true);
      const data = await getTempatById(id);
      setFormData({
        nama: data.name || data.nama || "",
        lokasi: data.location || data.lokasi || "",
        kapasitas: data.capacity || data.kapasitas || "",
      });
    } catch (error) {
      console.error(error);
      alert("Gagal memuat detail ruangan");
      navigate("/ruangan");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validasi sederhana
    if (!formData.nama || !formData.lokasi || !formData.kapasitas) {
      alert("Semua kolom harus diisi!");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.nama,
        location: formData.lokasi,
        capacity: Number(formData.kapasitas),
        description: "-" 
      };

      if (isEditMode) {
        await updateTempat(id, payload);
        alert("Ruangan berhasil diperbarui!");
      } else {
        await createTempat(payload);
        alert("Ruangan berhasil ditambahkan!");
      }
      
      navigate("/ruangan");
    } catch (error) {
      alert("Gagal menyimpan: " + (error.message || "Terjadi kesalahan"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="section-title" style={{ margin: 0 }}>
          {isEditMode ? "Edit Ruangan" : "➕ Tambah Ruangan Baru"}
        </h3>
        <button 
          onClick={() => navigate("/ruangan")}
          style={{ background: '#eee', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Batal / Kembali
        </button>
      </div>

      {loading && isEditMode ? (
        <p style={{ textAlign: 'center' }}>Memuat data...</p>
      ) : (
        <form onSubmit={handleSubmit} className="form-grid">
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nama Ruangan</label>
            <input 
              name="nama" 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              value={formData.nama} 
              onChange={handleChange} 
              placeholder="Contoh: Ruang Meeting A"
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Lokasi</label>
            <input 
              name="lokasi" 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              value={formData.lokasi} 
              onChange={handleChange} 
              placeholder="Contoh: Lantai 2"
              required 
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Kapasitas (Orang)</label>
            <input 
              type="number" 
              name="kapasitas" 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              value={formData.kapasitas} 
              onChange={handleChange} 
              placeholder="0"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary full" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: isEditMode ? '#ffc107' : '#007bff', 
              color: isEditMode ? '#000' : '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Sedang Menyimpan..." : (isEditMode ? "Simpan Perubahan" : "Simpan Ruangan Baru")}
          </button>
        </form>
      )}
    </div>
  );
}

export default FormTempat;