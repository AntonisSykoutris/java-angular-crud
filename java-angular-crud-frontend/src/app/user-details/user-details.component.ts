import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Address } from '../address';
import { UserService } from '../user.service';
import { AddressService } from '../address.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  id: number;
  user: User;
  address: Address;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private addressService: AddressService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.user = new User();
    this.address = new Address();
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data;
    });
    this.addressService.getAddressById(this.id).subscribe((data) => {
      this.address = data;
    });
  }
}
