import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { AddressService } from '../address.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];
  currentPage = 1;
  itemsPerPage = 5;
  searchTerm: string;

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
    this.searchTerm = '';
  }

  private getUsers() {
    this.userService.getUsersList().subscribe((data) => {
      this.users = data;
    });
  }

  filterUsers() {
    if (!this.searchTerm || !this.users) {
      return this.users;
    }
    return this.users.filter((user) => {
      const name = user.name.toLowerCase();
      const surname = user.surname.toLowerCase();
      const term = this.searchTerm.toLowerCase();
      return name.includes(term) || surname.includes(term);
    });
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    this.addressService.deleteAddress(id).subscribe(
      () => {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.getUsers();
            const page = Math.floor(index / this.itemsPerPage) + 1;
            const lastPage = Math.ceil(this.users.length / this.itemsPerPage);
            if (
              page === lastPage &&
              this.users.length % this.itemsPerPage === 1
            ) {
              this.currentPage -= 1;
            }
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }

  userDetails(id: number) {
    this.router.navigate(['user-details', id]);
  }
}
