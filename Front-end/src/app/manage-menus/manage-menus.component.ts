import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-menus',
  templateUrl: './manage-menus.component.html',
  styleUrls: ['./manage-menus.component.css']
})
export class ManageMenusComponent implements OnInit {
  menuForm: FormGroup;
  isEditMode = false;
  menus: any[] = [];
  imagePreview: string | null = null;
  editingIndex: number | null = null;
  apiUrl = 'http://localhost:5043/api/Menu';
  message: string | null = null;
  selectedImageBytes: Uint8Array | null = null; // Pour stocker l'image en binaire

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.menuForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  // Charger les menus
  loadMenus(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((menus) => {
      this.menus = menus.map(menu => ({
        ...menu,
        imageUrl: menu.image ? 'data:image/jpeg;base64,' + menu.image : null
      }));
    });
    
  }

  // Convertir un fichier image en tableau de bytes
  async convertFileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const arrayBuffer = event.target.result as ArrayBuffer;
        resolve(new Uint8Array(arrayBuffer));
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // Convertir tableau de bytes en Base64 (pour envoi API)
  convertByteArrayToBase64(byteArray: Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(byteArray);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Ajouter un menu
  async addMenu() {
    const menuData = this.menuForm.value;

    let base64Image = null;
    if (this.selectedImageBytes) {
      base64Image = this.convertByteArrayToBase64(this.selectedImageBytes);
    }

    const newMenu = {
      name: menuData.nom,
      description: menuData.description,
      image: base64Image
    };

    this.http.post<any>(this.apiUrl, newMenu).subscribe((menu) => {
      this.menus.push(menu);
      this.resetForm();
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }

  // Modifier un menu (charger dans formulaire)
  editMenu(menu: any, index: number) {
    this.isEditMode = true;
    this.editingIndex = index;
    this.menuForm.patchValue({
      nom: menu.name,
      description: menu.description,
    });

    if (menu.image) {
      this.imagePreview = 'data:image/jpeg;base64,' + menu.image;
    }
  }

  // Mettre à jour un menu
  async updateMenu() {
    const menuData = this.menuForm.value;

    let base64Image = null;
    if (this.selectedImageBytes) {
      base64Image = this.convertByteArrayToBase64(this.selectedImageBytes);
    }

    const updatedMenu = {
      id: this.menus[this.editingIndex!].id,
      name: menuData.nom,
      description: menuData.description,
      image: base64Image
    };

    this.http.put<any>(`${this.apiUrl}/${this.menus[this.editingIndex!].id}`, updatedMenu)
      .subscribe(() => {
        this.menus[this.editingIndex!] = updatedMenu;
        this.resetForm();
        this.loadMenus();
      });
  }

  // Supprimer un menu
  deleteMenu(menuId: number) {
    this.http.delete<any>(`${this.apiUrl}/${menuId}`).subscribe(
      () => {
        this.menus = this.menus.filter(menu => menu.id !== menuId);
        this.message = 'Menu supprimé avec succès !';
        setTimeout(() => this.message = null, 3000);
        this.loadMenus();
      },
      () => {
        this.message = 'Erreur lors de la suppression du menu.';
        setTimeout(() => this.message = null, 3000);
      }
    );
  }

  // Annuler l'édition
  cancelEdit() {
    this.resetForm();
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.menuForm.reset();
    this.imagePreview = null;
    this.isEditMode = false;
    this.editingIndex = null;
    this.selectedImageBytes = null;
  }

  // Sélectionner une image (upload)
  async onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageBytes = await this.convertFileToByteArray(file);

      // Afficher l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
