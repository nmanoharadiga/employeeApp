import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  @Input() employeeDetails : any;
  employeeService : EmployeeService;
  constructor(emplServ : EmployeeService) {
    this.employeeService =  emplServ;
   }

  ngOnInit(): void {

  }

  saveEmployeeDetails(){


  }

}
