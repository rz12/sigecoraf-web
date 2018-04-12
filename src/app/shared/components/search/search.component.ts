import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public filter: String;
  @Output() onFilter = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  public buscar() {
    this.onFilter.emit(this.filter);
  }
}
