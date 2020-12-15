import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrewComponent } from './brew.component';
import { BrewService } from './brew.service';
import { BaseModule } from '../base/base.module';
import { PreviousBrewsComponent } from './previous-brews/previous-brews.component';



@NgModule({
  declarations: [BrewComponent, PreviousBrewsComponent],
  imports: [
    CommonModule,
    BaseModule
  ],
  exports: [BrewComponent, PreviousBrewsComponent],
  providers: [BrewService]
})
export class BrewModule { }
