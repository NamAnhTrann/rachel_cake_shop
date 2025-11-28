import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contacts } from '../model/contact_model';
import { Db } from '../services/db';
import Swal from 'sweetalert2';
import AOS from 'aos';


@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Contact implements AfterViewInit {
  contact: Contacts[] = [];
  //initialise here
  contact_data: Contacts = {
    contact_last_name: '',
    contact_first_name: '',
    contact_email: '',
    contact_phone_number: '',
    contact_message: '',
    contact_enquiry_types: 'general',
    contact_created_date: new Date(),
  };

  constructor(private db: Db) {}

  ngAfterViewInit(): void {
    const isMobile = window.innerWidth < 768;
  
    AOS.init({
      duration: 1200,
      once: true,
      disable: isMobile
    });
  
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  }
  addContact() {
    this.db.add_contact(this.contact_data).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Message Sent!',
          text: 'Our bakers will get back to you shortly!',
          icon: 'success',

          background: document.documentElement.classList.contains('dark')
            ? '#0C0A09'
            : '#FFF9EF',

          color: document.documentElement.classList.contains('dark')
            ? '#E5E5E5'
            : '#111827',

          iconColor: document.documentElement.classList.contains('dark')
            ? '#FACC15'
            : '#EA580C',
          // Confirm button
          confirmButtonColor: document.documentElement.classList.contains(
            'dark'
          )
            ? '#FACC15'
            : '#EA580C',

          confirmButtonText: 'Okay!',
          customClass: {
            confirmButton: 'swal-confirm',
          },
        });

        this.contact_data = {
          contact_last_name: '',
          contact_first_name: '',
          contact_email: '',
          contact_phone_number: '',
          contact_message: '',
          contact_enquiry_types: 'general',
          contact_created_date: new Date(),
        };
      },
    });
  }
}
