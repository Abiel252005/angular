import { Component, AfterViewChecked, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SearchApi, SearchFilters } from '../../services/search';
import { SiteItem } from '../../data/site-index';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [
    RouterModule, FormsModule, NgIf, AsyncPipe, NgFor
  ],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda implements AfterViewChecked {

  query = '';
  filters: SearchFilters = {
    type: 'todos',
    section: 'todas'
  }
  sections: string[] = [];
  results$!: Observable<SiteItem[]>;

  private shouldAnimateResults = false;
  private hasAnimated = false;

  constructor(
    private route: ActivatedRoute,
    private api: SearchApi,
    private animationService: AnimationService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.sections = this.api.getSections();
    this.route.queryParamMap.subscribe(params => {
      const qry = params.get('qry') ?? '';
      this.query = qry;
      this.doSearch();
    });
  }

  ngAfterViewChecked(): void {
    // Animar resultados cuando estén en el DOM
    if (this.shouldAnimateResults && !this.hasAnimated && isPlatformBrowser(this.platformId)) {
      const resultItems = document.querySelectorAll('.search-result-item');
      if (resultItems.length > 0) {
        this.animateSearchResults();
        this.hasAnimated = true;
        this.shouldAnimateResults = false;
      }
    }
  }

  doSearch(): void {
    this.hasAnimated = false;
    this.shouldAnimateResults = true;
    this.results$ = this.api.search(this.query, this.filters);
  }

  private animateSearchResults(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.animationService.animateSearchResults('.search-result-item');
    }
  }

  clear(): void {
    this.query = '';
    this.filters = { type: 'todos', section: 'todas' };
    this.doSearch();
  }
}
