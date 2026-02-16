import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { getAllPeminjaman, deletePeminjaman } from "../services/peminjamanService";

function ListPeminjaman() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const result = await getAllPeminjaman();
      // Urutkan data dari ID terbaru agar data baru muncul di atas
      const sorted = result.sort((a, b) => b.id - a.id);
      setData(sorted);
    } catch (error) {
      console.error("Gagal memuat data", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Apakah Anda yakin ingin menghapus data peminjaman ini?")) {
      try {
        await deletePeminjaman(id);
        loadData(); // Refresh data setelah berhasil hapus
      } catch (error) {
        alert("Gagal menghapus: " + error.message);
      }
    }
  }

  // Filter data berdasarkan keyword
  const filtered = data.filter(item => {
    const searchStr = (keyword || "").toLowerCase();
    const namaPeminjam = (item.namaPeminjam || "").toLowerCase();
    const namaTempat = (item.tempatName || item.tempat?.name || item.tempat?.nama || "").toLowerCase();
    
    return namaPeminjam.includes(searchStr) || namaTempat.includes(searchStr);
  });

  // Helper untuk format tanggal tanpa detik
  function formatDateTime(dateStr) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\./g, ':'); // Mengganti titik menjadi titik dua untuk jam
  }

  function getBadge(status) {
    if (status === "Disetujui" || status === "Approved") return "badge success";
    if (status === "Ditolak" || status === "Rejected") return "badge danger";
    return "badge warning";
  }

  return (
    <div className="card">
      <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="section-title" style={{ margin: 0 }}>Data Peminjaman</h3>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/peminjaman/baru" className="btn-primary" style={{ textDecoration: 'none', padding: '8px 16px' }}>
            + Ajukan Peminjaman
          </Link>

          <input
            placeholder="Cari nama atau tempat..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: '250px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>Memuat data...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Peminjam</th>
              <th>Tempat</th>
              <th>Waktu Mulai</th>
              <th>Waktu Selesai</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td><strong>{p.namaPeminjam}</strong></td>
                  <td>{p.tempat ? (p.tempat.name || p.tempat.nama) : "-"}</td>
                  {/* Menghapus format jam .00 (detik) */}
                  <td>{formatDateTime(p.startTime)}</td>
                  <td>{formatDateTime(p.endTime)}</td>
                  <td>
                    <span className={getBadge(p.status)}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <Link 
                        to={`/peminjaman/edit/${p.id}`} 
                        className="btn-primary" 
                        style={{ 
                          textDecoration: 'none', 
                          padding: '6px 12px', 
                          fontSize: '13px', 
                          backgroundColor: '#ffc107', 
                          color: '#000',
                          borderRadius: '4px'
                        }}
                      >
                        Edit
                      </Link>
                      
                      <button 
                        className="btn-danger" 
                        onClick={() => handleDelete(p.id)}
                        style={{ padding: '6px 12px', fontSize: '13px', cursor: 'pointer', borderRadius: '4px' }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Data tidak ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListPeminjaman;