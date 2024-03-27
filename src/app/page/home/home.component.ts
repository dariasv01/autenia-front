import { Component } from '@angular/core';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group/group.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  groups: Group[] = [];
  showNewGroup: boolean = false;
  groupSubscription: Subscription | undefined;

  constructor(private groupService: GroupService, private router: Router) {}

  ngOnInit(): void {
    this.getGruops();
  }

  getGruops(): void {
    this.groupSubscription = this.groupService.getGroups().subscribe((gruops) => {
      if (gruops) {
        this.groups = gruops;
      } else {
        console.error('Error: Groups data is undefined or null');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }

  openNewGroup(): void {
    this.showNewGroup = true;
  }

  closeNewGroup(): void {
    this.showNewGroup = false;
    this.getGruops();
  }

  navigateToGroup(group: Group): void {
    this.router.navigate(['/group'], {
      queryParams: { group: JSON.stringify(group) },
    });
  }
}
