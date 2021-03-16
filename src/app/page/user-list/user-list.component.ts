import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();
  phrase: string = '';
  columnKey: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onColumnSelect(key: string) {
    this.columnKey = key;
  }

  onDelete(user: User): void {
    if (confirm('Valóban törli?')) {
    this.userService.remove(user).subscribe(
      () => this.router.navigate(['/'])
    );
    }
  }
}
