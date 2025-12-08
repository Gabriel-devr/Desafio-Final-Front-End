import { Injectable, signal } from '@angular/core';
import { Post } from '../models/post';
import { Profissional } from '../models/profissional';
import { Agendamento } from '../models/agendamento';
import { RegistroDiario } from '../models/registro-diario';

export interface PostComId extends Post { id: number; }
export interface ProfissionalComId extends Profissional { criadoPeloUsuario?: boolean; }
export interface Encontro {
  id: number;
  data: string;
  titulo: string;
  descricao: string;
  local: string;
  tipo: string;
  imagem?: string;
  cor?: string;
  criadoPeloUsuario?: boolean;
}
export interface AgendamentoComId extends Agendamento { id: number; }
export interface RegistroComId extends RegistroDiario { id: number; }

export interface Usuario {
  nome: string;
  email: string;
  senha?: string;
  tipo: 'paciente' | 'profissional';
  especialidade?: string;
  registro?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  posts = signal<PostComId[]>([]);
  profissionais = signal<ProfissionalComId[]>([]);
  encontros = signal<Encontro[]>([]);
  agendamentos = signal<AgendamentoComId[]>([]);
  historicoDiario = signal<RegistroComId[]>([]);
  usuarios = signal<Usuario[]>([]);

  constructor() {
    this.carregarDados();
  }

  private carregarDados() {

    const posts = localStorage.getItem('posts');
    this.posts.set(posts ? JSON.parse(posts) : this.getPostsMock());

    const profs = localStorage.getItem('profissionais');
    this.profissionais.set(profs ? JSON.parse(profs) : this.getProfissionaisMock());

    const enc = localStorage.getItem('encontros');
    this.encontros.set(enc ? JSON.parse(enc) : this.getEncontrosMock());

    const agen = localStorage.getItem('agendamentos');
    this.agendamentos.set(agen ? JSON.parse(agen) : this.getAgendamentosMock());

    const hist = localStorage.getItem('historico');
    this.historicoDiario.set(hist ? JSON.parse(hist) : this.getHistoricoMock());

    const users = localStorage.getItem('usuarios');
    this.usuarios.set(users ? JSON.parse(users) : this.getUsuariosMock());
  }

  adicionarPost(post: Post) {
    const novoPost: PostComId = { ...post, id: Date.now() };
    this.posts.update(l => [novoPost, ...l]);
    this.salvar('posts', this.posts());
  }

  adicionarProfissional(prof: Profissional) {
    const novoProf: ProfissionalComId = { ...prof, criadoPeloUsuario: true };
    this.profissionais.update(l => [novoProf, ...l]);
    this.salvar('profissionais', this.profissionais());
  }

  adicionarEncontro(encontro: any) {
    const novoEncontro: Encontro = { ...encontro, id: Date.now(), criadoPeloUsuario: true };
    this.encontros.update(l => [novoEncontro, ...l]);
    this.salvar('encontros', this.encontros());
  }

  adicionarAgendamento(agendamento: Agendamento) {
    const novo: AgendamentoComId = { ...agendamento, id: Date.now() };
    this.agendamentos.update(l => [novo, ...l]);
    this.salvar('agendamentos', this.agendamentos());
  }

  adicionarRegistro(registro: RegistroDiario) {
    const novo: RegistroComId = { ...registro, id: Date.now() };
    this.historicoDiario.update(l => [novo, ...l]);
    this.salvar('historico', this.historicoDiario());
  }

  adicionarUsuario(usuario: Usuario) {
    this.usuarios.update(lista => [...lista, usuario]);
    this.salvar('usuarios', this.usuarios());
  }

  removerPost(id: number) {
    this.posts.update(l => l.filter(item => item.id !== id));
    this.salvar('posts', this.posts());
  }

  removerProfissional(id: number) {
    this.profissionais.update(l => l.filter(item => item.id !== id));
    this.salvar('profissionais', this.profissionais());
  }

  removerEncontro(id: number) {
    this.encontros.update(l => l.filter(item => item.id !== id));
    this.salvar('encontros', this.encontros());
  }

  removerAgendamento(id: number) {
    this.agendamentos.update(l => l.filter(item => item.id !== id));
    this.salvar('agendamentos', this.agendamentos());
  }

  removerHistorico(id: number) {
    this.historicoDiario.update(l => l.filter(item => item.id !== id));
    this.salvar('historico', this.historicoDiario());
  }

  private salvar(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getPostsMock(): PostComId[] {
    return [
      { id: 1, autor: 'Ana Silva', avatar: 'AS', avatarCor: 'bg-warning', tempo: '2h atrás', conteudo: 'Hoje consegui fazer 30 minutos de caminhada! 🎉 A persistência é a chave, mesmo nos dias difíceis.', likes: 12, comentarios: 3, liked: false },
      { id: 2, autor: 'Carlos Souza', avatar: 'CS', avatarCor: 'bg-danger', tempo: '4h atrás', conteudo: 'Alguém mais sente que o tempo chuvoso piora as dores? Preciso de dicas para aliviar a rigidez nestes dias frios.', likes: 5, comentarios: 8, liked: false },
      { id: 3, autor: 'Maria Oliveira', avatar: 'MO', avatarCor: '#6f42c1', tempo: '1d atrás', conteudo: 'Frase do dia: "Não se cobre tanto. Você está fazendo o seu melhor." 💜 Lembrem-se de descansar.', likes: 20, comentarios: 5, liked: true },
      { id: 4, autor: 'Lucas Pereira', avatar: 'LP', avatarCor: '#2ecc71', tempo: '2d atrás', conteudo: 'Comecei a hidroginástica por recomendação da minha reumatologista e estou adorando! A água quentinha ajuda muito no relaxamento muscular.', likes: 34, comentarios: 12, liked: false },
      { id: 5, autor: 'Fernanda Lima', avatar: 'FL', avatarCor: '#e67e22', tempo: '3d atrás', conteudo: 'Hoje foi um daqueles dias de "fibro fog". Esqueci onde coloquei as chaves três vezes... Alguém tem dicas para melhorar a concentração?', likes: 15, comentarios: 20, liked: false },
      { id: 6, autor: 'Grupo Fibro Apoio', avatar: 'GA', avatarCor: '#3498db', tempo: '5d atrás', conteudo: '📢 Lembrete: Nosso encontro mensal online será neste sábado! O tema será "Nutrição e Inflamação". Não percam!', likes: 45, comentarios: 2, liked: true }
    ];
  }

  private getProfissionaisMock(): ProfissionalComId[] {
    return [
      { id: 101, nome: 'Dra. Helena Costa', especialidade: 'Reumatologista', registro: 'CRM/SP 123456', descricao: 'Especialista em dor crônica e fibromialgia com abordagem integrativa e humanizada.', localizacao: 'São Paulo (Online)', avaliacao: 4.9, foto: 'assets/pexels-gabby-k-7114420.jpg', telefone: '11999998888', email: 'helena@email.com', verificado: true, criadoPeloUsuario: false },
      { id: 102, nome: 'Dr. Marcos Silva', especialidade: 'Fisioterapeuta', registro: 'CREFITO 45678', descricao: 'Reabilitação funcional focada em alívio de dores musculares e fortalecimento leve.', localizacao: 'Rio de Janeiro', avaliacao: 4.8, foto: '', telefone: '21999997777', email: 'marcos@email.com', verificado: true, criadoPeloUsuario: false },
      { id: 103, nome: 'Clara Mendes', especialidade: 'Psicólogo', registro: 'CRP 06/12345', descricao: 'Terapia cognitivo-comportamental (TCC) para gestão da dor e controle da ansiedade.', localizacao: 'Online', avaliacao: 5.0, foto: '', telefone: '11988888888', email: 'clara@email.com', verificado: false, criadoPeloUsuario: false },
      { id: 104, nome: 'Dra. Juliana Paes', especialidade: 'Nutricionista', registro: 'CRN 54321', descricao: 'Nutrição anti-inflamatória personalizada para pacientes com doenças autoimunes e fibromialgia.', localizacao: 'Salvador (Online)', avaliacao: 4.9, foto: '', telefone: '71999996666', email: 'juliana.nutri@email.com', verificado: true, criadoPeloUsuario: false },
      { id: 105, nome: 'Dr. Roberto Campos', especialidade: 'Psiquiatra', registro: 'CRM/MG 987654', descricao: 'Acompanhamento psiquiátrico com foco em transtornos de humor associados à dor crônica.', localizacao: 'Belo Horizonte', avaliacao: 4.7, foto: '', telefone: '31999995555', email: 'roberto.psiq@email.com', verificado: true, criadoPeloUsuario: false },
      { id: 106, nome: 'Ana Beatriz Souza', especialidade: 'Fisioterapeuta', registro: 'CREFITO 11223', descricao: 'Especialista em Pilates clínico e hidroterapia para alívio de tensões.', localizacao: 'Curitiba', avaliacao: 5.0, foto: '', telefone: '41999994444', email: 'ana.fisio@email.com', verificado: false, criadoPeloUsuario: false }
    ];
  }

  private getEncontrosMock(): Encontro[] {
    return [
      { id: 201, data: 'Sáb, 15 Jun - 16:00', titulo: 'Roda de Conversa Online', descricao: 'Um espaço seguro para compartilhar experiências e desabafar.', local: 'Online (Google Meet)', tipo: 'online', cor: '#E1BEE7', criadoPeloUsuario: false },
      { id: 202, data: 'Dom, 16 Jun - 09:00', titulo: 'Caminhada no Parque da Cidade', descricao: 'Exercício leve ao ar livre no Itaigara. Traga sua garrafinha de água!', local: 'Parque da Cidade, Salvador', tipo: 'presencial', cor: '#B2DFDB', criadoPeloUsuario: false },
      { id: 203, data: 'Seg, 17 Jun - 19:00', titulo: 'Meditação Guiada', descricao: 'Sessão de mindfulness para relaxamento profundo e preparo para o sono.', local: 'Online (Zoom)', tipo: 'online', cor: '#FFF9C4', criadoPeloUsuario: false },
      { id: 204, data: 'Qua, 19 Jun - 14:00', titulo: 'Workshop de Nutrição', descricao: 'Dicas de alimentação anti-inflamatória com a Dra. Juliana.', local: 'Centro Cultural, Pelourinho', tipo: 'presencial', cor: '#FFCCBC', criadoPeloUsuario: false },
      { id: 205, data: 'Sex, 21 Jun - 10:00', titulo: 'Yoga Suave', descricao: 'Prática adaptada para alívio de dores nas articulações.', local: 'Online (Instagram Live)', tipo: 'online', cor: '#C5CAE9', criadoPeloUsuario: false }
    ];
  }

  private getAgendamentosMock(): AgendamentoComId[] {
    return [
      { id: 301, titulo: 'Reumatologista', data: '2025-06-15', horario: '14:00', local: 'Clínica Saúde', tipo: 'consulta' },
      { id: 302, titulo: 'Pilates', data: '2025-06-18', horario: '09:00', local: 'Studio Vital', tipo: 'terapia' },
      { id: 303, titulo: 'Exame de Sangue', data: '2025-06-20', horario: '07:30', local: 'Lab. Central', tipo: 'exame' }
    ];
  }

  private getHistoricoMock(): RegistroComId[] {
    return [
      { id: 401, data: new Date(new Date().setDate(new Date().getDate() - 1)), nivelDor: 4, nivelFadiga: 5, humor: 'triste', notas: 'Senti um pouco de dor nas costas após o trabalho. Tomei banho quente e melhorou.' },
      { id: 402, data: new Date(new Date().setDate(new Date().getDate() - 2)), nivelDor: 2, nivelFadiga: 3, humor: 'feliz', notas: 'Caminhada leve ajudou bastante hoje. Dormi bem.' },
      { id: 403, data: new Date(new Date().setDate(new Date().getDate() - 3)), nivelDor: 6, nivelFadiga: 7, humor: 'ansioso', notas: 'Crise de ansiedade leve, afetou o sono. Fadiga alta.' },
      { id: 404, data: new Date(new Date().setDate(new Date().getDate() - 4)), nivelDor: 3, nivelFadiga: 2, humor: 'neutro', notas: 'Dia tranquilo, segui a dieta corretamente.' }
    ];
  }

  private getUsuariosMock(): Usuario[] {
    return [
      { nome: 'Rondineli Andrade', email: 'rondineli@email.com', senha: '123', tipo: 'paciente' },
      { nome: 'Dra. Helena', email: 'helena@email.com', senha: '123', tipo: 'profissional' }
    ];
  }
}