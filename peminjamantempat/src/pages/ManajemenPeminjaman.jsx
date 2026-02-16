import { useEffect, useState } from "react";
import {
  getAllPeminjaman,
  updateStatusPeminjaman,
} from "../services/peminjamanService";

// Import Ikon (Pastikan sudah install react-icons)
import { FaCheck, FaTimes, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { FiClock, FiCalendar } from "react-icons/fi";

function ManajemenPeminjaman() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const result = await getAllPeminjaman();
      // Urutkan: Pending paling atas, sisanya berdasarkan tanggal terbaru
      const sortedData = result.sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return new Date(b.startTime) - new Date(a.startTime);
      });
      setData(sortedData);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function ubahStatus(id, statusBaru) {
    const aksi = statusBaru === "Disetujui" ? "menyetujui" : "menolak";
    if (!window.confirm(`Apakah Anda yakin ingin ${aksi} peminjaman ini?`))
      return;

    try {
      await updateStatusPeminjaman(id, statusBaru);
      // alert(`Status berhasil diubah menjadi ${statusBaru}!`);
      loadData(); // Refresh data otomatis
    } catch (error) {
      alert("Gagal update status. Cek koneksi atau backend.");
      console.error(error);
    }
  }

  // Helper format tanggal yang lebih rapi
  const formatDateFull = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  // Helper untuk kelas CSS status
  const getStatusClass = (status) => {
    if (!status) return "";
    const s = status.toLowerCase();
    if (s === "pending") return "pending";
    if (s === "disetujui" || s === "approved") return "disetujui";
    if (s === "ditolak" || s === "rejected") return "ditolak";
    return "selesai";
  };

  return (
    <div className="verification-container">
      <h3 className="section-title">Verifikasi Peminjaman</h3>

      {loading ? (
        <p className="empty-state">Memuat data...</p>
      ) : data.length === 0 ? (
        <div className="empty-state">
          <p>Tidak ada data peminjaman yang perlu diverifikasi.</p>
        </div>
      ) : (
        <div className="booking-grid">
          {data.map((p) => (
            <div key={p.id} className="booking-card">
              
              {/* --- Header Kartu: Nama & Ruangan --- */}
              <div className="card-header">
                <div className="user-info">
                  <h4>
                    <FaUser style={{ marginRight: 8, color: "#3182ce" }} size={14}/>
                    {p.namaPeminjam || "Tanpa Nama"}
                  </h4>
                </div>
                <div className="room-badge">
                  <FaMapMarkerAlt size={12} />
                  {p.tempat ? (p.tempat.name || p.tempat.nama) : "Ruangan Dihapus"}
                </div>
              </div>

              {/* --- Body Kartu: Waktu --- */}
              <div className="date-info">
                <div className="date-item">
                  <FiCalendar size={16} />
                  <span>{formatDateFull(p.startTime)}</span>
                </div>
                <div className="date-item" style={{fontWeight: 500, color: '#2d3748'}}>
                  <FiClock size={16} />
                  <span>
                    {formatTime(p.startTime)} - {formatTime(p.endTime)} WIB
                  </span>
                </div>
              </div>

              {/* --- Footer Kartu: Status & Tombol Aksi --- */}
              <div className="card-footer">
                <div className={`status-badge ${getStatusClass(p.status)}`}>
                  {p.status}
                </div>

                {p.status === "Pending" && (
                  <div className="action-buttons">
                    <button
                      className="btn-action btn-approve"
                      onClick={() => ubahStatus(p.id, "Disetujui")}
                      title="Setujui"
                    >
                      <FaCheck /> Setujui
                    </button>
                    <button
                      className="btn-action btn-reject"
                      onClick={() => ubahStatus(p.id, "Ditolak")}
                      title="Tolak"
                    >
                      <FaTimes /> Tolak
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManajemenPeminjaman;