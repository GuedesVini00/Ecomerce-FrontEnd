import { Routes } from '@angular/router';

import { Inicio } from './inicio/inicio';
import { Vitrine } from './vitrine/vitrine';
import { Cesta } from './cesta/cesta';
import { Cadastro } from './cadastro/cadastro';
import { Login } from './login/login';
import { Detalhe } from './detalhe/detalhe';
import { Pedido } from './pedido/pedido';

export const routes: Routes = [

  {
    path: '',
    component: Inicio
  },

  {
    path: 'produtos',
    component: Vitrine
  },

  {
    path: 'cesta',
    component: Cesta
  },

  {
    path: 'cadastro',
    component: Cadastro
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'detalhe',
    component: Detalhe
  },

  {
    path: 'pedido',
    component: Pedido
  }

];