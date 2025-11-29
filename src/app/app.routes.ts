import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroPessoalComponent } from './components/cadastro-pessoal/cadastro-pessoal.component';
import { CadastroProfissionalComponent } from './components/cadastro-profissional/cadastro-profissional.component';

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
                path: 'cadastro-pessoal',
                component: CadastroPessoalComponent
            },
            {
                path: 'cadastro-profissional',
                component: CadastroProfissionalComponent
            }
        ]
    },


];
