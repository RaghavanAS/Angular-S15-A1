import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style } from '@angular/animations';
import { Customer } from '../models/customer';
import { CustomerService } from '../Services/Customer-Service';
import { SearchPipe } from '../pipes/SearchByPipe';
import { AppError } from '../error-handle/app-error';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [SearchPipe],
  animations: [
    trigger('AnimateList', [
      state('active',
      style({
        background: '#cfd8dc',
        transform: 'scale(1.1)'
      })
    )
    ])]
})
export class CustomerListComponent implements OnInit {

  @Input() customers: Observable<Customer[]>;
  @Input() cus: Customer;
  private searchData: string;
  // varibale to store the current state of element for animation
  currentState: string;
  constructor(private customerService: CustomerService, private router: Router) { }
// invoke the getcustomer list on init
  ngOnInit() {
    this.searchData = '';
    this.customers = this.customerService.getCustomerList();
  }
  // navigate to customer form on add button click
  onAdd() {
    this.router.navigate(['/customers', 'new', 'edit']);
  }
}
