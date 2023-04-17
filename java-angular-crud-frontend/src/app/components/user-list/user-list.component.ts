import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AddressService } from '../../services/address.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[]; // array of users
  currentPage = 1; // the current page number
  itemsPerPage = 5; // the number of items to display per page
  searchTerm: string; // the search term entered by the user
  sortColumn: string = ''; // the column to sort by
  nameSortOrder: string = ''; // the sort order for the name column
  surnameSortOrder: string = ''; // the sort order for the surname column

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.users = []; // initialize the users array
  }

  ngOnInit(): void {
    this.getUsers(); // get the list of users
    this.searchTerm = ''; // initialize the search term to an empty string
  }

  private async getUsers() {
    try {
      const data = await lastValueFrom(this.userService.getUsersList());
      this.users = data;
    } catch (error) {
      console.log(error);
    }
  }
  // filter the users based on the search term entered by the user
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

  // navigate to the user update page
  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  // delete a user and it's address
  async deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    try {
      await lastValueFrom(this.addressService.deleteAddress(id));
      await lastValueFrom(this.userService.deleteUser(id));
      this.users.splice(index, 1); // remove deleted user from list
      const lastPage = Math.ceil(this.users.length / this.itemsPerPage);
      if (this.currentPage > lastPage) {
        this.currentPage = lastPage; // adjust current page if necessary
      }
    } catch (error) {
      console.log(error);
    }
  }

  // navigate to the user details page
  userDetails(id: number) {
    this.router.navigate(['user-details', id]);
  }

  // sort the users by the specified column
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
