import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TransitionGroupItemDirective} from './directives/transition-group-item.directive';
import {TransitionGroupComponent} from './components/transition-group.component';


@NgModule({
  declarations: [
    AppComponent,
    TransitionGroupItemDirective,
    TransitionGroupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
