// Definición de la interfaz IUser
export interface IUser {
    /**
     * Propiedad 'name' de tipo string, que almacena
     * el nombre del usuario.
     */
    name: string;

    /**
     * Propiedad 'email' de tipo string, que almacena
     * la dirección de correo electrónico del usuario.
     */
    email: string;

    /**
     * Propiedad 'password' de tipo string, que almacena
     * la contraseña del usuario.
     */
    password: string;
}