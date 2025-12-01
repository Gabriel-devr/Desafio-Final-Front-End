import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [FormsModule, CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  novoPostTexto: string = '';

  posts: Post[] = [
    {
      autor: 'Ana Silva',
      avatar: 'AS',
      avatarCor: 'bg-warning',
      tempo: '2h atrás',
      conteudo: 'Hoje consegui fazer 30 minutos de caminhada! 🎉',
      likes: 12,
      comentarios: 3,
      liked: false
    },
    {
      autor: 'Carlos Souza',
      avatar: 'CS',
      avatarCor: 'bg-danger',
      tempo: '4h atrás',
      conteudo: 'Alguém mais sente que o tempo chuvoso piora as dores? Preciso de dicas.',
      likes: 5,
      comentarios: 8,
      liked: false
    },
    {
      autor: 'Maria Oliveira',
      avatar: 'MO',
      avatarCor: '#6f42c1',
      tempo: '1d atrás',
      conteudo: 'Frase do dia: "Não se cobre tanto. Você está fazendo o seu melhor." 💜',
      likes: 20,
      comentarios: 5,
      liked: true
    }
  ];

  publicar() {
    if (!this.novoPostTexto.trim()) {
      return;
    }

    const novoPost: Post = {
      autor: 'Rondineli Andrade',
      avatar: 'RA',
      avatarCor: 'var(--primary)',
      tempo: 'Agora mesmo',
      conteudo: this.novoPostTexto,
      likes: 0,
      comentarios: 0,
      liked: false
    };

    this.posts.unshift(novoPost);
    this.novoPostTexto = '';
  }

  toggleLike(post: Post) {
    post.liked = !post.liked;
    post.liked ? post.likes++ : post.likes--;
  }

  curtir(post: Post) {
    post.liked = !post.liked;

    if (post.liked) {
      post.likes++;
    } else {
      post.likes--;
    }
  }
  compartilhar(post: Post) {
    if (navigator.share) {
      navigator.share({
        title: `Post de ${post.autor}`,
        text: post.conteudo,
        url: window.location.href
      }).catch(err => console.log('Erro ao compartilhar', err));
    } else {
      alert('Link copiado para a área de transferência!');
    }
  }
}

