import "./App.css";
import FormTempat from "./pages/FormTempat";
import FormPeminjaman from "./pages/FormPeminjaman";
import HalamanStatusPeminjaman from "./pages/HalamanStatusPeminjaman";
import ManajemenPeminjaman from "./pages/ManajemenPeminjaman";
import ListPeminjaman from "./pages/ListPeminjaman";

function App() {
  return (
    <>
      <div className="topbar">
        <div className="topbar-menu">
          <a href="#">Beranda</a>
          <a href="#">Akun Pengguna</a>
          <a href="#">Data Ruangan</a>
          <a className="active" href="#">Data Peminjaman</a>
          <a href="#">Riwayat Akses Ruangan</a>
        </div>

        <div>Halo, Bagian Umum ▾</div>
      </div>

      <div className="page">
        <div className="card">
          <ListPeminjaman />
        </div>

        <br />
        <div className="card">
          <FormPeminjaman />
        </div>

        <br />
        <div className="card">
          <FormTempat />
        </div>

        <br />
        <div className="card">
          <HalamanStatusPeminjaman />
        </div>

        <br />
        <div className="card">
          <ManajemenPeminjaman />
        </div>
      </div>
    </>
  );
}

export default App;
