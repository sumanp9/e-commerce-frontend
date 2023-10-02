import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShopService } from '../service/shop.service';
import { ProductInfo } from '../shop-interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent {
  
  product: ProductInfo ={
    id: -1,
    name: '',
    image: '',
    description: '',
    details: '',
    price: -1,
    quantity: -1
  }

  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private service: ShopService
  ) {}

  ngOnInit(): void{
    this.service.productDetails(this.data).subscribe((result) =>{
      this.product = result;
      console.log(this.product)
    });
  }

  addToCart(product: ProductInfo) {
    alert("Added to cart!!")
  }

}
