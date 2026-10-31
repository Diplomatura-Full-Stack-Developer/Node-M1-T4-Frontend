import { Routes } from '@angular/router';
import { MainLayout } from './shell/main-layout/main-layout';
import Home from './shell/pages/home/home';


export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'about',
        loadComponent: () => import('./shell/pages/about/about')
      },
      {
        path: 'contact',
        loadComponent: () => import('./shell/pages/contact/contact')
      },
      {
        path: 'add-product',
        loadComponent: () => import('./features/products/pages/add-product-form/add-product-form')
      },
      {
        path: 'register',
        loadComponent: () => import('./features/users/pages/register/register')
      },
      {
        path: 'login',
        loadComponent: () => import('./features/users/pages/login/login')
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./features/products/pages/product/product')
      },
      {
        path: 'products-cart',
        loadComponent: () => import('./features/products/pages/products-cart/products-cart')
      },
    ],
  },
];
