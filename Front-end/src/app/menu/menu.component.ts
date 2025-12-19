import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menus: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {  
    // Effectuer une requête GET pour récupérer les menus
    this.http.get<any[]>('http://localhost:5043/api/Menu')
      .subscribe(
        (response) => {
          this.menus = response.map(menu => {
            // Si l'image est en base64, ajoutez le préfixe
            if (menu.image && !menu.image.startsWith('http')) {
              menu.image = 'data:image/jpeg;base64,' + menu.image;
            }
            return menu;
          });
        },
        (error) => {
          console.error('Une erreur est survenue:', error);
        }
      );
  }

 consulterMenu(menuId: number) {
    this.router.navigate(['/plat', menuId]);  // Envoie l'ID du menu vers PlatComponent
  }
}
