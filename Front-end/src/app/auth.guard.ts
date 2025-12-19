import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Injecter le service Router pour les redirections
  const router = inject(Router);

  // Vérifiez si l'utilisateur est connecté
  const user = sessionStorage.getItem('user');
  if (user) {
    // Utilisateur connecté, accès autorisé
    return true;
  } else {
    // Utilisateur non connecté, redirection vers la page de connexion
    router.navigate(['/login']);
    return false;
  }
};
