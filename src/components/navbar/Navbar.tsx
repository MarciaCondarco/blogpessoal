import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";


function Navbar() {

    const navigate = useNavigate();

    const {handleLogout} = useContext(AuthContext);

    function logout(){
        handleLogout();
        alert('O usuario foi desconectado com sucesso!');
        navigate('/');
    }

    return (
        <>
            <div
                className="flex justify-between bg-indigo-900 py-4 px-4"
            >
                <div
                    className="text-white"
                ><Link to="/home" className="text-2xl font-bold">Blog Pessoal</Link>
                
                </div>

                {/* div da direita */}
                <div
                    className="flex text-white gap-4"
                >
                    <div><a href="#">Postagem</a></div>
                    <Link to='/tema' className="hover:underline">Tema</Link>
                    <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                    <div><a href="#">Perfil</a></div>
                    <Link to='' onClick={logout} className="hover:underline">Sair</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar