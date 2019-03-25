import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import {DataTableModule} from 'angular-6-datatable';

import { PAGES_ROUTES } from './pages.routes';
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BuscadorComponentComponent } from '../components/buscador-component/buscador-component.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsuariosComponent,
    BuscadorComponentComponent,
    BusquedaComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    DataTableModule
  ]
})
export class PagesModule { }



