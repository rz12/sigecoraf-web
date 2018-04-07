import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar-acction',
  templateUrl: './tool-bar-action.component.html',
  styleUrls: ['./tool-bar-action.component.css']
})
export class ToolBarAcctionComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() urlEdit: String;
  @Input() urlAdd: String;
  ngOnInit() {
  }
  public add() {
    let link = ['/' + this.urlAdd];
    this.router.navigate(link);
  }
  public edit() {
    let link = ['/' + this.urlEdit];
    this.router.navigate(link);

  }

}
