import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/Models/contact';
import { ContactservService } from 'src/app/Services/contactserv.service';

@Component({
  selector: 'app-gerer-contacts',
  templateUrl: './gerer-contacts.component.html',
  styleUrls: ['./gerer-contacts.component.css']
})
export class GererContactsComponent {
  contacts!: Contact[];
  constructor(private contactServ: ContactservService, private router: Router,private activatedRoute: ActivatedRoute,) {}


  ngOnInit(): void {
this.loadcontacts();

  }
  loadcontacts(): void {
    this.contactServ.getAllContacts().subscribe((c) => this.contacts = c);
  }


  supprimer(id: string): void {
    // Utilisez window.confirm pour demander la confirmation
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?');

    if (isConfirmed) {
      this.contactServ.deleteContact(id).subscribe(
        () => {
          console.log('Contact item deleted successfully.');
          // Ajoutez une logique supplémentaire ici après la suppression réussie.
          this.loadcontacts(); // Rafraîchir automatiquement après la suppression
        },
        (error) => {
          console.error('Error deleting contact item:', error);
          // Gérez l'erreur et affichez un message approprié à l'utilisateur.
        }
      );
    }
  }

}
