import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { RuleManagementPageComponent } from './rule-management-page/rule-management-page.component';

const routes: Routes = [
    { path: 'control-panel', component: ControlPanelComponent },
    { path: 'rule-management', component: RuleManagementPageComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', component: HomeComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
