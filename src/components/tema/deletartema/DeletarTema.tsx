import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function DeletarTema() {
    const navigate = useNavigate(); //redirecionar e mandar para outro componente
    
    const [isLoading, setIsLoading] = useState<boolean>(false); //carregar animação

    const [tema, setTema] = useState<Tema>({} as Tema); //estado tema usado para guardar os dados que for digitando

    const {usuario, handleLogout} = useContext(AuthContext);//buscando dados no contexto
    
    const token = usuario.token;//constante de armazenar token

    const { id }=useParams<{id: string}>(); //id passado na rota

    async function buscarTemasPorId() {
        try {
            // paramaetros - '/caminho' , atualizar o temas
            // requisição com token
            await buscar(`/temas/${id}`, setTema,{
                // passando o token como um objeto
                headers: {Authorization: token}
            })
        } catch (error: any) {
            if(error.toString().includes('401')) //se pega o erro converte para string e tiver o erro 401
            {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if(id !== undefined){
            buscarTemasPorId();
        }
    }, [id])
    
    useEffect(()=>{
        if(token===''){
            alert('você precisa estar logado');
            navigate('/')
        }
    },[token])

    function retornar(){
        navigate("/tema");
    }

    async function deletarTema(){
        setIsLoading(true);

        try{

            await deletar(`/temas/${id}`, {
                headers : {Authorization : token}
            })
            alert('tema deletado com sucesso')
        }catch(error: any){
            if(error.toString().includes('401')){
                handleLogout();
            }else{
                alert('Erro ao deletar o tema!')
            }
        }

        setIsLoading(false);
        retornar();
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                            onClick={retornar}
                        >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                                hover:bg-indigo-600 flex items-center justify-center'
                            onClick={deletarTema}        
                        >
                            {
                                isLoading ? 
                                    <ClipLoader
                                        color="#ffffff"
                                        size={24}
                                    />
                                :<span>Sim</span>
                            }
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema