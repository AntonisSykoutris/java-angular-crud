import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Address } from '../address';
import { UserService } from '../user.service';
import { AddressService } from '../address.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  id: number; // stores the ID of the user to be updated
  user: User = new User(); // stores the updated user data
  address: Address = new Address(); // stores the updated address data

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get the ID of the user to be updated from the URL
    this.id = this.route.snapshot.params['id'];

    // fetch the user data to be updated from the server
    this.userService.getUserById(this.id).subscribe(
      (data) => {
        this.user = data; // store the fetched user data in the user object
      },
      (error) => console.log(error)
    );

    // fetch the address data to be updated from the server
    this.addressService.getAddressById(this.id).subscribe(
      (data) => {
        this.address = data; // store the fetched address data in the address object
      },
      (error) => console.log(error)
    );
  }

  // checks if the input value for birthdate is a valid date
  isInvalidDate(birthdateInputValue: string): boolean {
    const birthdate = new Date(birthdateInputValue);
    return isNaN(birthdate.getTime());
  }

  // navigates to the user list page
  goToUserList() {
    this.router.navigate(['/users']);
  }

  // handles the form submission
  onSubmit() {
    // update the user data on the server
    this.userService.updateUser(this.id, this.user).subscribe(
      (data) => {
        // update the address data on the server
        this.addressService.updateAddress(this.id, this.address).subscribe(
          (data) => {
            // navigate to the user list page
            this.goToUserList();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }
}
