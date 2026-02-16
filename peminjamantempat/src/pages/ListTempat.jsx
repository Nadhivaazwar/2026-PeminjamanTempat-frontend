import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Digunakan untuk navigasi ke halaman baru dan edit
import { getAllTempat, deleteTempat } from "../services/tempatService";

function ListTempat() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data saat halaman dibuka
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const result = await getAllTempat();
      setData(result);
    } catch (error) {
      console.error("Gagal ambil data tempat:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Yakin ingin menghapus ruangan ini?")) {
      try {
        await deleteTempat(id);
        loadData(); // Refresh tabel setelah berhasil hapus
      } catch (error) {
        alert("Gagal menghapus data.");
      }
    }
  }

  return (
    <div className="card">
      <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="section-title" style={{ margin: 0 }}>Data Ruangan</h3>
        
        {/* TOMBOL KE HALAMAN FORM TAMBAH */}
        <Link to="/ruangan/baru" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 20px' }}>
          + Tambah Ruangan
        </Link>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : data.length === 0 ? (
        <p className="text-muted">Belum ada data ruangan.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Ruangan</th>
              <th>Lokasi</th>
              <th>Kapasitas</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td style={{ fontWeight: 'bold' }}>{item.name || item.nama}</td>
                <td>{item.location || item.lokasi}</td>
                <td>{item.capacity || item.kapasitas} Orang</td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    
                    {/* TOMBOL EDIT (Warna Kuning agar beda dengan hapus) */}
                    <Link 
                      to={`/ruangan/edit/${item.id}`} 
                      className="btn-primary" 
                      style={{ 
                        textDecoration: 'none', 
                        padding: '6px 12px', 
                        fontSize: '13px', 
                        backgroundColor: '#ffc107', 
                        color: '#000',
                        border: 'none'
                      }}
                    >
                      Edit
                    </Link>

                    {/* TOMBOL HAPUS */}
                    <button 
                      className="btn-danger" 
                      style={{ padding: '6px 12px', fontSize: '13px' }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListTempat;