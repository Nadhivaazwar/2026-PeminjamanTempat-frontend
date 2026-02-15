import React from "react";

export default function Dashboard() {
  return (
    <div className="dashboard-grid">
      <Card title="Total Tempat" value="12" />
      <Card title="Peminjaman Aktif" value="5" />
      <Card title="Menunggu Persetujuan" value="3" />
      <Card title="Selesai" value="20" />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-title">{title}</div>
      <div className="dashboard-value">{value}</div>
    </div>
  );
}
