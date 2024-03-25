import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { UserService } from '../../services/user/user.service';
import { DataService } from '../../services/data/data.service';
import { GroupService } from '../../services/group/group.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  nuevoUsuario: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
  };

  group: Group = {
    id: 0,
    idUser: 0,
    nameGroup: '',
    totalSpent: 0,
    numberMembers: 0,
  };

  data: any = {
    idUser: 0,
    idGroup: 0,
  };

  users: User[] = [];

  usuarioSeleccionado: any;
  crearNuevoUsuario: boolean = false;

  @Output() cerrar: EventEmitter<any> = new EventEmitter();

  constructor(
    private userServices: UserService,
    private dataService: DataService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.group = this.dataService.getObjeto();
    this.data.idGroup = this.group.id;
  }

  private getUsers(): void {
    this.userServices.getUsers().subscribe((users) => (this.users = users));
  }

  cerrarCrearUsuario(): void {
    this.cerrar.emit();
  }

  guardarUsuario(): void {
    if (this.crearNuevoUsuario) {
      this.userServices.createUser(this.nuevoUsuario).subscribe((response) => {
        this.nuevoUsuario = response;
        this.data.idUser = response.id;
        console.log(response);
        this.userServices.createUserGroup(this.data).subscribe((response) => {
          console.log('Relación Creada');
          this.group.numberMembers = this.group.numberMembers + 1;
          this.groupService.createGroups(this.group).subscribe((response) => {
            console.log('Grupo Actualizado');
            this.cerrar.emit();
          });
        });
      });
    } else {
      this.userServices.createUserGroup(this.data).subscribe((response) => {
        console.log('Relación Creada');
        this.group.numberMembers = this.group.numberMembers + 1;
        this.groupService.createGroups(this.group).subscribe((response) => {
          console.log('Grupo Actualizado');
          this.cerrar.emit();
        });
      });
    }
  }
}
