import { useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema"
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";

function ListaTemas() {

    const navigate = useNavigate(); //redirecionar e mandar para outro componente

    const [isLoading, setIsLoading] = useState<boolean>(false); //carregar animação

    const [temas, setTemas] = useState<Tema[]>([]);//array de temas

    const {usuario, handleLogout} = useContext(AuthContext);//buscando dados no contexto

    const token = usuario.token;//constante de armazenar token

    useEffect(()=>{
        if(token===''){
            alert('você precisa estar logado');
            navigate('/')
        }
    },[token])

    useEffect(() => {
        buscarTemas()
    },[temas.length])

    async function buscarTemas() {
        try {
            // carregar animação
            setIsLoading(true);

            // paramaetros - '/caminho' , atualizar o temas
            // requisição com token
            await buscar('/temas', setTemas,{
                // passando o token como um objeto
                headers: {Authorization: token}
            })
        } catch (error: any) {
            if(error.toString().includes('401')) //se pega o erro converte para string e tiver o erro 401
            {
                handleLogout();
            }
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            {
                // se isloading for verdadeiro
                isLoading && (
                    <div className="flex justify-center w-full my-8">
                        <SyncLoader
                            color="#312e81"
                            size={32}
                        />
                    </div>
                )
            }
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    {
                        (!isLoading && temas.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhum Tema foi encontrado!
                            </span>
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                            {
                                temas.map((tema) => (
                                    // renderizar o card tema
                                    <CardTema key={tema.id} tema={tema}/>
                                ))
                            }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;