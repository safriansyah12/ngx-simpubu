import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { SisiUdaraRoutingModule } from './sisi-udara-routing.module';
import { SuCreateComponent } from './su-create/su-create.component';
import { SuReadComponent } from './su-read/su-read.component';
import { SuUpdateComponent } from './su-update/su-update.component';
import { SuDeleteComponent } from './su-delete/su-delete.component';
import { SisiUdaraComponent } from './sisi-udara.component';




@NgModule({
  declarations: [
            SuCreateComponent, 
            SuReadComponent, 
            SuUpdateComponent, 
            SuDeleteComponent, 
            SisiUdaraComponent, 
          ],
  imports: [
    CommonModule,
    SisiUdaraRoutingModule,
    MDBBootstrapModulesPro,
  ]
})
export class SisiUdaraModule { }
