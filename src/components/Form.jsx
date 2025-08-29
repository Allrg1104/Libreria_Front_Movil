import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState(''); // Estado para manejar errores
    const [rol] = useState(''); // Estado para manejar errores
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();

        setError(''); // Limpiar errores previos

        try {
            const response = await fetch('https://libreria-back-vert.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en la red, intenta nuevamente.');
            }

            if (data.success) {
                // Guardar datos del usuario en localStorage
                localStorage.setItem('usuario', JSON.stringify({
                    id: data.user._id, //se caputa el ID de la persona
                    name: data.user.name,
                    email: data.user.email
                }));

                // Redirigir según el rol
                navigate("/createSale");
            } 
        } catch (error) {
            console.error('Error:', error);
            setError(error.message); // Mostrar el mensaje de error en pantalla
        }
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Inicio de sesión</h1>

            <h4 className="txt">Correo:</h4>
            <input type="text" className="entry" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

            <h4 className="txt">Contraseña:</h4>
            <input type="password" className="entry" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
            
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mensaje de error en pantalla */}

            <button type="submit" id="btnCreateUser">Ingresar</button>
            <button type="button" id="btnCreateUser" onClick={() => navigate('/createUser')}>Registrarse</button>
            {/* <button type="button" id="btnCreateUser" onClick={() => navigate('/createAdmin')}>Crear Admin</button> */}
        </form>
    );
}

export default LoginUser;