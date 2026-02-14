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
    loadTempat();
  }, []);

  async function loadTempat() {
    try {
      const data = await getAllTempat();
      setTempatList(data);
    } catch (error) {
      alert("Gagal mengambil data tempat");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (new Date(form.endTime) <= new Date(form.startTime)) {
      alert("Waktu selesai harus lebih besar dari waktu mulai");
      return;
    }

    try {
      await createPeminjaman({
        tempatId: Number(form.tempatId),
        namaPeminjam: form.namaPeminjam,
        startTime: form.startTime,
        endTime: form.endTime
      });

      alert("Peminjaman berhasil dibuat");

      setForm({
        tempatId: "",
        namaPeminjam: "",
        startTime: "",
        endTime: ""
      });

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Peminjaman Ruangan</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Nama Peminjam</label>
          <input
            type="text"
            name="namaPeminjam"
            value={form.namaPeminjam}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Pilih Tempat</label>
          <select
            name="tempatId"
            value={form.tempatId}
            onChange={handleChange}
            required
          >
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
          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Waktu Selesai</label>
          <input
            type="datetime-local"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <button type="submit">Ajukan Peminjaman</button>

      </form>
    </div>
  );
}

export default FormPeminjaman;
