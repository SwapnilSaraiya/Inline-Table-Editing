import { TableDataService } from './table-data.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inlineTable';
  userDetails: any = [];
  displayData: any = [];
  newArray: any = [];
  addNewRow: boolean;
  editDataId: any;
  newAttribute: any;
  selectedStates =["California","Texas","Florida","Georgia","Gujarat","Maharashtra","Kerala","Punjab","England","Scotland","Wales","Northern Ireland","Nunavut","Québec","Alberta","Ontario"];
  countries = ["India","U.S.A","U.K","Canada"];
  matchCountry:any;

  constructor(private td: TableDataService, private fb: FormBuilder) {
  this.addNewRow = false;

    this.userDetails = this.fb.group({
      id: [],
      name: [''],
      country: [''],
      state: [''],
    });
  }
  ngOnInit() {
    this.getData();
  }
public addNewRowToTable(){
  this.editDataId = null;
  console.log("Response", this.displayData)
  this.addNewRow = true;
  this.userDetails = this.fb.group({
    id: [],
    name: [''],
    country: [''],
    state: [''],
  });

}
  public onSubmit() {
    console.log("RESPONSE ==>",this.userDetails.value)    
      if(this.userDetails.value.id != null){
        this.td.updateDataApi(this.userDetails.value).subscribe((res: any) => {
          console.log("DATA UPDATED SUCCESSFULLY",res)
          this.editDataId = '';
        })
        this.getData();
      }
      else{
        console.log("Adding Data ==>", this.userDetails.value);
        this.td.postDataApi(this.userDetails.value).subscribe(() => {
          this.newArray = [];
          this.getData();
          this.addNewRow = false;
        })
      }
  }

  public getData() {
    this.td.getDataApi().subscribe((res: any) => {
      this.displayData = res;
      console.log("Response", this.displayData)
    })
  }
  public editData(data: any) {
    this.addNewRow =false;
     console.log("Edit", data)
     
    this.matchCountry = data.country;
    
    
    //  if(this.matchCountry == 'U.S.A')
    //  {
    //    this.selectedStates = ["California","Texas","Florida","Georgia"];
    //  }
    //  else if(this.matchCountry == 'India'){
    //    this.selectedStates = ["Gujarat","Maharashtra","Kerala","Punjab"];
    //  }
    //  else if(this.matchCountry == 'U.K'){
    //    this.selectedStates = ["England","Scotland","Wales","Northern Ireland"];
    //  }
    //  else if(this.matchCountry == 'Canada'){
    //    this.selectedStates = ["Nunavut","Québec","Alberta","Ontario"]
    //  }
    // console.log("Array", this.addNewRow)
    console.log("Array==>", this.userDetails.value)
   this.editDataId = data.id;
   this.userDetails.patchValue({
    id: data.id,
    name: data.name,
    country: data.country,
    state: data.state,
   })
  console.log("Array==>", this.userDetails.value)
  this.selectedCountry(this.matchCountry)
  }

  public deleteData(id: any) {
    this.addNewRow= false;
    let message = 'Deleted Successfully'
    this.td.deleteDataApi(id).subscribe((res: any) => {
      this.getData();
      this.td.show(message, { classname: 'bg-danger text-light', delay: 15000 });
    })
  }
  public selectedCountry(event:any){
    console.log("event ==>",event)
    console.log("flag ==>",this.addNewRow)
    
    if(this.addNewRow == false){
      this.matchCountry = event;
    }else{
      this.matchCountry = event.target.value;
    }
    
    if(this.matchCountry == 'U.S.A')
    {
      this.selectedStates = ["California","Texas","Florida","Georgia"];
    }
    else if(this.matchCountry == 'India'){
      this.selectedStates = ["Gujarat","Maharashtra","Kerala","Punjab"];
    }
    else if(this.matchCountry == 'U.K'){
      this.selectedStates = ["England","Scotland","Wales","Northern Ireland"];
    }
    else if(this.matchCountry == 'Canada'){
      this.selectedStates = ["Nunavut","Québec","Alberta","Ontario"]
    }
   
  }
}
