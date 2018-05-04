import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorService } from "../../services/validator.service";
@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {
  @Input() control: FormControl;
  constructor() { }

  ngOnInit() {
  }
  get mensajeError() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidatorService.getValidadorMensajeError(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
