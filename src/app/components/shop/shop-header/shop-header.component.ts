import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop-header',
  imports: [],
  templateUrl: './shop-header.component.html',
  styleUrl: './shop-header.component.scss'
})
export class ShopHeaderComponent {

  constructor(private router: Router) { }

  onCartClick() {
    this.router.navigate(['/cart']);
  }

}
