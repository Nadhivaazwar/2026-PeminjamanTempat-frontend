import { useEffect, useState } from "react";
import { getAllPeminjaman } from "../services/peminjamanService";

function HalamanStatusPeminjaman() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllPeminjaman().then(setData);
  }, []);

  return (
    <div>
      <h2>Status Peminjaman</h2>

      {data.map((p) => (
        <div key={p.id}>
          {p.tempatName} : {p.status}
        </div>
      ))}
    </div>
  );
}

export default HalamanStatusPeminjaman;
