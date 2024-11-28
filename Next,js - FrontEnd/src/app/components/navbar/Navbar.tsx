'use client';
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, typography } from '@mui/system';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';



// Estilos personalizados para los elementos del sidebar
const SidebarContainer = styled(Box)({
    width: 250,
    background: "linear-gradient(135deg, #232526, #414345)",
    height: "100vh",
    color: "#fff",
    padding: "30px 20px",
    transition: "all 0.3s ease-in-out",
    boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.3)",
});

const SidebarHeader = styled(Typography)({
    fontSize: "1.8rem",  // Tamaño de fuente aumentado
    fontWeight: "bold",  // Negrita
    textAlign: "center",
    marginBottom: "1rem",
    color: "#fff",
    fontFamily: "'Roboto', sans-serif",  // Fuente Roboto
    letterSpacing: "0.5px",  // Espaciado entre letras
});

const SidebarItem = styled(ListItem)({
    padding: "15px 10px",
    margin: "10px 0",
    borderRadius: "10px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    fontFamily: "'Poppins', sans-serif", // Fuente Poppins para el menú
    letterSpacing: "0.8px",  // Espaciado entre letras
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        transform: "translateY(-3px)",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
});

const SidebarDivider = styled(Divider)({
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    height: "2px",
    borderRadius: "5px",
});


const SidebarItemText = styled(ListItemText)({
    fontSize: "1rem",  // Tamaño de texto para los elementos del menú
    fontFamily: "'Poppins', sans-serif",  // Fuente Poppins
    letterSpacing: "0.5px",  // Espaciado entre letras
});


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }
        setIsOpen(open);
    };

    const sidebarContent = (
        <SidebarContainer role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <SidebarHeader variant="h6">Menú Principal</SidebarHeader>
            <List>
                <SidebarItem>
                    <Link href="/pages" passHref style={{ color: "inherit", textDecoration: "none", width: "100%", display: "flex", alignItems: "center" }}>
                        <ListItemIcon sx={{
                            color: "#FAFAFA", minWidth: "40px", fontSize: "1.5rem", transition: "color 0.3s ease",
                            "&:hover": {
                                color: "#FFD700",
                            },
                        }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <SidebarItemText primary="Home"
                            sx={{
                                color: "#FAFAFA", // Blanco roto
                                minWidth: "40px",
                                transition: "color 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                    color: "#FFD700", // Dorado en hover
                                },
                            }} />
                    </Link>
                </SidebarItem>
                <SidebarItem>
                    <Link href="/pages/proveedores" passHref style={{ color: "inherit", textDecoration: "none", width: "100%", display: "flex", alignItems: "center" }}>
                    <ListItemIcon sx={{
                            color: "#FAFAFA", minWidth: "40px", fontSize: "1.5rem", transition: "color 0.3s ease",
                            "&:hover": {
                                color: "#FFD700",
                            },
                        }}>
                            <LocalShippingIcon />
                        </ListItemIcon>
                        <SidebarItemText primary="Proveedores"
                            sx={{
                                color: "#FAFAFA", // Blanco roto
                                minWidth: "40px",
                                transition: "color 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                    color: "#FFD700", // Dorado en hover
                                },
                            }} />
                    </Link>
                </SidebarItem>
                <SidebarItem>
                    <Link href="/pages/clientes" passHref style={{ color: "inherit", textDecoration: "none", width: "100%", display: "flex", alignItems: "center" }}>
                    <ListItemIcon sx={{
                            color: "#FAFAFA", minWidth: "40px", fontSize: "1.5rem", transition: "color 0.3s ease",
                            "&:hover": {
                                color: "#FFD700",
                            },
                        }}>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <SidebarItemText primary="Clientes"
                            sx={{
                                color: "#FAFAFA", // Blanco roto
                                minWidth: "40px",
                                transition: "color 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                    color: "#FFD700", // Dorado en hover
                                },
                            }} />
                    </Link>
                </SidebarItem>
                <SidebarItem>
                    <Link href="/pages/productos" passHref style={{ color: "inherit", textDecoration: "none", width: "100%", display: "flex", alignItems: "center" }}>
                    <ListItemIcon sx={{
                            color: "#FAFAFA", minWidth: "40px", fontSize: "1.5rem", transition: "color 0.3s ease",
                            "&:hover": {
                                color: "#FFD700",
                            },
                        }}>
                            <InventoryIcon />
                        </ListItemIcon>
                        <SidebarItemText primary="Productos"
                            sx={{
                                color: "#FAFAFA", // Blanco roto
                                minWidth: "40px",
                                transition: "color 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                    color: "#FFD700", // Dorado en hover
                                },
                            }} />
                    </Link>
                </SidebarItem>
            </List>
            <SidebarDivider />
            <Typography variant="caption" sx={{ textAlign: "center", display: "block", marginTop: "1rem", opacity: 0.7 }}>
                Sistema de Gestión 2024
            </Typography>
        </SidebarContainer>
    );

    return (
        <>
            <AppBar position="fixed" sx={{ background: "rgba(0, 0, 0, 0.7)", boxShadow: "none" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon sx={{ color: "#fff" }} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)} SlideProps={{
                timeout: 300, // Controla la duración del deslizamiento
            }}
            >
                {sidebarContent}
            </Drawer>
        </>
    );
};

export default Navbar;