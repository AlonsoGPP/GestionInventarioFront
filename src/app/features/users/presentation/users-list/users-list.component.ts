import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../core/state';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import * as UserSelector from '../../../../core/state/users/user.selector';
import * as UserAction from '../../../../core/state/users/user.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users-list',
  standalone: true,
imports: [CommonModule, TableComponent, AlertComponent, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit{
  ngOnInit(): void {
       this.store.dispatch(UserAction.initUser());
  }
   private store = inject(Store);
   private router = inject(Router);
    user$ = this.store.select(selectAuthUser);

      vm$ = combineLatest({
        rows: this.store.select(UserSelector.selectRows),
        total: this.store.select(UserSelector.selectTotal),
        loading: this.store.select(UserSelector.selectLoading),
        page: this.store.select(UserSelector.selectPage),
        pageSize: this.store.select(UserSelector.selectPageSize),
        headers: this.store.select(UserSelector.selectHeaders),
      });
      onSort(sort: string, dir: 'asc' | 'desc') { this.store.dispatch(UserAction.changeUserSort({ sort, dir })); }
      onPage(page: number) { this.store.dispatch(UserAction.changeUserPage({ page })); }
      onPageSize(pageSize: number) { this.store.dispatch(UserAction.changeUserPageSize({ pageSize })); }
    
    registrarUsuario(){
      this.router.navigate(['/auth/register']);
    }
 }
