import { Component, OnInit } from '@angular/core';
import { ShopService } from '../service/shop.service';
import { TransactionDetails, UserInfo } from '../shop-interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit{

  id = history.state.data;
  signedUser: UserInfo ={
    id: -1,
    name: '',
    email: '',
    role: ''

  }

  transactionData: TransactionDetails[] =[];

  dataSource: any;
  displayedColumns: string[] = ["Product Name", "Quantity","Price"];
  total = 0;

  constructor(
    private service: ShopService,
    private router: Router,
  ){
    this.dataSource = new MatTableDataSource<TransactionDetails>(this.transactionData);

  }

  ngOnInit() {
    this.signedUser = history.state.data;

    console.log(this.id)
    this.service.transactionDetails(this.id).subscribe((data: TransactionDetails[]) => {
      if(data) {
        console.log(data);
        this.transactionData = data;
        this.dataSource.data = this.transactionData;
      }
    })
  }

  getTotalCost() {
  const cost = this.transactionData.map(t => t.price*t.quantity).reduce((acc, value) => acc + value, 0);
  return cost;

  } 

  getTotalQuantity() {
    const quantity = this.transactionData.map(t => t.quantity).reduce((acc, value) => acc + value, 0);
    return quantity;
  
    } 

    return() {
      this.router.navigate(['/admin'] , {state: {data: this.signedUser}});
    }

    logOut() {
      this.router.navigate(['/home'])
  }

}
