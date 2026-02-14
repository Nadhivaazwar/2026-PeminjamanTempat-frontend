import { useState } from "react";
import { createTempat } from "../services/tempatService";

function FormTempat() {
  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    kapasitas: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTempat({
        nama: formData.nama,
        lokasi: formData.lokasi,
        kapasitas: Number(formData.kapasitas),
      });

      alert("Tempat berhasil ditambahkan!");

      setFormData({
        nama: "",
        lokasi: "",
        kapasitas: "",
      });

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tambah Tempat</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Tempat:</label>
          <input
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Lokasi:</label>
          <input
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Kapasitas:</label>
          <input
            type="number"
            name="kapasitas"
            value={formData.kapasitas}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default FormTempat;
