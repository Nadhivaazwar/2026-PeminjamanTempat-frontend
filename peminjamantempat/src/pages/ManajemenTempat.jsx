import { useState } from "react";
import { createTempat } from "../services/tempatService";

function ManajemenTempat() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: 0,
    description: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createTempat(form);
    alert("Tempat berhasil ditambahkan");
  }

  return (
    <div>
      <h2>Tambah Tempat</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nama" onChange={handleChange} />
        <input name="location" placeholder="Lokasi" onChange={handleChange} />
        <input name="capacity" type="number" onChange={handleChange} />
        <input name="description" placeholder="Deskripsi" onChange={handleChange} />

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default ManajemenTempat;
