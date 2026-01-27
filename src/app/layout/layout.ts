import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../component/shared/breadcrumb/breadcrumb';
import { AnimationService } from '../services/animation.service';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, Breadcrumb, FormsModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  standalone: true
})
export class Layout implements AfterViewInit, OnDestroy {

  quickQuery = '';
  private hoverCleanup: (() => void)[] = [];
  year: number = 0;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private animationService: AnimationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void { // función para obtener el año actual y mostrarlo en el footer.
    const date = new Date();
    this.year = date.getFullYear();
  }

  ngAfterViewInit(): void {
    // Solo ejecutar animaciones en el navegador (no en SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  ngOnDestroy(): void {
    // Limpiar event listeners de hover
    this.hoverCleanup.forEach(cleanup => cleanup());
  }

  private initAnimations(): void {
    const nativeElement = this.elementRef.nativeElement;

    // 1. Animar header
    const header = nativeElement.querySelector('.topbar');
    if (header) {
      this.animationService.animateHeader(header);
    }

    // 2. Animar brand/logo
    const brand = nativeElement.querySelector('.brand');
    if (brand) {
      this.animationService.animateBrand(brand);
    }

    // 3. Animar links del menú con stagger
    this.animationService.animateMenuLinks('.menu a');

    // 4. Configurar hover effects en links del menú
    const menuLinks = nativeElement.querySelectorAll('.menu a');
    menuLinks.forEach((link: HTMLElement) => {
      const hoverEffect = this.animationService.createHoverEffect(link);

      const enterHandler = () => hoverEffect.enter();
      const leaveHandler = () => hoverEffect.leave();

      link.addEventListener('mouseenter', enterHandler);
      link.addEventListener('mouseleave', leaveHandler);

      // Guardar referencia para cleanup
      this.hoverCleanup.push(() => {
        link.removeEventListener('mouseenter', enterHandler);
        link.removeEventListener('mouseleave', leaveHandler);
      });
    });

    // 5. Animar contenido con scroll
    this.animationService.setupScrollAnimation('.content');

    // 6. Animar footer con scroll
    this.animationService.animateFooterOnScroll('.footer');
  }

  goSearch(): void {
    const qry = (this.quickQuery || '').trim();
    this.router.navigate(['/busqueda'], { queryParams: { qry } });
  }
}
