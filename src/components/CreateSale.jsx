import './styles/CreateSale.css';
import './Form.jsx'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateSale() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const id_vendedor = usuario?.id || ''; // por si no existe
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleCreateSale = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        
        try {
            const response = await axios.post('https://libreria-back-vert.vercel.app/api/newVenta', {
                producto,
                cantidad,
                precioUnitario,
                id_vendedor
            });

            // Detectamos éxito si hay un _id en la respuesta
        if (response.data && response.success) {
            setSuccessMessage('Venta creada exitosamente');
        } else {
            setErrorMessage(response.data.message || 'Error en la creación de la venta');
        }

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className='allcreateSale'>
            <div className='container'>
                <form onSubmit={handleCreateSale}>
                    <div className='form'>
                        <h1 id="tituloCrearVenta">Crear Venta</h1>
                        <input
                            type="text"
                            id="inputNombre"
                            placeholder="Producto"
                            onChange={(e) => setProducto(e.target.value)}
                            required
                        />                                                
                        <div className="cantidad">
                            <input
                                type="number"
                                id="inputCantidad"
                                placeholder="cantidad"
                                onChange={(e) => setCantidad(e.target.value)}
                                required
                            />
                        </div>
                        <div className="precio">
                            <input
                                type={"number"}
                                id="inputPrice"
                                placeholder="Precio"
                                onChange={(e) => setPrecioUnitario(e.target.value)}
                                required
                            />
                        </div>

                    <button type="submit" id="btnCreateUser"  >Registrar</button>
                    <button type="button" id="btnCreateUser" onClick={() => navigate('/')}>
                        Regresar
                    </button>
                    {successMessage && <p className="success">{successMessage}</p>}
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
            </form>
        </div>
        </div>
    );
}

export default CreateSale;