import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss']
})
export class MultiSelectDropdownComponent implements OnInit {
  @Input() list: any[];
  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();

  checkedList: any[];
  currentSelected: {};
  showDropDown: boolean;

  constructor() {
    this.checkedList = [];
  }

  ngOnInit(): void {
  }

  getSelectedValue(status: Boolean, value: any): void {
    if (status) {
      this.checkedList.push(value.name);
    } else {
      const index = this.checkedList.indexOf(value.name);
      this.checkedList.splice(index, 1);
    }

    this.currentSelected = {checked: status, name: value};

    //share checked list
    this.shareCheckedlist();

    //share individual selected item
    this.shareIndividualStatus();
  }

  shareCheckedlist(): void {
    this.shareCheckedList.emit(this.checkedList);
  }

  shareIndividualStatus(): void {
    this.shareIndividualCheckedList.emit(this.currentSelected);
  }
}
