import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpentsService } from '../../services/spent/spents.service';
import { Spent } from '../../models/spent';
import { Group } from '../../models/group';
import { DataService } from '../../services/data/data.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-gruop',
  templateUrl: './gruop.component.html',
  styleUrl: './gruop.component.css',
})
export class GruopComponent {
  expenses: Spent[] = [];

  group: Group = {
    id: 0,
    idUser: 0,
    nameGroup: '',
    totalSpent: 0,
    numberMembers: 0,
  };

  users: User[] = [];

  constructor(
    private router: Router,
    private userServices: UserService,
    private spentServices: SpentsService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['group']) {
        this.group = JSON.parse(params['group']);
      }
    });
    this.getUsers(this.group.id);
    this.getSpents(this.group.id);
  }

  private getUsers(id: number): void {
    this.userServices.getUserByIdGroup(id).subscribe((users) => {
      users.forEach((element) => {
        this.userServices.getUser(element.idUser).subscribe((response) => {
          this.users.push(response);
        });
      });
    });
  }

  private getSpents(id: number) {
    this.spentServices
      .getSpentsByIdGroup(id)
      .subscribe((expenses) => (this.expenses = expenses));
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }

  mostrarNuevoGasto: boolean = false;
  mostrarNuevoUsuario: boolean = false;
  mostrarResultado: boolean = false;

  abrirNuevoGasto(): void {
    this.dataService.setObjeto(this.group);
    this.mostrarNuevoGasto = true;
  }

  cerrarNuevoGasto(): void {
    this.mostrarNuevoGasto = false;
    this.getSpents(this.group.id);
  }

  abrirNuevoUsuario(): void {
    this.dataService.setObjeto(this.group);
    this.mostrarNuevoUsuario = true;
  }

  abrirResultado(): void {
    this.dataService.setObjeto(this.group);
    this.mostrarResultado = true;
  }

  cerrarNuevoUsuario(): void {
    this.mostrarNuevoUsuario = false;
    this.getUsers(this.group.id);
  }
  cerrarResultado(): void {
    this.mostrarResultado = false;
  }
  obtenerNombrePorId(id: number): string | undefined {
    const objetoEncontrado = this.users.find((objeto) => objeto.id === id);
    return objetoEncontrado
      ? objetoEncontrado.firstName + ' ' + objetoEncontrado.lastName
      : undefined;
  }
}
