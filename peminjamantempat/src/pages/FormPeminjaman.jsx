import { useState } from "react";
import { createPeminjaman } from "../services/peminjamanService";

function FormPeminjaman() {
  const [formData, setFormData] = useState({
    tempatId: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      alert("Waktu selesai harus lebih besar dari waktu mulai!");
      return;
    }

    try {
      await createPeminjaman({
        tempatId: Number(formData.tempatId),
        startTime: formData.startTime,
        endTime: formData.endTime,
      });

      alert("Peminjaman berhasil dibuat!");

      setFormData({
        tempatId: "",
        startTime: "",
        endTime: "",
      });

    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Peminjaman Ruangan</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>ID Tempat:</label>
          <input
            type="number"
            name="tempatId"
            value={formData.tempatId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Waktu Mulai:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Waktu Selesai:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <button type="submit">Kirim</button>

      </form>
    </div>
  );
}

export default FormPeminjaman;
