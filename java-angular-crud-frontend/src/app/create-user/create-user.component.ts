import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Address } from '../address';
import { UserService } from '../user.service';
import { AddressService } from '../address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  address: Address = new Address();

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveUser() {
    this.userService.createUser(this.user).subscribe(
      (data: any) => {
        // if (this.address.work?.trim() || this.address.home?.trim()) {
        this.address.id = data.id;
        this.saveAddress(); // Pass user id to saveAddress method
        //   } else
        this.goToUserList();
      },
      (error) => console.log(error)
    );
  }

  saveAddress() {
    this.addressService.createAddress(this.address).subscribe(
      (data) => {
        this.goToUserList();
      },
      (error) => console.log(error)
    );
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    this.saveUser();
  }
}
