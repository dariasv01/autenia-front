import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { SpentsService } from '../../services/spent/spents.service';
import { UserService } from '../../services/user/user.service';
import { DataService } from '../../services/data/data.service';
import { GroupService } from '../../services/group/group.service';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrl: './show-result.component.css',
})
export class ShowResultComponent {
  group: Group = {
    id: 0,
    idUser: 0,
    nameGroup: '',
    totalSpent: 0,
    numberMembers: 0,
  };

  users: User[] = [];

  usersValance: any[] = [];

  @Output() cerrar: EventEmitter<any> = new EventEmitter();

  constructor(
    private spentsServices: SpentsService,
    private userServices: UserService,
    private dataService: DataService,
    private groupSevices: GroupService
  ) {}

  ngOnInit(): void {
    this.group = this.dataService.getObjeto();
    this.getGroup()
    this.getUsers();
  }

  private getGroup(){
    this.groupSevices.getGroup(this.group.id).subscribe(group => this.group = group)
  }

  private getUsers(): void {
    this.userServices.getUserByIdGroup(this.group.id).subscribe((users) => {
      users.forEach((element) => {
        this.userServices.getUser(element.idUser).subscribe((responseUser) => {
          this.users.push(responseUser);
          let total = 0;
          this.spentsServices
            .getSpentsByIdGroupAndIdUser(this.group.id, element.idUser)
            .subscribe((response) => {
              response.forEach((element) => {
                total = element.amount + total;
              });
              let valanceNum =
                total - this.group.totalSpent / this.group.numberMembers;
                console.info(total)
              this.usersValance.push({
                user: responseUser,
                valance: valanceNum,
              });
            });
            
        console.log(this.usersValance);
        });
      });
    });
  }

  cerrarResultado(): void {
    this.cerrar.emit();
  }

}
