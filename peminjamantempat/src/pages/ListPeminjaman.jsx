import { useEffect, useState } from "react";
import { getAllPeminjaman } from "../services/peminjamanService";

function ListPeminjaman() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const loadData = async () => {
    try {
      const result = await getAllPeminjaman();
      setData(result);
    } catch (error) {
      alert("Gagal mengambil data peminjaman");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = data.filter(item =>
    item.tempatName?.toLowerCase().includes(keyword.toLowerCase()) ||
    item.namaPeminjam?.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Riwayat Peminjaman</h2>

      <input
        placeholder="Cari nama tempat / peminjam..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <br /><br />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Peminjam</th>
            <th>Tempat</th>
            <th>Mulai</th>
            <th>Selesai</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.namaPeminjam}</td>
              <td>{p.tempatName}</td>
              <td>{new Date(p.startTime).toLocaleString()}</td>
              <td>{new Date(p.endTime).toLocaleString()}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPeminjaman;
