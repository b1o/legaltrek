import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatterDetailsPageComponent } from './matter-details-page.component';

describe('MatterDetailsPageComponent', () => {
	let component: MatterDetailsPageComponent;
	let fixture: ComponentFixture<MatterDetailsPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatterDetailsPageComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(MatterDetailsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
