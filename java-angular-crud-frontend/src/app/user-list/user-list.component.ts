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
  sortColumn: string = '';
  nameSortOrder: string = '';
  surnameSortOrder: string = '';

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
    const index = this.users.findIndex((user) => user.id === id); // find the index of the user being deleted
    this.addressService.deleteAddress(id).subscribe(
      () => {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.getUsers();
            // check if the deleted user was the last user on the current page
            const page = Math.floor(index / this.itemsPerPage) + 1;
            const lastPage = Math.ceil(this.users.length / this.itemsPerPage);
            if (
              page === lastPage &&
              this.users.length % this.itemsPerPage === 1
            ) {
              this.currentPage -= 1; // navigate to the previous page
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

  sort(column: keyof User) {
    if (this.sortColumn === column) {
      if (column === 'name') {
        this.nameSortOrder = this.nameSortOrder === 'asc' ? 'desc' : 'asc';
      } else if (column === 'surname') {
        this.surnameSortOrder =
          this.surnameSortOrder === 'asc' ? 'desc' : 'asc';
      }
    } else {
      this.sortColumn = column;
      this.nameSortOrder = column === 'name' ? 'asc' : '';
      this.surnameSortOrder = column === 'surname' ? 'asc' : '';
    }

    this.users.sort((a, b) => {
      let propA = a[column];
      let propB = b[column];

      if (typeof propA === 'string' && typeof propB === 'string') {
        propA = propA.toLowerCase();
        propB = propB.toLowerCase();
      } else if (propA instanceof Date && propB instanceof Date) {
        propA = propA.getTime();
        propB = propB.getTime();
      }

      if (propA < propB) {
        return (column === 'name' && this.nameSortOrder === 'asc') ||
          (column === 'surname' && this.surnameSortOrder === 'asc')
          ? -1
          : 1;
      } else if (propA > propB) {
        return (column === 'name' && this.nameSortOrder === 'asc') ||
          (column === 'surname' && this.surnameSortOrder === 'asc')
          ? 1
          : -1;
      } else {
        return 0;
      }
    });
  }
}
