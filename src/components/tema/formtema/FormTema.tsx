import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormTema() {

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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }


    async function gerarNovoTema(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        // se id for diferente de vazio
        if(id !== undefined){
            // atualização
                try {
                
                await atualizar('/temas', tema, setTema,{
                    headers: {Authorization : token}
                })
                alert('O tema foi atualizado com sucesso!!');

            } catch (error: any) {
                if(error.toString().includes('401')){
                    handleLogout();
                }else{
                    alert('Erro atualizar o tema!')
                }
            }
        }else{
            // cadastro

            try {
                
                await cadastrar('/temas', tema, setTema,{
                    headers: {Authorization : token}
                })
                alert('O tema foi cadastrado com sucesso!!');

            } catch (error: any) {
                if(error.toString().includes('401')){
                    handleLogout();
                }else{
                    alert('Erro ao cadastrar o tema!')
                }
            }
        }

        setIsLoading(false);
        retornar();
    }
    console.log(JSON.stringify(tema));

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar' : 'Atualizar'} Tema
            </h1>

            <form className="w-1/2 flex flex-col gap-4" 
                onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao} 
                        onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                            hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {
                        isLoading ?
                        <ClipLoader
                            color="#FFFFFF"
                            size={24}
                        />:
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormTema;