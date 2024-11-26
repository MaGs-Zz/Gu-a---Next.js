'use client'
import React from "react";
import type { AppProps } from "next/app";
import NavBar from "../components/navbar/Navbar";
import ProveedorLista from "./proveedores/lista/ListaProveedores";
import styles from "../page.module.css";

export default function page() {
    return (
        <div className={styles.page}>
            <NavBar />

            <main className={styles.main}>
                <h1>Welcome to home page</h1>
            </main>

            <footer className={styles.footer}>
                <p>2024 My Application</p>
            </footer>
        </div>
    );
}