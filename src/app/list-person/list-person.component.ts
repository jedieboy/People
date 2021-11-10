import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit {
  listData: any;
  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.getData();    
  }

  //Get all data from local storage
  getData(){
    this.listData = JSON.parse(localStorage.getItem('itemsArray')!) || [];
  }

  //Removing data in local storage
  removePerson(removeData : any){
    var data = JSON.parse(localStorage.getItem('itemsArray')!) || [];
    data.forEach((res: any, index: any) => {
      if(res.id == removeData.id){
        data.splice(index, 1);
      }
    });

    //Updating remove data in local storage
    localStorage.setItem('itemsArray', JSON.stringify(data));
    this.toastr.success('Person data successfully delete', 'Successfully Deleted', {
      timeOut: 5000,
      positionClass: 'toast-bottom-right'
    } );
    this.getData();
  }
}
