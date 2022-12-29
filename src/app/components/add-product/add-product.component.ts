import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/Category';
import { Product } from 'src/app/common/Product';
import { ProductService } from 'src/app/service/product.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
product:Product =  new Product();

categories :Category[]=[];
  constructor(
private productService:ProductService,
private router:Router

  ) { }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.categories = data;
      }
    );
  }
  onSubmit(type: number) {
    this.productService.postProduct(this.product, type).subscribe(
      (data) => {
        console.log(data);
        swal.fire('Success', 'Product Successfully added!', 'success');
        this.product = new Product();
        this.goToList();
      },
      (error) => {
        console.log(error);
        swal.fire('Error', 'Cannot post property. Try again!', 'error');
      }
    );
  }
  goToList() {
    this.router.navigate(['/home']);
  }

}
