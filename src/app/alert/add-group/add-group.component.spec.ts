import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddGroupComponent } from './add-group.component';
import { GroupService } from '../../services/group/group.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AddGroupComponent', () => {
  let component: AddGroupComponent;
  let fixture: ComponentFixture<AddGroupComponent>;
  let groupServiceSpy: jasmine.SpyObj<GroupService>;

  beforeEach(async () => {
    const groupServiceSpyObj = jasmine.createSpyObj('GroupService', ['createGroups']);

    await TestBed.configureTestingModule({
      declarations: [AddGroupComponent],
      imports:[FormsModule],
      providers: [{ provide: GroupService, useValue: groupServiceSpyObj }]
    }).compileComponents();

    groupServiceSpy = TestBed.inject(GroupService) as jasmine.SpyObj<GroupService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupComponent);
    component = fixture.componentInstance;

    // Configurar el grupo inicial
    component.newGroup = { id: 1, idUser: 1, nameGroup: 'New Group', totalSpent: 0, numberMembers: 0 };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cerrar event when cerrarNuevoGrupo is called', () => {
    // Arrange
    const cerrarSpy = spyOn(component.cerrar, 'emit');

    // Act
    component.closeNewGroup();

    // Assert
    expect(cerrarSpy).toHaveBeenCalled();
  });

  it('should call createGroups method of GroupService and emit cerrar event when agregarGrupo is called', () => {
    // Arrange
    groupServiceSpy.createGroups.and.returnValue(of());

    // Act
    component.createGroup();

    // Assert
    expect(groupServiceSpy.createGroups).toHaveBeenCalledWith(component.newGroup);
  });
});
