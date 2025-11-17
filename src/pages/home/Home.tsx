
function Home() {



    return (
        /* container*/
    <div
        className="bg-indigo-900 flex justify-center"
    >
        {/* grid que divide a tela em duas colunas */}
        <div
            className="container grid grid-cols-1 sm:grid-cols-2 text-white"
        >
            {/* coluna da esquerda */}
            <div
                className="flex flex-col gap-4 items-center justify-center py-4"
            >
                <h2
                    className="text-5xl font-bold"
                >Seja Bem vinde!</h2>
                <p
                    className="text-xl"
                >Expresse aqui seus pensamentos e opiniões</p>
                {/* link/botão */}
                <div
                    className="flex justify-around gap-4"
                >
                    <div
                        className="rounded text-white border-white border-solid border-2 py-2 px-4"
                    >Nova Postagem</div>
                </div>
            </div>
            {/* coluna da direita */}
            <div
                className="flex justify-center"
            >
                <img src="https://i.imgur.com/fyfri1v.png" alt="imagem da pagina home" 
                className="w-2/3"
                />
            </div>
        </div>

    </div>
    )
}

export default Home