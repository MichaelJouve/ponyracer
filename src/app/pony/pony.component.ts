import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {

  @Input() ponyModel: PonyModel;
  @Input() isRunning:boolean;
  @Input() isBoosted: boolean;
  @Output() ponyClicked = new EventEmitter<PonyModel>();


  constructor() {}

  ngOnInit() {
  }

  
    getPonyImageUrl() {
      return `assets/images/pony-${this.ponyModel.color.toLowerCase()}${ this.isBoosted ? '-rainbow' : this.isRunning ? '-running' : ''}.gif`;
    }
   
    // idem to :
    // if ( this.isRunning ) {
    //   return `assets/images/pony-${this.ponyModel.color.toLowerCase()}-running.gif`;
    // } else if (this.isRunning && this.isBoosted) {
    //   return `assets/images/pony-${this.ponyModel.color.toLowerCase()}-rainbow.gif`;
    // } else {
    //   return `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`;
    // }
  

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }

}
