'use client'
import NavBar from "./components/navbar/Navbar";
//import ProveedorLista from "./proveedores/lista/ListaProveedores";
import styles from "./page.module.css";

export default function page(){
  return (
    <div className={styles.page}>
      <NavBar />

      <main className={styles.page}>
        <h1>Welcome to the home page</h1>
      </main>

      <footer className={styles.main}>
        <p>2024 My Application</p>
      </footer>
    </div>
  )
}

