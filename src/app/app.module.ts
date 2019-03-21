import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolsComponent } from './tools/tools.component';
import { ToolsService } from './tools.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ToolsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
