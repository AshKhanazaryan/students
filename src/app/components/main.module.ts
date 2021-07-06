import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {FormsModule} from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    HeaderComponent,
    MultiSelectDropdownComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    BrowserModule,
    CommonModule
  ],
  exports: [RouterModule, MainComponent, MultiSelectDropdownComponent],
  providers: [ ]
})

export class MainModule {
}
