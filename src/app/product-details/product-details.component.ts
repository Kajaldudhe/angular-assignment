import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ReactiveFormsModule, TableModule, ButtonModule, DialogModule, InputTextModule, InputNumberModule, DropdownModule, NgxChartsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productForm!: FormGroup;
  products: Array<any> = [];
  categories: Array<string> = [];
  isSubmitted: boolean = false;
  showRemoveModal: boolean = false;
  showAddEditModal: boolean = false;
  selectedProduct: any = {};
  dataVBC: any;
  viewVBC: [number, number] = [800, 300];
  animationsVBC = false;
  legendVBC = true;
  xAxisVBC = true;
  yAxisVBC = true;
  showYAxisLabelVBC = true;
  yAxisLabelVBC = "Amount";
  dataLabelFormatterVBC(tooltipText: any) {
    return tooltipText;
  }

  constructor() { }

  ngOnInit() {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required)
    });
    this.categories = ['Accessories', 'Electronics', 'Clothing', 'Fitness'];
  }

  showAddEditDialog(isModify = false, product: any = {}) {
    if (isModify) {
      this.selectedProduct = product;
      this.productForm.setValue(product);
    } else {
      this.productForm.patchValue({ id: Date.now().toString(36) });
    }
    this.showAddEditModal = true;
  }

  removeProduct(product: any) {
    this.selectedProduct = product;
    this.showRemoveModal = true;
  }

  closeRemoveModal() {
    this.showRemoveModal = false;
    this.selectedProduct = {};
  }

  confirmRemoveProduct() {
    let index = this.products.findIndex((x) => x.id == this.selectedProduct.id);
    if (index >= 0) {
      this.products.splice(index, 1);
      this.closeRemoveModal();
    }
  }

  saveProductDetails() {
    this.isSubmitted = true;
    if (this.productForm.valid) {
      let details = this.productForm.value;
      console.log("==", details);
      if (this.selectedProduct.id) {
        let index = this.products.findIndex((x) => x.id == this.selectedProduct.id);
        if (index >= 0) {
          this.products[index] = details;
        }
      } else {
        this.products.push(details);
      }
      this.products = [...this.products];
      this.closeModal();
    }
  }

  closeModal() {
    this.isSubmitted = false;
    this.showAddEditModal = false;
    this.selectedProduct = {};
    this.productForm.reset();
  }
}
