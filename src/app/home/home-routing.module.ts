import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MattersPageComponent } from '../matters/matters-page/matters-page.component';
import { BillingsPageComponent } from '../billings/billings-page/billings-page.component';
import { CalendarPageComponent } from '../calendar/calendar-page/calendar-page.component';
import { MatterDetailsPageComponent } from '../matters/matter-details-page/matter-details-page.component';
import { AddBillingPageComponent } from '../billings/add-billing-page/add-billing-page.component';

const routes: Routes = [
	{
		path: '',
		component: HomePage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'matters'
			},
			{
				path: 'matters',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../matters/matters.module').then(
								(m) => m.MattersModule
							),
					},
				],
			},
			{
				path: 'billings',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../billings/billings.module').then(
								(m) => m.BillingsModule
							),
					},
				],
			},
			{
				path: 'calendar',
				loadChildren: () =>
					import('../calendar/calendar.module').then(
						(m) => m.CalendarModule
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomePageRoutingModule {}
