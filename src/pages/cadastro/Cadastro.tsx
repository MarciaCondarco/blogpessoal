import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type Usuario from "../../models/Usuario";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";

function Cadastro() {

    // Objeto responsavel por redirecinar o usuario para uma outra rota
    const navigate = useNavigate();
    // crian 3 estados
    // controla a exibição do loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    //  Validar a digitação da senha do usuario
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    // guardar os dados do usuario
    const [usuario, setUsuario] = useState<Usuario>({
        id:0,
        nome: "",
        usuario: "",
        senha: "",
        foto: ""
    })

    useEffect( () => {
        if(usuario.id !== 0){
            retornar();
        }
    }, [usuario])

    function retornar(){
        navigate("/login");
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value);
    }

    //enviando o formulario para o back-end e com validações das informações
    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true);

        if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){

            //enviar os dados para o back-end
            try{
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
                alert('usuario cadastrado com sucesso')
            }catch(error)
            {
                alert('Erro ao cadastrar o usuario!')
            }

        }else{
            alert("Dados do usuario inconsistentes! Verifique as informações do cadastro.");
            setUsuario({
                ...usuario,
                senha:''
            });
            setConfirmarSenha('');
        }
        setIsLoading(false);
    }

    console.log(JSON.stringify(usuario));
    console.log("confirmarSenha: " + confirmarSenha);

    return (
        <>
            <div
                className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold"
            >
                <div
                    className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
                >
                </div>
                <form className="flex justify-center items-center flex-col w-2/3 gap-3"
                    onSubmit={cadastrarNovoUsuario}
                >
                    <h2 className="text-slate-900 text-5x1">Cadastrar</h2>
                    <div
                        className="flex flex-col w-full"
                    >
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" placeholder="Nome" className="border-2 border-slate-700 rounded p-2" 
                        value={usuario.nome} 
                        onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuario</label>
                        <input 
                        type="text" 
                        id="usuario" 
                        name="usuario" 
                        placeholder="usuario" 
                        className="border-2 border-sla p-2" 
                        value={usuario.usuario} 
                        onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}/>

                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="foto">Foto</label>
                        <input 
                        type="text" 
                        id="foto" 
                        name="foto" 
                        placeholder="foto" 
                        className="border-2 border-sla p-2" 
                        value={usuario.foto} 
                        onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}/>

                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input 
                        type="password" 
                        id="senha" 
                        name="senha" 
                        placeholder="senha" 
                        className="border-2 border-sla p-2" 
                        value={usuario.senha} 
                        onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}/>

                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="confirmarSenha">Confirma Senha</label>
                        <input 
                        type="password" 
                        id="confirmarSenha"
                        name="confirmarSenha" 
                        placeholder="confirmarSenha" 
                        className="border-2 border-sla p-2" 
                        value={confirmarSenha} 
                        onChange={(e: ChangeEvent<HTMLInputElement>)=> handleConfirmarSenha(e)}/>
                        
                    </div>
                    <div className="flex justify-around w-full gap-8">
                        <button
                            type='reset'
                            className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
                            onClick={retornar}
                        >Cancelar</button>
                        <button
                            type='submit'
                            className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center"
                        >
                            {   //se ? isloading for true carregue esse icone com a estilização senão :  a parece a letra cadastrar
                                isLoading ? 
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                >
                                </ClipLoader>
                                :
                                <span>Cadastrar</span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Cadastro