import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GruopComponent } from './page/gruop/gruop.component';
import { HomeComponent } from './page/home/home.component';
import { FormsModule } from '@angular/forms';
import { AddGroupComponent } from './alert/add-group/add-group.component';
import { AddExpenseComponent } from './alert/add-expense/add-expense.component';
import { AddUserComponent } from './alert/add-user/add-user.component';
import { ShowResultComponent } from './alert/show-result/show-result.component';

@NgModule({
  declarations: [
    AppComponent,
    GruopComponent,
    HomeComponent,
    AddGroupComponent,
    AddExpenseComponent,
    AddUserComponent,
    ShowResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
