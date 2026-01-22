import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { SITE_INDEX, SiteItem } from '../data/site-index';

export type SearchFilters = {
    type?: 'todos' | 'pagina' | 'seccion';
    section?: 'todas' | string;
}

@Injectable({ providedIn: 'root' })
export class SearchApi {
    search(query: string, filters: SearchFilters):
        Observable<SiteItem[]> {
        const qry = (query || '').trim().toLowerCase();
        let data = [...SITE_INDEX];
        if (qry.length > 0) {
            data = data.filter(item => {
                const haystack =
                    (item.title + ' ' + item.description + ' ' + item.keywords.join(' '))
                        .toLowerCase();
                return haystack.includes(qry);
            }
            );
        }
        if (filters.type && filters.type !== 'todos') {
            data = data.filter(item => item.type === filters.type);
        }
        if (filters.section && filters.section !== 'todas') {
            data = data.filter(item => item.section === filters.section);
        }
        return of(data).pipe(delay(200));
    }
};