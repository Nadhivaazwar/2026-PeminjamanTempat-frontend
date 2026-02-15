import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>📊 Peminjaman</h2>

        <nav style={styles.menu}>
          <a href="#" style={styles.menuItem}>Dashboard</a>
          <a href="#" style={styles.menuItem}>Form Tempat</a>
          <a href="#" style={styles.menuItem}>Form Peminjaman</a>
          <a href="#" style={styles.menuItem}>Status Peminjaman</a>
          <a href="#" style={styles.menuItem}>Manajemen</a>
          <a href="#" style={styles.menuItem}>List Peminjaman</a>
        </nav>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <h3>Dashboard Peminjaman Tempat</h3>
        </header>

        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial"
  },
  sidebar: {
    width: 220,
    background: "#111827",
    color: "white",
    padding: 20
  },
  logo: {
    marginBottom: 30
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  menuItem: {
    color: "white",
    textDecoration: "none",
    padding: "8px 10px",
    borderRadius: 6,
    background: "#1f2937"
  },
  main: {
    flex: 1,
    background: "#f3f4f6"
  },
  header: {
    background: "white",
    padding: 20,
    borderBottom: "1px solid #ddd"
  },
  content: {
    padding: 20
  }
};
