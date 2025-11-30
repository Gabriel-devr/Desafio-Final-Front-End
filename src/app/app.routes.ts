import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroPessoalComponent } from './components/cadastro-pessoal/cadastro-pessoal.component';
import { CadastroProfissionalComponent } from './components/cadastro-profissional/cadastro-profissional.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FeedComponent } from './pages/feed/feed.component';
import { EncontrosComponent } from './pages/encontros/encontros.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
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
        component: FeedComponent
    },
    {
        path: 'encontros',
        component: EncontrosComponent
    },
    {
        path: 'perfil',
        component: PerfilComponent
    }


];
