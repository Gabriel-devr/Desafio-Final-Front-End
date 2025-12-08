export interface Profissional {
    id: number;
    nome: string;
    especialidade: 'Reumatologista' | 'Psicólogo' | 'Fisioterapeuta' | 'Nutricionista' | 'Psiquiatra';
    registro: string;
    descricao: string;
    localizacao: string;
    avaliacao: number;
    foto: string;
    telefone: string;
    email: string;
    verificado: boolean;
    isUserCreated?: boolean;
}