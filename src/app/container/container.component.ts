import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
 // providers: [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit{

  @ContentChild(EmployeeComponent) employeeComponent!: EmployeeComponent

  ngAfterContentInit(): void {
    this.employeeComponent.empName = "Rick";
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
