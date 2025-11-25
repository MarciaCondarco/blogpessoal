import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";


function Navbar() {

    const navigate = useNavigate();

    const {usuario, handleLogout} = useContext(AuthContext);

    function logout(){
        handleLogout();
        ToastAlerta('O usuario foi desconectado com sucesso!',"info");
        navigate('/');
    }

    let component: ReactNode

    if(usuario.token !== ""){
        component =(
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
                    <Link to='/postagens' className='hover:underline'>Postagens</Link>
                    <Link to='/tema' className="hover:underline">Tema</Link>
                    <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                    <Link to='/perfil' className="hover:underline">Perfil</Link>
                    <Link to='' onClick={logout} className="hover:underline">Sair</Link>
                </div>
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Navbar