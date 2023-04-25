/**
 * @module src/app/core
 * The "Core" module consists of all TP functionality and components that aren't
 * needed/useful until the user is authenticated.
 *
 * @license Apache-2.0
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";

import { AppUIModule } from "../app.ui.module";
import { AuthenticatedGuard } from "../guards/authenticated-guard.service";
import { SharedModule } from "../shared/shared.module";

import { AsnDetailComponent } from "./cache-groups/asns/detail/asn-detail.component";
import { AsnsTableComponent } from "./cache-groups/asns/table/asns-table.component";
import { CacheGroupDetailsComponent } from "./cache-groups/cache-group-details/cache-group-details.component";
import { CacheGroupTableComponent } from "./cache-groups/cache-group-table/cache-group-table.component";
import { CoordinateDetailComponent } from "./cache-groups/coordinates/detail/coordinate-detail.component";
import { CoordinatesTableComponent } from "./cache-groups/coordinates/table/coordinates-table.component";
import { DivisionDetailComponent } from "./cache-groups/divisions/detail/division-detail.component";
import { DivisionsTableComponent } from "./cache-groups/divisions/table/divisions-table.component";
import { RegionDetailComponent } from "./cache-groups/regions/detail/region-detail.component";
import { RegionsTableComponent } from "./cache-groups/regions/table/regions-table.component";
import { CDNDetailComponent } from "./cdns/cdn-detail/cdn-detail.component";
import { ChangeLogsComponent } from "./change-logs/change-logs.component";
import { LastDaysComponent } from "./change-logs/last-days/last-days.component";
import { CurrentuserComponent } from "./currentuser/currentuser.component";
import { UpdatePasswordDialogComponent } from "./currentuser/update-password-dialog/update-password-dialog.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DeliveryserviceComponent } from "./deliveryservice/deliveryservice.component";
import { DsCardComponent } from "./deliveryservice/ds-card/ds-card.component";
import { InvalidationJobsComponent } from "./deliveryservice/invalidation-jobs/invalidation-jobs.component";
import {
	NewInvalidationJobDialogComponent
} from "./deliveryservice/invalidation-jobs/new-invalidation-job-dialog/new-invalidation-job-dialog.component";
import { NewDeliveryServiceComponent } from "./deliveryservice/new-delivery-service/new-delivery-service.component";
import { ISOGenerationFormComponent } from "./misc/isogeneration-form/isogeneration-form.component";
import { ProfileTableComponent } from "./profiles/profile-table/profile-table.component";
import { PhysLocDetailComponent } from "./servers/phys-loc/detail/phys-loc-detail.component";
import { PhysLocTableComponent } from "./servers/phys-loc/table/phys-loc-table.component";
import { ServerDetailsComponent } from "./servers/server-details/server-details.component";
import { ServersTableComponent } from "./servers/servers-table/servers-table.component";
import { UpdateStatusComponent } from "./servers/update-status/update-status.component";
import {TypeDetailComponent} from "./types/detail/type-detail.component";
import {TypesTableComponent} from "./types/table/types-table.component";
import { TenantDetailsComponent } from "./users/tenants/tenant-details/tenant-details.component";
import { TenantsComponent } from "./users/tenants/tenants.component";
import { UserDetailsComponent } from "./users/user-details/user-details.component";
import { UserRegistrationDialogComponent } from "./users/user-registration-dialog/user-registration-dialog.component";
import { UsersComponent } from "./users/users.component";
import { ProfileDetailComponent } from './profiles/profile-detail/profile-detail.component';

export const ROUTES: Routes = [
	{ component: DashboardComponent, path: "" },
	{ component: AsnDetailComponent, path: "asns/:id"},
	{ component: AsnsTableComponent, path: "asns" },
	{ component: DivisionsTableComponent, path: "divisions" },
	{ component: DivisionDetailComponent, path: "divisions/:id" },
	{ component: RegionsTableComponent, path: "regions" },
	{ component: RegionDetailComponent, path: "regions/:id" },
	{ component: UsersComponent, path: "users" },
	{ component: UserDetailsComponent, path: "users/:id"},
	{ component: CDNDetailComponent, path: "cdns/:id" },
	{ component: ServersTableComponent, path: "servers" },
	{ component: ServerDetailsComponent, path: "servers/:id" },
	{ component: DeliveryserviceComponent, path: "deliveryservice/:id" },
	{ component: InvalidationJobsComponent, path: "deliveryservice/:id/invalidation-jobs" },
	{ component: CurrentuserComponent, path: "me" },
	{ component: NewDeliveryServiceComponent, path: "new.Delivery.Service" },
	{ component: CacheGroupTableComponent, path: "cache-groups" },
	{ component: CacheGroupDetailsComponent, path: "cache-groups/:id"},
	{ component: TenantsComponent, path: "tenants"},
	{ component: ChangeLogsComponent, path: "change-logs" },
	{ component: TenantDetailsComponent, path: "tenants/:id"},
	{ component: PhysLocDetailComponent, path: "phys-locs/:id" },
	{ component: PhysLocTableComponent, path: "phys-locs" },
	{ component: CoordinateDetailComponent, path: "coordinates/:id" },
	{ component: CoordinatesTableComponent, path: "coordinates" },
	{ component: TypesTableComponent, path: "types" },
	{ component: TypeDetailComponent, path: "types/:id"},
	{ component: ISOGenerationFormComponent, path: "iso-gen"},
	{ component: ProfileDetailComponent, path: "profiles/:id"},
	{ component: ProfileTableComponent, path: "profiles"},
].map(r => ({...r, canActivate: [AuthenticatedGuard]}));

/**
 * CoreModule contains code that only logged-in users will be served.
 */
@NgModule({
	declarations: [
		UsersComponent,
		ServerDetailsComponent,
		ServersTableComponent,
		DeliveryserviceComponent,
		NewDeliveryServiceComponent,
		CurrentuserComponent,
		UpdatePasswordDialogComponent,
		DashboardComponent,
		DsCardComponent,
		InvalidationJobsComponent,
		CacheGroupTableComponent,
		NewInvalidationJobDialogComponent,
		UpdateStatusComponent,
		UserDetailsComponent,
		TenantsComponent,
		UserRegistrationDialogComponent,
		TenantDetailsComponent,
		ChangeLogsComponent,
		LastDaysComponent,
		UserRegistrationDialogComponent,
		PhysLocTableComponent,
		PhysLocDetailComponent,
		AsnsTableComponent,
		AsnDetailComponent,
		DivisionsTableComponent,
		DivisionDetailComponent,
		RegionsTableComponent,
		RegionDetailComponent,
		CacheGroupDetailsComponent,
		CoordinatesTableComponent,
		CoordinateDetailComponent,
		TypesTableComponent,
		TypeDetailComponent,
		ISOGenerationFormComponent,
  		ProfileTableComponent,
		CDNDetailComponent,
  		ProfileDetailComponent,
	],
	exports: [],
	imports: [
		SharedModule,
		AppUIModule,
		CommonModule,
		RouterModule.forChild(ROUTES)
	]
})
export class CoreModule { }
