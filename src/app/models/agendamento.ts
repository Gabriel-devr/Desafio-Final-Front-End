export interface Agendamento {
    titulo: string;
    data: string;
    horario: string;
    local: string;
    tipo: 'consulta' | 'exame' | 'terapia';
}
