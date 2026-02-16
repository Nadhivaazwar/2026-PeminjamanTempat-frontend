import { useEffect, useState } from "react";
import { getAllPeminjaman } from "../services/peminjamanService";

function HalamanStatusPeminjaman() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllPeminjaman()
      .then((res) => {
        console.log("Data Peminjaman:", res); // Cek console browser untuk lihat struktur data
        setData(res);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fungsi formatting tanggal biar enak dibaca
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="card">
      <h2 className="section-title">Riwayat Akses Ruangan</h2>

      {data.length === 0 ? (
        <p>Belum ada data peminjaman.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nama Peminjam</th>
              <th>Ruangan</th>
              <th>Waktu Mulai</th>
              <th>Waktu Selesai</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id}>
                {/* 1. Tampilkan Nama Peminjam */}
                <td>{p.namaPeminjam}</td>

                {/* 2. Tampilkan Nama Ruangan (Ambil dari object tempat) */}
                <td>
                  {p.tempat ? (p.tempat.name || p.tempat.nama || "Nama Ruangan") : "Tanpa Ruangan"}
                </td>

                {/* 3. Tampilkan Waktu */}
                <td>{formatDate(p.startTime)}</td>
                <td>{formatDate(p.endTime)}</td>

                {/* 4. Tampilkan Status dengan warna */}
                <td>
                  <span
                    className={
                      p.status === "Approved" || p.status === "Disetujui" ? "badge success" :
                      p.status === "Rejected" || p.status === "Ditolak" ? "badge danger" :
                      "badge warning"
                    }
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HalamanStatusPeminjaman;