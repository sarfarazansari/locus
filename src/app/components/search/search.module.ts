import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { ListComponent, ListItemComponent } from '.';
import { CustomPipesModule } from 'src/app/pipes';

const COMP: any[] = [
  ListComponent,
  ListItemComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    CustomPipesModule
  ],
  declarations: [
    COMP
  ],
  exports: [
    COMP
  ],
  entryComponents: [
    COMP
  ]
})

export class SearchModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SearchModule
    };
  }
}
