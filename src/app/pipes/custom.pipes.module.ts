import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { HighlightSearch } from './highlight.pipe';

const CUSTOM_PIPES = [
  FilterPipe,
  HighlightSearch
];

@NgModule({
  imports: [],
  declarations: [
    CUSTOM_PIPES
  ],
  exports: [
    CUSTOM_PIPES
  ]
})
export class CustomPipesModule {}
