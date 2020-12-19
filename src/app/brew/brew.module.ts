import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrewComponent } from './brew.component';
import { BrewService } from './brew.service';
import { BaseModule } from '../base/base.module';
import { PreviousBrewsComponent } from './previous-brews/previous-brews.component';
import { UiSwitchModule } from 'ngx-toggle-switch';



@NgModule({
  declarations: [BrewComponent, PreviousBrewsComponent],
  imports: [
    CommonModule,
    BaseModule,
    UiSwitchModule
  ],
  exports: [BrewComponent, PreviousBrewsComponent],
  providers: [BrewService]
})
export class BrewModule { }
