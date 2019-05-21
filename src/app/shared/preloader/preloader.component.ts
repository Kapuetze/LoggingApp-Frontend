import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {

  @Input() size: string;
  hidden: boolean;

  constructor() { }

  ngOnInit() {
  }

  public stop(){
    //console.log("Preloader hidden");
    this.hidden = true;
  }

  public start(){
    //console.log("Preloader showing");
    this.hidden = false;
  }

}
