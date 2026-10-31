import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-contact',
  imports: [MatIcon],
  templateUrl: './contact.html',
})
export default class Contact {

  socialNetworks: { name: string, description: string, icon: string }[] = [
    {
      name: 'Whatsapp',
      description: '+54 9 11-3333-3333',
      icon: 'brand-whatsapp',
    },
    {
      name: 'Facebook',
      description: 'https://www.facebook.com/plugyhogar',
      icon: 'brand-facebook',
    },
    {
      name: 'Instagram',
      description: 'https://www.instagram.com/plugyhogar',
      icon: 'brand-instagram',
    },
  ];

  branches = signal<{ province: string, city: string, address: string, customerServiceEmail: string, whatsapp: string, facebook: string, instagram: string, imageUrl: string }[]>([
    {
      province: "Buenos Aires",
      city: "CABA",
      address: "Av. Corrientes 1234, C1043 AAZ",
      customerServiceEmail: "atencion.caba@plugyhogar.com.ar",
      whatsapp: "+54 9 11 5555-1001",
      facebook: "https://facebook.com/plugyhogar.caba",
      instagram: "https://instagram.com/plugyhogar.caba",
      imageUrl: "/images/branches/Caba.jpg",
    },
    {
      province: "Mendoza",
      city: "San Rafael",
      address: "Av. Hipólito Yrigoyen 850, M5600",
      customerServiceEmail: "atencion.sanrafael@plugyhogar.com.ar",
      whatsapp: "+54 9 260 555-2002",
      facebook: "https://facebook.com/plugyhogar.sanrafael",
      instagram: "https://instagram.com/plugyhogar.sanrafael",
      imageUrl: "/images/branches/San_Rafael.jpg",
    },
    {
      province: "Córdoba",
      city: "Córdoba",
      address: "Av. Colón 2100, X5000",
      customerServiceEmail: "atencion.cordoba@plugyhogar.com.ar",
      whatsapp: "+54 9 351 555-3003",
      facebook: "https://facebook.com/plugyhogar.cordoba",
      instagram: "https://instagram.com/plugyhogar.cordoba",
      imageUrl: "/images/branches/Cordoba.jpg",
    },
    {
      province: "Santa Fe",
      city: "Rosario",
      address: "Av. Pellegrini 1450, S2000",
      customerServiceEmail: "atencion.rosario@plugyhogar.com.ar",
      whatsapp: "+54 9 341 555-4004",
      facebook: "https://facebook.com/plugyhogar.rosario",
      instagram: "https://instagram.com/plugyhogar.rosario",
      imageUrl: "/images/branches/Rosario.jpg",
    },
  ]);

}
