import { RenderMode, ServerRoute } from '@angular/ssr';
import { CoursesService } from './services/courses.service';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'courses/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(CoursesService);
      const ids = await dataService.getIds();
      return ids.map(id => ({ id }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
];
