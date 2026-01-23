import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchApi, SearchFilters } from '../../services/search';
import { SiteItem } from '../../data/site-index';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [
    RouterModule, FormsModule, NgForm, NgIf, AsyncPipe,
  ],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {

  query = '';
  filters: SearchFilters = {
    type: 'todos',
    section: 'todas'
  }
  sections: string[] = [];
  results$!: Observable<SiteItem[]>

  constructor(private route: ActivatedRoute, private api: SearchApi) {
    this.sections = this.api.getSections();
    this.route.queryParamMap.subscribe(params => {
      const qry = params.get('q') ?? '';
      this.query = qry;
      this.doSearch();
    });
  }

  doSearch(): void {
    this.results$ = this.api.search(this.query, this.filters);
  }
  clear(): void {
    this.query = ' ';
    this.filters = { type: 'todos', section: 'todas' };
    this.doSearch();
  }
}
