import { useEffect, useState } from "react";
import {
  getAllPeminjaman,
  updateStatusPeminjaman,
} from "../services/peminjamanService";

function ManajemenPeminjaman() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllPeminjaman().then(setData);
  }, []);

  async function ubahStatus(id, status) {
    await updateStatusPeminjaman(id, status);
    const updated = await getAllPeminjaman();
    setData(updated);
  }

  return (
    <div className="card">
      <h3 className="section-title">Manajemen Peminjaman</h3>

      {data.map((p) => (
        <div key={p.id} className="list-row">
          <div>
            <strong>{p.tempatName}</strong>
            <div className="muted">{p.status}</div>
          </div>

          <div>
            <button className="btn-success" onClick={() => ubahStatus(p.id, "Disetujui")}>
              Setujui
            </button>
            <button className="btn-danger" onClick={() => ubahStatus(p.id, "Ditolak")}>
              Tolak
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManajemenPeminjaman;
