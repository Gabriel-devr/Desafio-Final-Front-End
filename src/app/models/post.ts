export interface Post {
    id: number;
    autor: string;
    avatar: string;
    avatarCor: string;
    tempo: string;
    conteudo: string;
    likes: number;
    comentarios: number;
    liked: boolean;
    isUserCreated?: boolean;
}