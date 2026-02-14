import FormPeminjaman from "./pages/FormPeminjaman";
import ListPeminjaman from "./pages/ListPeminjaman";
import ManajemenPeminjaman from "./pages/ManajemenPeminjaman";
import HalamanStatusPeminjaman from "./pages/HalamanStatusPeminjaman";
import FormTempat from "./pages/FormTempat";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <FormTempat />
      <hr />
      <FormPeminjaman />
      <hr />
      <HalamanStatusPeminjaman />
      <hr />
      <ManajemenPeminjaman />
      <hr />
      <ListPeminjaman />
      <hr />
    </div>
  );
}

export default App;
