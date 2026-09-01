import { defineConfig } from 'astro/config';

/*
  Sin `site` todavía: Aether Tech no tiene dominio propio desplegado. En cuanto
  lo haya, se agrega aquí (usa Astro.site en CommercialLayout para el og:url) —
  mientras tanto esa URL se arma relativa al request.

  El cotizador vive en /quote y no en la raíz a propósito, igual que en el
  portafolio de origen: cuando exista una landing pública de Aether Tech, la
  raíz será suya y /quote seguirá siendo la herramienta de la reunión. Por
  ahora, mientras no hay nada más en el sitio, la raíz redirige a /quote para
  no llegar a una página en blanco.
*/
export default defineConfig({
  redirects: {
    '/': '/quote',
  },
});
