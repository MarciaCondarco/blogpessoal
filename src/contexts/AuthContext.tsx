import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps{
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps{
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({children}: AuthProviderProps){

    // inicializando o estado usuario (guardar os dados do usuario autenticado)
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario:"",
        senha:"",
        foto:"",
        token:""
    })

    // inicializar o estado isloading (exibir e ocultar p loader no formulario de login)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    // implementação da função de login (autenticação no backend)

    async function handleLogin(usuarioLogin: UsuarioLogin){
        setIsLoading(true);
        try{
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            alert("Usuário autenticado com sucesso!!");
        }catch(error){
            alert("Os dados do usuário estão inconsistentes!");
        }

        setIsLoading(false);

    }

    // implementação da função de logout (desconectar o usuario)
    function handleLogout(){
            setUsuario({
            id: 0,
            nome: "",
            usuario:"",
            senha:"",
            foto:"",
            token:""
        });
    }
    return(
        <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}