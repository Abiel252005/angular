import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { ElementosSitio } from './pages/elementos-sitio/elementos-sitio';
import { Menu } from './pages/menu/menu';
import { Breadcrumb } from './component/shared/breadcrumb/breadcrumb';
import { MapaSitio } from './pages/mapa-sitio/mapa-sitio';
import { Error404 } from './pages/error-404/error-404';
import { Component } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: Inicio,
        pathMatch: 'full'
    },

    {
        path: 'elementos-sitio',
        component: ElementosSitio
    },
    {
        path: 'menu',
        component: Menu
    },
    {
        path: 'breadcrumb',
        component: Breadcrumb
    },
    {
        path: 'mapa-sitio',
        component: MapaSitio
    },
    {
        path: '**',
        component: Error404
    }
];

