import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { BoletasComponent } from './boletas/boletas.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        canActivateChild: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
            {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account settings' }},
            {path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil' }},
            {path: 'busqueda/:term', component: BusquedaComponent, data: { titulo: 'Perfil' }},
            // Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' }},
            {path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' }},
            {path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico' }},
            {path: 'boletas', component: BoletasComponent, data: { titulo: 'Boletas' }},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
