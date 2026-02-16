import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { createPeminjaman, getPeminjamanById, updatePeminjaman } from "../services/peminjamanService";
import { getAllTempat } from "../services/tempatService";

function FormPeminjaman() {
  const navigate = useNavigate(); 
  const { id } = useParams(); 
  const isEditMode = !!id; 

  const [tempatList, setTempatList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    tempatId: "",
    namaPeminjam: "",
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    loadTempat();
    if (isEditMode) {
      loadDataEdit();
    } else {
      // Reset form jika beralih dari edit ke tambah baru tanpa refresh
      setForm({
        tempatId: "",
        namaPeminjam: "",
        startTime: "",
        endTime: ""
      });
    }
  }, [id, isEditMode]);

  async function loadTempat() {
    try {
      const data = await getAllTempat();
      setTempatList(data);
    } catch (error) {
      console.error("Gagal memuat daftar tempat", error);
    }
  }

  async function loadDataEdit() {
    try {
      setLoading(true);
      const data = await getPeminjamanById(id);
      
      // PERBAIKAN: Helper format tanggal lokal agar jam tidak bergeser
      const formatToInput = (dateString) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        // Mengonversi ke waktu lokal ISO tanpa offset UTC (YYYY-MM-DDTHH:mm)
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      setForm({
        tempatId: data.tempatId || "",
        namaPeminjam: data.namaPeminjam || "",
        startTime: formatToInput(data.startTime),
        endTime: formatToInput(data.endTime)
      });

    } catch (error) {
      alert("Gagal memuat data untuk diedit.");
      navigate("/peminjaman");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const start = new Date(form.startTime);
    const end = new Date(form.endTime);

    if (end <= start) {
      alert("Waktu selesai harus setelah waktu mulai");
      return;
    }

    const payload = {
      tempatId: Number(form.tempatId),
      namaPeminjam: form.namaPeminjam.trim(),
      startTime: form.startTime,
      endTime: form.endTime,
      status: isEditMode ? undefined : "Pending" // Status biasanya dikelola backend saat edit
    };

    try {
      setLoading(true);

      if (isEditMode) {
        await updatePeminjaman(id, payload);
        alert("Data berhasil diperbarui!");
      } else {
        await createPeminjaman(payload);
        alert("Peminjaman berhasil dibuat");
      }

      navigate("/peminjaman"); 

    } catch (err) {
      alert(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="section-title" style={{ margin: 0 }}>
          {isEditMode ? "Edit Peminjaman" : "Form Pengajuan"}
        </h3>
        
        <button 
          onClick={() => navigate("/peminjaman")} 
          style={{ background: '#f0f0f0', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nama Peminjam</label>
          <input
            name="namaPeminjam"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            value={form.namaPeminjam}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Pilih Tempat</label>
          <select
            name="tempatId"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            value={form.tempatId}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Lokasi --</option>
            {tempatList.map(t => (
              <option key={t.id} value={t.id}>
                {t.name || t.nama} ({t.location || t.lokasi})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Waktu Mulai</label>
          <input
            type="datetime-local"
            name="startTime"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            value={form.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Waktu Selesai</label>
          <input
            type="datetime-local"
            name="endTime"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            value={form.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          className="btn-primary full" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: loading ? '#ccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? "Memproses..." : (isEditMode ? "Simpan Perubahan" : "Kirim Pengajuan")}
        </button>
      </form>
    </div>
  );
}

export default FormPeminjaman;