import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Address } from '../../models/address';
import { UserService } from '../../services/user.service';
import { AddressService } from '../../services/address.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

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

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];

    this.user = new User();
    this.address = new Address();

    const userObservable = this.userService.getUserById(this.id);
    const addressObservable = this.addressService.getAddressById(this.id);

    try {
      this.user = await lastValueFrom(userObservable);
      this.address = await lastValueFrom(addressObservable);
    } catch (error) {
      console.log(error);
    }
  }
}
