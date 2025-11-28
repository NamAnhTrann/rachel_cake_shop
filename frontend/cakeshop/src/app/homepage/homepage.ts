import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class Homepage implements AfterViewInit   {

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


}
