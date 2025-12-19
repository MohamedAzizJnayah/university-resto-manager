import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Reservation {
  date: string;
  id: number;
  etudiant: {
    nom: string;
    prenom: string;
  };
  plat: {
    name: string;
    prix: number;
  };
}

@Component({
  selector: 'app-liste-reseervation',
  templateUrl: './liste-reseervation.component.html',
  styleUrls: ['./liste-reseervation.component.css']
})
export class ListeReseervationComponent {
  reservations: Reservation[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const usrString = sessionStorage.getItem('user');

    if (usrString) {
      // Convertir la chaîne JSON en objet utilisateur
      const user = JSON.parse(usrString);

      // Construire le payload pour une éventuelle requête HTTP
      const payload = {
        cin: user.cin,
        motpasse: user.motpasse
      };

      console.log('Payload généré:', payload);

      // Requête pour récupérer les réservations
      this.http.post('http://localhost:3600/api/reservation/listeReservation', payload).subscribe(
        (response: any) => {
          this.reservations = response;
          console.log('Authentification réussie:', this.reservations);
        },
        (error) => {
          console.error('Erreur lors de l’authentification:', error);
        }
      );
    }
  }

  // Méthode pour supprimer une réservation
  deleteReservation(id: number): void {
    const confirmation = confirm('Voulez-vous vraiment supprimer cette réservation ?');
    if (confirmation) {
      const idDelete = { "id":id }; // Créez un objet contenant l'ID de la réservation à supprimer

      // Envoi de la requête DELETE avec le body contenant l'ID de la réservation
      this.http.request('DELETE', 'http://localhost:3600/api/reservation/deleteReservation', {
        body: idDelete,
        responseType: 'text' // Spécifie que la réponse sera du texte brut
      }).subscribe(
        (response: string) => {
          console.log(response); 
          this.reservations = this.reservations.filter(reservation => reservation.id !== id);// "Réservation supprimée avec succès" // Recharger la liste des réservations
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error.error);
        }
      );
    }
      
  }
}
