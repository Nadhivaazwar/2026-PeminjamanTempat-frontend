import { useEffect, useState } from "react";
import { createPeminjaman } from "../services/peminjamanService";
import { getAllTempat } from "../services/tempatService";

function FormPeminjaman() {
  const [tempatList, setTempatList] = useState([]);
  const [form, setForm] = useState({
    tempatId: "",
    namaPeminjam: "",
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    getAllTempat().then(setTempatList);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createPeminjaman({
      tempatId: Number(form.tempatId),
      namaPeminjam: form.namaPeminjam,
      startTime: form.startTime,
      endTime: form.endTime
    });
    alert("Peminjaman berhasil dibuat");
  }

  return (
    <div className="card">
      <h3 className="section-title">Form Peminjaman</h3>

      <form onSubmit={handleSubmit} className="form-grid">

        <div>
          <label>Nama Peminjam</label>
          <input name="namaPeminjam" onChange={handleChange} required />
        </div>

        <div>
          <label>Pilih Tempat</label>
          <select name="tempatId" onChange={handleChange} required>
            <option value="">Pilih Tempat</option>
            {tempatList.map(t => (
              <option key={t.id} value={t.id}>
                {t.name} - {t.location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Waktu Mulai</label>
          <input type="datetime-local" name="startTime" onChange={handleChange} required />
        </div>

        <div>
          <label>Waktu Selesai</label>
          <input type="datetime-local" name="endTime" onChange={handleChange} required />
        </div>

        <button className="btn-primary full">Ajukan Peminjaman</button>

      </form>
    </div>
  );
}

export default FormPeminjaman;
