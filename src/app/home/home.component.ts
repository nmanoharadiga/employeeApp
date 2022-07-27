import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute  } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { EmployeeService } from '../service/employee.service';
import {Router} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';

export interface employeeData {
  firstName: string ;
  lastName: string;
  id: number;
  product: string;
  level: string;
  reportingTo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'id', 'product', 'level', 'reportingTo', 'delete'];
  dataSource  = new MatTableDataSource<employeeData>();
  username:string="";
  selectedEmployee : employeeData;
  showEmployeeDetails = false;
  isSaveNewRecord = true;
  employeeSrvc : EmployeeService;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
}
  constructor(private activatedroute:ActivatedRoute, employeeService : EmployeeService, private cdr : ChangeDetectorRef, private route:Router) {
    this.employeeSrvc = employeeService;
   }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.username=data['username'];
    });
    this.dataSource.data = this.employeeSrvc.getEmployees();
    this.cdr.detectChanges();
  }
  ngAfterViewInit (){
    this.dataSource.sort = this.matSort;
  }
  selectEmployee(id:number){
    this.selectedEmployee = JSON.parse(JSON.stringify(this.dataSource.data.find(x => x.id == id)));
    this.showEmployeeDetails = true;
    this.isSaveNewRecord = false;
    // this.cdr.detectChanges();
    // this.route.navigate([{ outlets: { detials: ['employees'] }}],{relativeTo:this.activatedroute});
  }

  deleteEmployeeRecord(id){
    this.showEmployeeDetails = false;
    this.selectedEmployee = null;
    var index = this.dataSource.data.findIndex(x => x.id == id);
    var data = this.dataSource.data;
    data.splice(index,1);
    this.dataSource = new MatTableDataSource<employeeData>();
    this.dataSource.data = data;
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  createNewEmployeeRecord(){
    this.showEmployeeDetails = true;
    this.isSaveNewRecord = true;
    this.selectedEmployee = <employeeData>{};

  }

  saveEmployeeDetails(){
    var data = this.dataSource.data;
    data.push(this.selectedEmployee);
    this.dataSource = new MatTableDataSource<employeeData>();
    this.dataSource.data = data;
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    this.selectedEmployee = <employeeData>{};
    this.showEmployeeDetails = false;
  }

  updateEmployeeDetails(){
this.dataSource.data.forEach(x => {
  if(x.id === this.selectedEmployee.id){
    x.firstName = this.selectedEmployee.firstName;
    x.lastName = this.selectedEmployee.lastName;
    x.level = this.selectedEmployee.level;
    x.product = this.selectedEmployee.product;
    x.reportingTo = this.selectedEmployee.reportingTo;
  }
})
this.selectedEmployee = <employeeData>{};
this.showEmployeeDetails = false;
  }
}
