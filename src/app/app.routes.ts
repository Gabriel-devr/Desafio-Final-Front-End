import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroPessoalComponent } from './components/cadastro-pessoal/cadastro-pessoal.component';
import { CadastroProfissionalComponent } from './components/cadastro-profissional/cadastro-profissional.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FeedComponent } from './pages/feed/feed.component';
import { EncontrosComponent } from './pages/encontros/encontros.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProfissionalComponent } from './pages/profissional/profissional.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard],
        children: [
            {
                path: '',
                component: LoginFormComponent
            },
            {
                path: 'cadastro-pessoal',
                component: CadastroPessoalComponent
            },
            {
                path: 'cadastro-profissional',
                component: CadastroProfissionalComponent
            }
        ]
    },
    {
        path: 'feed',
        component: FeedComponent,
        canActivate: [authGuard]
    },
    {
        path: 'encontros',
        component: EncontrosComponent,
        canActivate: [authGuard]
    },
    {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [authGuard]
    },
    {
        path: 'profissionais',
        component: ProfissionalComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }

];
