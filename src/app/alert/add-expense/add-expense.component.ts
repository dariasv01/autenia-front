import { Component, Output, EventEmitter } from '@angular/core';
import { SpentsService } from '../../services/spent/spents.service';
import { Spent } from '../../models/spent';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { DataService } from '../../services/data/data.service';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group/group.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css',
})
export class AddExpenseComponent {
  group: Group = {
    id: 0,
    idUser: 0,
    nameGroup: '',
    totalSpent: 0,
    numberMembers: 0,
  };

  nuevoGasto: Spent = {
    id: 0,
    idUser: 0,
    idGroup: this.group.id,
    creationDate: new Date(),
    description: '',
    amount: 0,
  };

  users: User[] = [];

  @Output() cerrar: EventEmitter<any> = new EventEmitter();

  constructor(
    private spentsServices: SpentsService,
    private userServices: UserService,
    private dataService: DataService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.group = this.dataService.getObjeto();
    this.nuevoGasto.idGroup = this.group.id;
    this.getUsers();
  }

  private getUsers(): void {
    this.userServices.getUserByIdGroup(this.group.id).subscribe((users) => {
      users.forEach((element) => {
        this.userServices.getUser(element.idUser).subscribe((response) => {
          this.users.push(response);
        });
      });
    });
  }

  cerrarNuevoGasto(): void {
    this.cerrar.emit();
  }
  updateGroup(): void {
    this.group.totalSpent = this.group.totalSpent + this.nuevoGasto.amount;
    this.groupService.createGroups(this.group).subscribe((response) => {
      console.log('Grupo Actualizado');
    });
  }

  crearNuevoGasto(): void {
    console.log('Nuevo gasto:', this.nuevoGasto);
    this.spentsServices.createSpent(this.nuevoGasto).subscribe((response) => {
      console.log(response);
      this.updateGroup();
      this.cerrar.emit();
    });
  }
}
