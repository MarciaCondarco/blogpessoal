


function DeletarPostagem() {



    return (
        <>
            <div className="flex flex-col justify-center items-center ">
                {/* titulo - deletar postagem  */}
                <div className="font-bold text-3xl">Deletar Postagem</div>
                {/* p  */}
                <div><p>você tem certeza de que desejar apagar a postagem a seguir?</p></div>
                {/* card */}
                <div className="border-2 w-40">
                    {/* postagem */}
                    <div className="bg-indigo-600 text-white"><h2>Postagem</h2></div>
                    <div><h3>titulo</h3></div>
                    <div><p></p></div>
                    {/* botoes */}
                    <div className="flex justify-center ">
                        <button className="bg-red-400 w-full">Não</button>
                        <button className="bg-indigo-400 w-full">Sim</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletarPostagem