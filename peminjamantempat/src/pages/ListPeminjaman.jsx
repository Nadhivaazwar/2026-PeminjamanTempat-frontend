import { useEffect, useState } from "react";
import { getAllPeminjaman } from "../services/peminjamanService";

function ListPeminjaman() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getAllPeminjaman().then(setData);
  }, []);

  const filtered = data.filter(item =>
    item.tempatName?.toLowerCase().includes(keyword.toLowerCase()) ||
    item.namaPeminjam?.toLowerCase().includes(keyword.toLowerCase())
  );

  function getBadge(status) {
    if (status === "Disetujui") return "badge success";
    if (status === "Ditolak") return "badge danger";
    return "badge warning";
  }

  return (
    <div className="card">
      <div className="table-header">
        <h3>Data Peminjaman</h3>
        <input
          placeholder="Cari..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Tempat</th>
            <th>Mulai</th>
            <th>Selesai</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.namaPeminjam}</td>
              <td>{p.tempatName}</td>
              <td>{new Date(p.startTime).toLocaleString()}</td>
              <td>{new Date(p.endTime).toLocaleString()}</td>
              <td>
                <span className={getBadge(p.status)}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPeminjaman;
