import { useState } from "react";
import { createTempat } from "../services/tempatService";

function FormTempat() {
  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    kapasitas: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await createTempat({
      nama: formData.nama,
      lokasi: formData.lokasi,
      kapasitas: Number(formData.kapasitas),
    });

    alert("Tempat berhasil ditambahkan");

    setFormData({ nama: "", lokasi: "", kapasitas: "" });
  }

  return (
    <div className="card">
      <h3 className="section-title">Tambah Tempat</h3>

      <form onSubmit={handleSubmit} className="form-grid">

        <div>
          <label>Nama Tempat</label>
          <input name="nama" value={formData.nama} onChange={handleChange} required />
        </div>

        <div>
          <label>Lokasi</label>
          <input name="lokasi" value={formData.lokasi} onChange={handleChange} required />
        </div>

        <div>
          <label>Kapasitas</label>
          <input type="number" name="kapasitas" value={formData.kapasitas} onChange={handleChange} required />
        </div>

        <button className="btn-primary">Simpan</button>

      </form>
    </div>
  );
}

export default FormTempat;
