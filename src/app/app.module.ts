import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolsComponent } from './tools/tools.component';
import { ToolsService } from './tools.service';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TasklistService } from './tasklist.service';


@NgModule({
  declarations: [
    AppComponent,
    ToolsComponent,
    TasklistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'tasklist', component: TasklistComponent}
    ])
  ],
  providers: [
    ToolsService,
    TasklistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
