import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Breadcrumb } from '../component/shared/breadcrumb/breadcrumb';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, Breadcrumb],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  standalone: true

})
export class Layout {

  quickQuery = '';
  constructor(private router: Router) { }
  goSearch(): void {
    const qry = (this.quickQuery || '').trim();
    this.router.navigate(['/busqueda'], { queryParams: { qry } });
  }

}
