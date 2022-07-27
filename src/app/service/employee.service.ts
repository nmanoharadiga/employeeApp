import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeData : any;
  constructor(private http: HttpClient) {
    this.employeeData=[
      {firstName : "Test Name", lastName : "Last Name 1", id : 1018376, product:"VPM", level:"L1", reportingTo:"Test Manager 1"},
      {firstName : "Test Name", lastName : "Last Name 2", id : 1018377, product:"Investier", level:"L1", reportingTo:"Test Manager 2"},
      {firstName : "Test Name", lastName : "Last Name 3", id : 1018378, product:"Investran", level:"L3", reportingTo:"Test Manager 3"},
      {firstName : "Test Name", lastName : "Last Name 4", id : 1018379, product:"InvestOne", level:"L5", reportingTo:"Test Manager 4"},
      {firstName : "Test Name", lastName : "Last Name 5", id : 1018380, product:"PSP", level:"L2", reportingTo:"Test Manager 5"},
      {firstName : "Test Name", lastName : "Last Name 6", id : 1018381, product:"Glide", level:"L1", reportingTo:"Test Manager 6"},
      {firstName : "Test Name", lastName : "Last Name 7", id : 1018382, product:"Hedge Funds", level:"L3", reportingTo:"Test Manager 7"},
      {firstName : "Test Name", lastName : "Last Name 8", id : 1018383, product:"Private Equity", level:"L3", reportingTo:"Test Manager 8"},
      {firstName : "Test Name", lastName : "Last Name 9", id : 1018384, product:"VPM", level:"L1", reportingTo:"Test Manager 1"},
      {firstName : "Test Name", lastName : "Last Name 10", id : 1018385, product:"InvestOne", level:"L4", reportingTo:"Test Manager 4"},
    ]
   }

  getEmployees() {
    //return this.http.get('/api/employees');

    return this.employeeData;
  }

  getEmployeeDetails(employeeId:number) {
     return this.http.get(`/api/employees/${employeeId}`);
  }

  updateEmployeeDetails(employeeDetails : any){
  return this.http.post('/api/employees', employeeDetails)
  }

  saveEmployeeDetails(employeeDetails : any){
    return this.http.post('/api/employees', employeeDetails)
  }

}
