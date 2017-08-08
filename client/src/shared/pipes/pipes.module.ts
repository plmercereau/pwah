import { NgModule } from '@angular/core';
import {PluckPipe} from "./pluck/pluck";
import {JoinPipe} from "./join/join";
import {IsEmptyPipe} from "./isEmpty/isEmpty";
import {IsUndefinedPipe} from "./isUndefined/isUndefined";
import {ReversePipe} from "./reverse/reverse";
import {KeysPipe} from "./keys/keys";
import {ToArrayPipe} from "./toArray/toArray";
import {FilterByPipe} from "./filterBy/filterBy";

@NgModule({
  declarations: [
    PluckPipe,
    JoinPipe,
    IsEmptyPipe,
    IsUndefinedPipe,
    ReversePipe,
    KeysPipe,
    ToArrayPipe,
    FilterByPipe,
  ],
  imports: [

  ],
  exports: [
    PluckPipe,
    JoinPipe,
    IsEmptyPipe,
    IsUndefinedPipe,
    ReversePipe,
    KeysPipe,
    ToArrayPipe,
    FilterByPipe
  ]
})
export class PipesModule { }
