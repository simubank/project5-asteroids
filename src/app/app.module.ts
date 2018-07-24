import { UserService } from './services/user.service';
import { TransactionsService } from './services/transactions.service';
import { AppRoutingModule } from './app.routing.module';
import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '../../node_modules/@angular/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { RuleManagementPageComponent } from './rule-management-page/rule-management-page.component';
import { RulePageComponent } from './rule-page/rule-page.component';
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvertPipe } from './pipe/invert.pipe';
// import { Endpoints } from './common/endpoints';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavBarComponent,
        DashboardComponent,
        ControlPanelComponent,
        RuleManagementPageComponent,
        RulePageComponent,
        InvertPipe
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        HttpClientModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [
        ApiService,
        LoginService,
        TransactionsService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
