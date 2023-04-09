import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { AddressService } from '../address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsersList().subscribe((data) => {
      this.users = data;
    });
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    this.addressService.deleteAddress(id).subscribe(
      (data) => {},
      (error) => console.log(error)
    );
    this.userService.deleteUser(id).subscribe(
      (data) => {
        this.getUsers();
      },
      (error) => console.log(error)
    );
  }

  userDetails(id: number) {
    this.router.navigate(['user-details', id]);
  }
}
