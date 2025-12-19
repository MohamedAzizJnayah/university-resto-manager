import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {
  plats: any[] = [];
  menuId!: number;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router   // ✅ injecte correctement le Router ici
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.menuId = +params['menuId'];
      this.getPlatsByMenuId();
    });

    this.checkIsAdmin();
  }

  getPlatsByMenuId() {
    this.http.get<any[]>(`http://localhost:5043/api/Plat/${this.menuId}`)
      .subscribe(
        (response) => {
          this.plats = response.map(plat => {
            if (plat.image && !plat.image.startsWith('http')) {
              plat.image = 'data:image/jpeg;base64,' + plat.image;
            }
            return plat;
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des plats:', error);
        }
      );
  }

  deletePlat(platId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      this.http.delete(`http://localhost:5043/api/Plat/${platId}`)
        .subscribe(
          () => {
            this.plats = this.plats.filter(plat => plat.id !== platId);
            console.log('Plat supprimé avec succès.');
          },
          (error) => {
            console.error('Erreur lors de la suppression du plat:', error);
          }
        );
    }
  }

  checkIsAdmin() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.role === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  reserverPlat(platId: number) {
    // Récupérer le plat correspondant en utilisant son id
    const plat = this.plats.find(p => p.id === platId);

    // Vérifier si le plat existe
    if (plat) {
      // Sauvegarder l'objet du plat dans sessionStorage
      sessionStorage.setItem('selectedPlat', JSON.stringify(plat));

      // Naviguer vers la page de réservation
      this.router.navigate(['/reservation']);
    } else {
      console.error('Plat non trouvé');
    }
  }
}
