import { Component, Inject } from '@angular/core';
import { ShopService } from '../service/shop.service';
import { Categories, ProductInfo } from '../shop-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  selected = '';

  productData: ProductInfo = {
    id: -1,
    name: '',
    image: '',
    description: '',
    details:'',
    price: 0,
    quantity:0,
    category_id: -1

  }

  selectedCategoryId = -1;

  categoryList: Categories[] = [];


  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductInfo,
    private service: ShopService,
  ) {
    if(data) {
      this.productData = data;
    }
  }

  ngOnInit() {
    this.service.categories().subscribe((result) => {
      this.categoryList = result;
    })
}

  onSubmit() {
    this.productData.category_id = this.selectedCategoryId;
    
    this.service.product(this.productData).subscribe((res) => {
      console.log(res);
    });
    this.dialogRef.close()
    
  }

  selectedCategory(event: any) {


    console.log(event.value.id)
    this.selectedCategoryId = event.value.id;
  }

  update(){
    this.service.updateProduct(this.productData).subscribe();
    this.dialogRef.close();
  }

}
