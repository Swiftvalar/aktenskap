import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() {}

  getTools() {
    //return a static array for now. In the future this will come from some kind of endpoint or storage file
    return [{name: 'Task List', path: 'tasklist'},
     {name: 'Future Tool', path: 'futuretool'}];
  };
}
