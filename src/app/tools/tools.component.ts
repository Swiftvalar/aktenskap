import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  title = 'List of Tools';
  tools;

  constructor(service: ToolsService) {
    this.tools = service.getTools();
   }

  ngOnInit() {
  }

}
