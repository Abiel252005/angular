export type SiteItemType = 'pagina' | 'seccion';

export type SiteItem = {
    id: string;
    title: string;
    description: string;
    path: string;           // ruta Angular 
    type: SiteItemType;     //filtrado de búsqueda avanzada
    section: string;        // para filtrar por tema/seccion 
    keywords: string[];     // búsqueda simple 
    other?: String;         // atributo opcional
};

export const SITE_INDEX: SiteItem[] = [
   {
     id: 'inicio',
    title: 'inicio',
    description: 'Pagina principal del sitio de práctica.',
    path: '/',
    type: 'pagina',
    section: 'Estructura del sitio',
    keywords: ['inicio', 'home', 'principal', 'estructura'],
    other: "asasd"
   },
      {
     id: 'elementos',
    title: 'elementos',
    description: 'Elementos',
    path: '/elementos',
    type: 'pagina',
    section: 'Estructura del sitio',
    keywords: ['elementos', 'sitios', 'header', 'footer', 'main', 'layout'],
    other: "asasd"
   },
      {
     id: 'menu',
    title: 'menu',
    description: 'Menu',
    path: '/menu',
    type: 'pagina',
    section: 'Navegación',
    keywords: ['menu', 'navegación', 'navbar', 'links', 'persistente'],
    other: "asasd"
   },
    {
     id: 'breadcrumbs',
    title: 'Breadcrumbs',
    description: 'Describe el funcionamiento y utilidad de los breadcrumbs.',
    path: '/breadcrumbs',
    type: 'pagina',
    section: 'Estructura del sitio',
    keywords: ['breadcrumbs', 'migas', 'ruta', 'navegacion', 'ux'],
    other: "asasd"
   },
   {
      id: 'mapa',
      title: 'Mapa del sitio',
      description: 'Disñeo del mapa del sitio y relación con la navegación',
      path: '/mapa-sitio',
      type: 'pagina',
      section: 'Estructura del sitio',
      keywords: [ 'mapa', 'sitio', 'sitemap', 'estructura', 'rutas' ],
   },
   {
      id: 'error404',
      title: 'Error 404',
      description: 'Pagina para rutas no existentes (404).',
      path:'/no-existe',
      type: 'seccion',
      section: 'Errores',
      keywords: [ '404', 'error', 'no encontrado', 'ruta' ],
   },

];