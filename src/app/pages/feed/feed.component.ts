import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  novoPostTexto: string = '';

  posts: Post[] = [
    {
      id: 1,
      autor: 'Ana Silva',
      avatar: 'AS',
      avatarCor: 'bg-warning',
      tempo: '2h atrás',
      conteudo: 'Hoje consegui fazer 30 minutos de caminhada! 🎉 A persistência é o segredo.',
      likes: 12,
      comentarios: 3,
      liked: false,
      isUserCreated: false
    },
    {
      id: 2,
      autor: 'Carlos Souza',
      avatar: 'CS',
      avatarCor: 'bg-danger',
      tempo: '4h atrás',
      conteudo: 'Alguém mais sente que o tempo chuvoso piora as dores? Preciso de dicas para aliviar o desconforto nesses dias.',
      likes: 5,
      comentarios: 8,
      liked: false,
      isUserCreated: false
    },
    {
      id: 3,
      autor: 'Maria Oliveira',
      avatar: 'MO',
      avatarCor: '#6f42c1',
      tempo: '1d atrás',
      conteudo: 'Frase do dia: "Não se cobre tanto. Você está fazendo o seu melhor." 💜 Respeite seus limites.',
      likes: 20,
      comentarios: 5,
      liked: true,
      isUserCreated: false
    },
    {
      id: 4,
      autor: 'Patrícia Lima',
      avatar: 'PL',
      avatarCor: '#e91e63',
      tempo: '1d atrás',
      conteudo: 'Comecei a acupuntura semana passada e já estou sentindo uma leve melhora no sono. Alguém mais faz?',
      likes: 8,
      comentarios: 12,
      liked: false,
      isUserCreated: false
    },
    {
      id: 5,
      autor: 'João Paulo',
      avatar: 'JP',
      avatarCor: '#3f51b5',
      tempo: '2d atrás',
      conteudo: 'Hoje o dia está difícil, muita fadiga. Mas sigo firme, um passo de cada vez. Bom dia a todos!',
      likes: 15,
      comentarios: 2,
      liked: false,
      isUserCreated: false
    },
    {
      id: 6,
      autor: 'Dra. Cláudia',
      avatar: 'DC',
      avatarCor: '#009688',
      tempo: '2d atrás',
      conteudo: 'Lembrete profissional: A hidratação é fundamental para o funcionamento muscular. Não esqueçam de beber água!',
      likes: 45,
      comentarios: 0,
      liked: true,
      isUserCreated: false
    },
    {
      id: 7,
      autor: 'Ricardo Alves',
      avatar: 'RA',
      avatarCor: '#ff9800',
      tempo: '3d atrás',
      conteudo: 'A hidroginástica em água aquecida tem sido minha salvação. Recomendo muito para quem sente dores articulares.',
      likes: 22,
      comentarios: 6,
      liked: false,
      isUserCreated: false
    },
    {
      id: 8,
      autor: 'Mariana Costa',
      avatar: 'MC',
      avatarCor: '#795548',
      tempo: '3d atrás',
      conteudo: 'Finalmente consegui dormir 8 horas seguidas! Parece um milagre. Pequenas vitórias que merecem ser celebradas.',
      likes: 30,
      comentarios: 10,
      liked: true,
      isUserCreated: false
    },
    {
      id: 9,
      autor: 'Grupo Viver Bem',
      avatar: 'GV',
      avatarCor: '#607d8b',
      tempo: '4d atrás',
      conteudo: 'Compartilhando um artigo interessante sobre a relação entre alimentação e inflamação. O link está na bio do grupo!',
      likes: 18,
      comentarios: 1,
      liked: false,
      isUserCreated: false
    },
    {
      id: 10,
      autor: 'Sônia Pereira',
      avatar: 'SP',
      avatarCor: '#9c27b0',
      tempo: '5d atrás',
      conteudo: 'Bom dia guerreiros! Que a nossa semana seja leve e com menos dor. Força para nós! 💪',
      likes: 25,
      comentarios: 4,
      liked: true,
      isUserCreated: false
    }
  ];

  publicar() {
    if (!this.novoPostTexto.trim()) {
      return;
    }


    const novoId = this.posts.length > 0 ? Math.max(...this.posts.map(p => p.id)) + 1 : 1;

    const novoPost: Post = {
      id: novoId,
      autor: 'Rondineli Andrade',
      avatar: 'RA',
      avatarCor: 'var(--primary)',
      tempo: 'Agora mesmo',
      conteudo: this.novoPostTexto,
      likes: 0,
      comentarios: 0,
      liked: false,
      isUserCreated: true
    };

    this.posts.unshift(novoPost);
    this.novoPostTexto = '';
  }

  curtir(post: Post) {
    post.liked = !post.liked;
    post.liked ? post.likes++ : post.likes--;
  }

  compartilhar(post: Post) {
    if (navigator.share) {
      navigator.share({
        title: `Post de ${post.autor}`,
        text: post.conteudo,
        url: window.location.href
      }).catch(err => console.log('Erro ao compartilhar', err));
    }
  }


  excluirPost(id: number) {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}