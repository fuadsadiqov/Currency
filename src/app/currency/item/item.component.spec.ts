import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTestDialogOpenerModule } from '@angular/material/dialog/testing'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;
  
    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, MatTestDialogOpenerModule, MatProgressSpinnerModule],
          declarations: [ItemComponent]
        }).compileComponents();
      });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  
    // Add more test cases as needed
  
  });
  