import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalDialogComponent } from './modal-dialog.component';

describe('ModalDialogComponent', () => {
    let component: ModalDialogComponent;
    let fixture: ComponentFixture<ModalDialogComponent>;
  
    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          declarations: [ModalDialogComponent]
        }).compileComponents();
      });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ModalDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  
    // Add more test cases as needed
  });
  