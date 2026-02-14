import { useEffect, useState } from "react";
import {
  getAllPeminjaman,
  updateStatusPeminjaman,
} from "../services/peminjamanService";

function ManajemenPeminjaman() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const result = await getAllPeminjaman();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  const ubahStatus = async (id, status) => {
    await updateStatusPeminjaman(id, status);
    loadData();
  };

  return (
    <div>
      <h2>Kelola Status Peminjaman</h2>

      {data.map((p) => (
        <div key={p.id}>
          {p.tempatName} — {p.status}
          <button onClick={() => ubahStatus(p.id, "Disetujui")}>
            Setujui
          </button>
          <button onClick={() => ubahStatus(p.id, "Ditolak")}>
            Tolak
          </button>
        </div>
      ))}
    </div>
  );
}

export default ManajemenPeminjaman;
