import { Link } from "react-router-dom"
import type Postagem from "../../../models/Postagem"

interface CardPostagensProps{
    postagem:Postagem
}
function CardPostagem({postagem}: CardPostagensProps) {
    return (
        <>
            <div className="flex flex-col border-2">
                {/* foto e nome do administrador */}
                <div className="flex justify-between bg-indigo-400">
                    {/* foto */}
                    <p>foto</p>
                    {/* Nome */}
                    <p>{postagem.usuario?.nome}</p>
                </div>
                {/* info */}
                <div>
                    {/* nome postagem */}
                    <h2>{postagem.titulo}</h2>
                    <p>{postagem.texto}</p> 
                    <p>tema: {postagem.tema?.descricao}</p>
                    <p>Data: {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(postagem.data))}</p>

                </div>
                {/* botões de editar e deletar */}
                <div className="flex justify-between ">
                <Link to={`/editarpostagem/${postagem.id}`}
                    className='w-full text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/apagarpostagem/${postagem.id}`}
                    className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
                </div>
            </div>
        </>
    )
}

export default CardPostagem