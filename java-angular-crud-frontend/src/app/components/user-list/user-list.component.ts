import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AddressService } from '../../services/address.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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

  private getUsers() {
    // retrieve the list of users from the user service
    this.userService.getUsersList().subscribe((data) => {
      this.users = data; // update the users array with the retrieved data
    });
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

  // delete a user
  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id); // find the index of the user being deleted
    // delete the user's address
    this.addressService.deleteAddress(id).subscribe(
      () => {
        // delete the user
        this.userService.deleteUser(id).subscribe(
          () => {
            // update the list of users and navigate to the previous page if necessary
            this.getUsers();
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
