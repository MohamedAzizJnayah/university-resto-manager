import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plat',
  templateUrl: './add-plat.component.html',
  styleUrls: ['./add-plat.component.css']
})
export class AddPlatComponent implements OnInit {
  platRequest = {
    id: 0,
    name: '',
    description: '',
    prix: 0,
    image: '',  // Changer ici pour une chaîne Base64
    menuId: 0
  };

  menus: any[] = []; // ➔ Liste des menus récupérés
  imagePreview: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus() {
    this.http.get<any[]>('http://localhost:5043/api/Menu')
      .subscribe(
        (response) => {
          this.menus = response;
          console.log('Menus chargés avec succès:', this.menus);
        },
        (error) => {
          console.error('Erreur lors du chargement des menus:', error);
        }
      );
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;  // Prévisualiser l'image
        // Convertir l'image en Base64 et l'affecter à platRequest.image
        this.platRequest.image = reader.result as string;
      };
      reader.readAsDataURL(file);  // Convertir l'image en Base64
    }
  }

  addPlat() {
    // Assurez-vous que menuId est un nombre
    this.platRequest.menuId = +this.platRequest.menuId;

    // Si vous envoyez l'image en Base64, assurez-vous de ne pas inclure le préfixe `data:image/png;base64,`
    const imageBase64 = this.platRequest.image.split(',')[1]; // Ne garder que la partie après `data:image/png;base64,`
    this.platRequest.image = imageBase64;

    this.http.post<any>('http://localhost:5043/api/Plat', this.platRequest)
      .subscribe(
        (response) => {
          console.log('Plat ajouté avec succès:', this.platRequest);
          console.log('Plat ajouté avec succès:', response);
          this.router.navigate(['/menu']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du plat:', error);
        }
      );
  }
}
