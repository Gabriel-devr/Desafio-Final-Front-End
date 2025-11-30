import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, FooterComponent, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  icons: any[] = [
    { icon: 'group', p: 'Comunidade' },
    { icon: 'chat', p: 'Apoio 24/7' },
    { icon: 'trending_up', p: 'Crescimento' }
  ]

  cards: any[] = [
    { icon: 'error', h5: 'Dor Cronica', p: 'Dor generalizada persistente por mais de 3 meses' },
    { icon: 'pacemaker', h5: 'Fadiga', p: 'Sensação constaante de cansaço e exaustão' },
    { icon: 'network_intelligence', h5: 'Problemas Cognitivos', p: "Dificuldade de concentração e memória" },
    { icon: 'favorite', h5: 'Sensibilidade', p: 'Aumento da sensibilidade à dor e o toque' }

  ]

  point: any[] = [
    { icon: 'book_2', h5: 'Informação Confiável', p: 'Conteúdo validado por profissionais de saúde sobre tratamentos, sintomas e cuidados.' },
    { icon: 'group', h5: 'Comunidade Ativa', p: 'Conecte-se com pessoas que entendem sua jornada e compartilham experiências.' },
    { icon: 'chat', h5: 'Grupos de Apoio', p: "Participe de discussões, tire dúvidas e receba suporte emocional." },
    { icon: 'clear_day', h5: 'Recursos Exclusivos', p: 'Acesso a ferramentas, exercícios e dicas para melhorar sua qualidade de vida.' }
  ]

  community: any[] = [
    {
      h5: 'Compartilhe Experiências', p: 'Troque experiências com quem realmente entende sua situação'
    },
    {
      h5: 'Receba Apoio Emocional', p: 'Conte com o suporte de uma comunidade acolhedora'
    },
    {
      h5: 'Aprenda e Cresça', p: 'Descubra novas estratégias de enfrentamento e autocuidado'
    },
  ]
}
