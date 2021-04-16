import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { ICategory } from '../shared/models/productCategory';
import { ISource } from '../shared/models/productSource';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  category: ICategory[];
  source: ISource[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: "priceDesc"}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getproducts();
    this.getBrands();
    this.getTypes();
    this.getCategorys();
    this.getSources();
  }

  getproducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error =>{
      console.log(error);
    });

  }


  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
    
  }

  
  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
    
  }

  
  getCategorys() {
    this.shopService.getCategory().subscribe(response => {
      this.category = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
    
  }

  
  getSources() {
    this.shopService.getSource().subscribe(response => {
      this.source = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
    
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getproducts();
  }

  onTypeSelected(typeID: number) {
    this.shopParams.typeId = typeID;
    this.shopParams.pageNumber = 1;
    this.getproducts();
  }

  onCategorySelected(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1;
    this.getproducts();
  }

  onSourceSelected(sourceId: number) {
    this.shopParams.sourceId= sourceId;
    this.shopParams.pageNumber = 1;
    this.getproducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getproducts();

  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {

      this.shopParams.pageNumber = event;
      this.getproducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getproducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getproducts();
  }
}
