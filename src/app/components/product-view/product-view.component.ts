import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
product:Product;

id:number;
  constructor(private productService:ProductService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
  this.product= new Product();
  this.id= this.route.snapshot.params['id'];
  this.productService.getSelectedProduct(this.id).subscribe(data=>{
    this.product=data;
  })
  }

}
