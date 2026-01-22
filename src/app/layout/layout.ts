import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from '../component/shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, Breadcrumb],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  standalone: true

})
export class Layout {

}
