import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  message: string = '';
  messageClass: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const platString = sessionStorage.getItem('selectedPlat');
    const etudiantString = sessionStorage.getItem('user');
    console.log(etudiantString);
    if (platString && etudiantString) {
      const plat = JSON.parse(platString);
      const etudiant = JSON.parse(etudiantString);
      console.log(plat, etudiant);  // Vérifie si les données sont correctement récupérées
      this.fillForm(plat, etudiant);
    } else {
      console.error('Plat ou étudiant non trouvé dans sessionStorage');
    }
  }

  fillForm(plat: any, etudiant: any): void {
    const platNameInput = document.getElementById('platName') as HTMLInputElement;
    const platPrice = document.getElementById('totalPrice') as HTMLInputElement;
    const studentNameInput = document.getElementById('studentName') as HTMLInputElement;
    const studentCINInput = document.getElementById('studentCIN') as HTMLInputElement;
    const dateInput = document.getElementById('reservationDate') as HTMLInputElement;

    if (platNameInput) platNameInput.value = plat.name;
    if (platPrice) platPrice.value = plat.prix;
    if (studentNameInput) studentNameInput.value = `${etudiant.nom} ${etudiant.prenom}`;
    if (studentCINInput) studentCINInput.value = etudiant.cin;

    if (dateInput) {
      const currentDate = new Date().toISOString().split('T')[0];  // Formatage correct de la date
      dateInput.value = currentDate;
    }
  }

  submitReservation(event: Event): void {
    event.preventDefault();

    const platString = sessionStorage.getItem('selectedPlat');
    const etudiantString = sessionStorage.getItem('user');
    const date = (document.getElementById('reservationDate') as HTMLInputElement).value;
    const description = (document.getElementById('remark') as HTMLTextAreaElement).value;
    const paiementId = parseInt((document.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement)?.value || '0');

    if (platString && etudiantString) {
      const plat = JSON.parse(platString);
      const etudiant = JSON.parse(etudiantString);

      const reservationRequest = {
        EtudiantId: etudiant.cin,
        PlatId: plat.id,
        PaiementId:1, // Attention, ici tu mets bien le paiementId choisi (et pas 2 en dur)
        Date: date,
        Description: description
      };

      console.log('ReservationRequest:laaaaaaa', reservationRequest);

      this.http.post('http://localhost:5043/api/reservation', reservationRequest)
        .subscribe({
          next: (response) => {
            console.log('Réservation réussie:', response);
            this.message = 'Réservation réussie !';
            this.messageClass = 'success';
            setTimeout(() => this.router.navigate(['/']), 2000);
          },
          error: (error) => {
            console.error('Erreur lors de la réservation:', error);
            this.message = 'Erreur lors de la réservation. Veuillez réessayer.';
            this.messageClass = 'error';
          }
        });
    }
  }
}
