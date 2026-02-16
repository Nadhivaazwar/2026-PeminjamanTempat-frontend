import "./App.css";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom"; // Tambah Navigate

// --- Import Bagian Ruangan ---
import ListTempat from "./pages/ListTempat"; 
import FormTempat from "./pages/FormTempat"; 

// --- Import Bagian Peminjaman ---
import FormPeminjaman from "./pages/FormPeminjaman";
import ListPeminjaman from "./pages/ListPeminjaman";

// --- Import Lainnya ---
import HalamanStatusPeminjaman from "./pages/HalamanStatusPeminjaman";
import ManajemenPeminjaman from "./pages/ManajemenPeminjaman";

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <div className="topbar">
        <div className="topbar-menu">
          {/* Menu Beranda telah dihapus */}
          
          {/* Menu Data Ruangan */}
          <NavLink to="/ruangan">Data Ruangan</NavLink>
          
          {/* Menu Data Peminjaman */}
          <NavLink to="/peminjaman">Data Peminjaman</NavLink>
          
          <NavLink to="/riwayat">Riwayat Akses Ruangan</NavLink>
          <NavLink to="/verifikasi">Verifikasi Peminjaman</NavLink>
        </div>

        <div className="user-info">Halo, Bagian Umum ▾</div>
      </div>

      {/* HALAMAN */}
      <div className="page">
        <Routes>
          {/* REDIRECT: Jika akses "/" otomatis dialihkan ke "/ruangan" */}
          <Route path="/" element={<Navigate to="/ruangan" replace />} />

          {/* --- ROUTING DATA RUANGAN --- */}
          <Route path="/ruangan" element={<ListTempat />} />
          <Route path="/ruangan/baru" element={<FormTempat />} />
          <Route path="/ruangan/edit/:id" element={<FormTempat />} />

          {/* --- ROUTING DATA PEMINJAMAN --- */}
          <Route path="/peminjaman" element={<ListPeminjaman />} />
          <Route path="/peminjaman/baru" element={<FormPeminjaman />} />
          <Route path="/peminjaman/edit/:id" element={<FormPeminjaman />} />

          {/* --- ROUTING LAINNYA --- */}
          <Route path="/riwayat" element={<HalamanStatusPeminjaman />} />
          <Route path="/verifikasi" element={<ManajemenPeminjaman />} />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;