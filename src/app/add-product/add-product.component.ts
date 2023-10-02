import { Component } from '@angular/core';
import { ShopService } from '../service/shop.service';
import { ProductInfo } from '../shop-interface';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {

  productData: ProductInfo = {
    id: -1,
    name: '',
    image: '',
    description: '',
    details:'',
    price: 0,
    quantity:0,
  }


  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private service: ShopService,
  ) {}

  onSubmit() {
    this.service.product(this.productData).subscribe((res) => {
      console.log(res);
    });
    this.dialogRef.close()
  }

}
