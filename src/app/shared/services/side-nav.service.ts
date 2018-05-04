import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable()
export class SideNavService {
  sideNav: any = false;
  sideNavUpdated = new EventEmitter();

  constructor() {

  }

  getSideNavState() {
    return this.sideNavUpdated;
  }

  setSideNavState(state) {
    this.sideNav = state;
    this.sideNavUpdated.emit(this.sideNav);
  }

}
