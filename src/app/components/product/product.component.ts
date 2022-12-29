import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products : Product[] = [];
  constructor(private productService: ProductService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }

  search(str: string) {
    this.productService.findByNameContaining(str).subscribe((data) => {
      this.products = data;
    });
  }

listProducts() {
console.log(this.route.snapshot.paramMap.get('id'));
    // check if "id" parameter is available
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
        const categoryId = +this.route.snapshot.paramMap.get('id');
        this.getProductIfCategorySelected(categoryId);
    
    }
    else{
      this.getProducts();
    }

  
  }

  getProductIfCategorySelected(id:number){
      // now get the products for the given category id
    this.productService.getProductListByCategoryId(id).subscribe(
      data => {
        console.log(data);
        this.products = data;
      }
    )
  }

}
