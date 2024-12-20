'use client';
import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Alert,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "translateY(-5px)", // Movimiento al pasar el cursor
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Sombra más prominente al pasar el cursor
    },
    width: "100%",
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: "#2c2c2c",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    color: "#fff",
    border: "2px solid #444444",
    "@media (min-width: 600px)": {
        width: "75%",
        margin: "auto",
    },
});



const ActionButton = styled(Button)({
    margin: "8px", // Reemplaza theme.spacing(1)
    padding: "8px 16px", // Reemplaza theme.spacing(1.5)
    fontSize: "0.875rem",
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: "10px",
    transition: "background-color 0.3s ease",
    backgroundColor: "#4CAF50",
    "&:hover": {
        backgroundColor: "#388E3C",
    },
});

const ActivateButton = styled(ActionButton)({
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#388e3c",
    },
});

const DeactivateButton = styled(ActionButton)({
    backgroundColor: "#ff9800",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#f57c00"
    },
});

const DeleteButton = styled(ActionButton)({
    backgroundColor: "#f44336",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#d32f2f"
    },
});

const UpdateButton = styled(ActionButton)({
    backgroundColor: "#2196f3",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#1976d2",
    },
});

const StyledContainer = styled(Container)({
    backgroundColor: "#121212",  // fondo oscuro para que combine con el navbar
    paddingTop: "20px",
    paddingBottom: "20px",
    borderRadius: "8px",
    fontFamily: "Roboto, sans-serif",
});


const ClienteLista = () => {
    const [clientes, setClientes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [formValues, setFormValues] = useState({
        nombre_cliente: "",
        email_cliente: "",
        celular_cliente: "",
        activo_cliente: true,
    });
    const [selectedCliente, setSelectedCliente] = useState<any>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [actionType, setActionType] = useState<'create' | 'update'>('create');

    const fetchClientes = async () => {
        try {
            const respuesta = await fetch('https://humble-computing-machine-x55vj5pjp9j5hp9j4-3000.app.github.dev/api/clients');
            if (!respuesta.ok) throw new Error('Error al obtener todos los clientes');
            const data = await respuesta.json();
            setClientes(data);
        } catch (error) {
            console.error('Error al obtener los clientes: ', error);
            setErrorMessage('Error al obtener los clientes');
            setOpenSnackbar(true);
        }
    }

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleOpenModal = (cliente: any = null) => {
        setSelectedCliente(cliente);
        if (cliente) {
            setFormValues({
                nombre_cliente: cliente.nombre_cliente,
                email_cliente: cliente.email_cliente,
                celular_cliente: cliente.celular_cliente,
                activo_cliente: cliente.activo_cliente,
            });
            setActionType('update');
        } else {
            setFormValues({
                nombre_cliente: "",
                email_cliente: "",
                celular_cliente: "",
                activo_cliente: true,
            });
            setActionType('create');
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedCliente(null);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSaveCliente = async () => {
        try {
            let url;
            let method;
            if (actionType === 'create') {
                url = 'https://humble-computing-machine-x55vj5pjp9j5hp9j4-3000.app.github.dev/api/clients';
                method = 'POST';
            } else if (actionType === 'update') {
                url = `https://humble-computing-machine-x55vj5pjp9j5hp9j4-3000.app.github.dev/api/clients/update/${selectedCliente._id}`;
                method = 'PUT';
            }

            const response = await fetch(`${url}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al guardar el cliente');
            }
            fetchClientes();
            handleCloseModal();
        } catch (error) {
            console.error("Error al guardar el cliente:", error);
            setErrorMessage("Error al guardar el cliente");
            setOpenSnackbar(true);
        }
    };

    const handleActivate = async (id: string) => {
        try {
            await fetch(`https://humble-computing-machine-x55vj5pjp9j5hp9j4-3000.app.github.dev/api/clients/activate/${id}`, { method: 'PUT' });
            fetchClientes();
        } catch (error) {
            console.error("Error al activar el cliente:", error);
        }
    };

    const handleDeactivate = async (id: string) => {
        try {
            await fetch(`https://humble-computing-machine-x55vj5pjp9j5hp9j4-3000.app.github.dev/api/clients/deactivate/${id}`, { method: 'PUT' });
            fetchClientes();
        } catch (error) {
            console.error("Error al desactivar el cliente: ", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`https://humble-computing-machine-x55vj5pjp9j5hp9j4-3000.app.github.dev/api/clients/delete/${id}`, { method: 'DELETE' });
            fetchClientes();
        } catch (error) {
            console.error("Error al eliminar el cliente: ", error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setErrorMessage("");
    }

    return (
        <StyledContainer maxWidth="lg" style={{ marginTop: "70px" }}>
            <section style={{
                background: "linear-gradient(135deg, #333333 0%, #1a1a1a 100%)",
                padding: "70px",
                borderRadius: "100px",
                color: "#fff"
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal()}
                    style={{ marginBottom: "20px", backgroundColor: "#3f51b5" }}
                >
                    Crear Cliente
                </Button>
                <Grid container spacing={4}>
                    {clientes.map((cliente: any) => (
                        <Grid item xs={12} md={6} key={cliente.id}>
                            <StyledCard>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        {cliente.nombre_cliente}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#ffffff' }}>
                                        Email: {cliente.email_cliente}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#ffffff' }}>
                                        Celular: {cliente.celular_cliente}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{
                                            color: cliente.activo_cliente ? "#4caf50" : "#f44336",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {cliente.activo_cliente ? "Activo" : "Desactivado"}
                                    </Typography>

                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={4} display="flex" justifyContent="center">
                                            <UpdateButton onClick={() => handleOpenModal(cliente)}>
                                                Update
                                            </UpdateButton>
                                        </Grid>
                                        <Grid item xs={4} display="flex" justifyContent="center">
                                            {cliente.activo_cliente ? (
                                                <DeactivateButton onClick={() => handleDeactivate(cliente._id)}>
                                                    Disable
                                                </DeactivateButton>
                                            ) : (
                                                <ActivateButton onClick={() => handleActivate(cliente._id)}>
                                                    Enable
                                                </ActivateButton>
                                            )}
                                        </Grid>
                                        <Grid item xs={4} display="flex" justifyContent="center">
                                            <DeleteButton onClick={() => handleDelete(cliente._id)}>
                                                Delete
                                            </DeleteButton>
                                        </Grid>
                                    </Grid>




                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
            </section>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{actionType === "create" ? "Crear Cliente" : "Actualizar Cliente"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nombre"
                        name="nombre_cliente"
                        value={formValues.nombre_cliente}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email_cliente"
                        value={formValues.email_cliente}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Celular"
                        name="celular_cliente"
                        value={formValues.celular_cliente}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">Cancelar</Button>
                    <Button onClick={handleSaveCliente} color="primary">
                        {actionType === "create" ? "Crear" : "Actualizar"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </StyledContainer>
    );
};

export default ClienteLista;
