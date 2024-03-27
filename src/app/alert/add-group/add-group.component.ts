import { Component, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent {

  newGroup: Group = {
    id: 0,
    idUser: 0,
    nameGroup: '',
    totalSpent: 0,
    numberMembers: 0
  }

  @Output() cerrar: EventEmitter<any> = new EventEmitter();
  
  constructor(private groupServices: GroupService) { }

  closeNewGroup(): void {
    this.cerrar.emit();
  }

  createGroup(): void {
    console.log('Nuevo grupo:', this.newGroup);
    this.groupServices.createGroups(this.newGroup).subscribe(response =>{
      console.log(response)
      this.cerrar.emit();
    })
  }
}
