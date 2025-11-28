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

  AOS.init({
    duration: 1200,
    once: true,
  });

  setTimeout(() => {
    AOS.refresh();
  }, 200);
}


}
