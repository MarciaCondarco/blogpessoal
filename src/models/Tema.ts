import type Postagem from "./Postagem";

export default interface Temas{
    id: number;
    descricao:string;
    postagem?: Postagem[] | null; 
}