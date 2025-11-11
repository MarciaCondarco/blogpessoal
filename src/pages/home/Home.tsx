
function Home() {
    return (
        /* container*/
    <div
        style={{
            backgroundColor: "#312e81",
            display: "flex",
            justifyContent: "center"

        }}
    
    >
        {/* grid que divide a tela em duas colunas */}
        <div
            style={{
                display:"grid",
                gridTemplateColumns: "1fr 1fr",
                color:"white",
                width:"100%",
                maxWidth:"1280px"

            }}
        >
            {/* coluna da esquerda */}
            <div
                style={{
                    display:"flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems:"center",
                    justifyContent:"center",
                    paddingTop:"1rem",
                    paddingBottom:"1rem"
                }}
            >
                <h2
                    style={{
                        fontSize:"3rem",
                        fontWeight:"bold"
                    }}
                >Seja Bem vinde!</h2>
                <p
                    style={{
                        fontSize:"1.25rem"
                    }}
                >Expresse aqui seus pensamentos e opniões</p>
                {/* link/botão */}
                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-around",
                        gap:"1rem"
                    }}
                >
                    <div
                        style={{
                            borderRadius:"0.5rem",
                            color:"white",
                            border:"2px solid white",
                            padding:"0.5rem 1rem"
                        }}
                    >Nova Postagem</div>
                </div>
            </div>
            {/* coluna da direita */}
            <div
                style={{
                    display:"flex",
                    justifyContent:"center",

                }}
            >
                <img src="https://i.imgur.com/fyfri1v.png" alt="imagem da pagina home" 
                style={{
                    width:"60%"
                }}
                />
            </div>
        </div>

    </div>
    )
}

export default Home