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
  id: number;
  user: User = new User();
  address: Address = new Address();

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => console.log(error)
    );

    this.addressService.getAddressById(this.id).subscribe(
      (data) => {
        this.address = data;
      },
      (error) => console.log(error)
    );
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    this.userService.updateUser(this.id, this.user).subscribe(
      (data) => {
        this.addressService.updateAddress(this.id, this.address).subscribe(
          (data) => {
            this.goToUserList();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }
}
