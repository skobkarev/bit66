import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsertComponent } from './components/insert/insert.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { UpdateComponent } from './components/update/update.component';

import { APP_INITIALIZER } from '@angular/core';
import { PlayerService } from './services/player.service';


import { environment } from '../environments/environment';
import { WsService } from './services/ws.service';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'insert', component: InsertComponent},
  {path: 'update/:id', component: UpdateComponent},
  {path: '', redirectTo: "insert", pathMatch: 'full' },
  
  {path: '**', redirectTo: "insert", pathMatch: 'full' }  
]

@NgModule({
  declarations: [
    AppComponent,
    InsertComponent,
    ListComponent,
    UpdateComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    

  ],
  exports: [RouterModule],
  providers: [    
    PlayerService,
    WsService,
    DatePipe    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
