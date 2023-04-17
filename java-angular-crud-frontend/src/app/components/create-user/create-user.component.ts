import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Address } from '../../models/address';
import { UserService } from '../../services/user.service';
import { AddressService } from '../../services/address.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user: User = new User(); // Initializing User instance
  address: Address = new Address(); // Initializing Address instance

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private router: Router
  ) {
    this.user.gender = 'M'; // Set default gender to 'M'
  }

  ngOnInit(): void {}

  async saveUser() {
    try {
      const data: any = await lastValueFrom(
        this.userService.createUser(this.user)
      );
      this.address.id = data.id; // Set the address id to the user id
      await this.saveAddress(); // Call saveAddress method
      this.goToUserList(); // Call goToUserList method
    } catch (error) {
      console.log(error); // Log error to console if saveUser fails
    }
  }

  async saveAddress() {
    try {
      await lastValueFrom(this.addressService.createAddress(this.address));
    } catch (error) {
      console.log(error); // Log error to console if saveAddress fails
    }
  }

  isInvalidDate(birthdateInputValue: string): boolean {
    const birthdate = new Date(birthdateInputValue); // Create a new Date instance from birthdateInputValue
    return isNaN(birthdate.getTime()); // Check if birthdate is a valid date
  }

  goToUserList() {
    this.router.navigate(['/users']); // Navigate to the user list page
  }

  onSubmit() {
    this.saveUser(); // Call saveUser method when form is submitted
  }
}
