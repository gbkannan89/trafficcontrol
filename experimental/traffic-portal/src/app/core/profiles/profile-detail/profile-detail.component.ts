/*
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

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileType, ResponseCDN, ResponseProfile } from "trafficops-types";

import { CDNService, ProfileService } from "src/app/api";
import { DecisionDialogComponent } from "src/app/shared/dialogs/decision-dialog/decision-dialog.component";
import { NavigationService } from "src/app/shared/navigation/navigation.service";

/**
 * ProfileDetailComponent is the controller for the profile add/edit form.
 */
@Component({
	selector: "tp-profile-detail",
	styleUrls: ["./profile-detail.component.scss"],
	templateUrl: "./profile-detail.component.html"
})
export class ProfileDetailComponent implements OnInit {
	public new = false;
	public profile!: ResponseProfile;
	public cdns!: ResponseCDN[];
	public types = [
		{ value: "ATS_PROFILE" },
		{ value: "TR_PROFILE" },
		{ value: "TM_PROFILE" },
		{ value: "TS_PROFILE" },
		{ value: "TP_PROFILE" },
		{ value: "INFLUXDB_PROFILE" },
		{ value: "RIAK_PROFILE" },
		{ value: "SPLUNK_PROFILE" },
		{ value: "DS_PROFILE" },
		{ value: "ORG_PROFILE" },
		{ value: "KAFKA_PROFILE" },
		{ value: "LOGSTASH_PROFILE" },
		{ value: "ES_PROFILE" },
		{ value: "UNK_PROFILE" },
		{ value: "GROVE_PROFILE" }
	];

	constructor(
		private readonly dialog: MatDialog,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly navSvc: NavigationService,
		private readonly api: ProfileService,
		private readonly cdnService: CDNService
	) { }

	/**
	 * Angular lifecycle hook where data is initialized.
	 */
	public async ngOnInit(): Promise<void> {
		this.cdns = await this.cdnService.getCDNs();
		const id = this.route.snapshot.paramMap.get("id");

		if (id === null) {
			throw new Error("missing required route parameter 'id'");
		} else if (id === "new") {
			this.new = true;
			this.navSvc.headerTitle.next("New Profile");
			this.profile = {
				cdn: -1,
				cdnName: "",
				description: "",
				id: -1,
				lastUpdated: new Date(),
				name: "",
				routingDisabled: false,
				type: ProfileType.ATS_PROFILE
			};
		} else {
			const numID = parseInt(id, 10);
			if (Number.isNaN(numID)) {
				throw new Error(`route parameter 'id' was non-number:  ${{ id }}`);
			} else {
				this.profile = await this.api.getProfiles(Number(id));
				this.navSvc.headerTitle.next(`Profile: ${this.profile.name}`);
			}
		}
	}

	/**
	 * Submits new/updated type.
	 *
	 * @param e HTML form submission event.
	 */
	public async submit(e: Event): Promise<void> {
		e.preventDefault();
		e.stopPropagation();
		if(this.new) {
			this.profile = await this.api.createProfile(this.profile);
			this.new = false;
		} else {
			this.profile = await this.api.updateProfile(this.profile);
		}
	}

	/**
	 * Deletes the current type.
	 */
	public async deleteType(): Promise<void> {
		if (this.new) {
			console.error("Unable to delete new type");
			return;
		}
		const ref = this.dialog.open(DecisionDialogComponent, {
			data: {
				message: `Are you sure to delete Profile ${this.profile.name} with id ${this.profile.id}?`,
				title: "Confirm Delete"
			}
		});
		ref.afterClosed().subscribe(result => {
			if (result) {
				this.api.deleteProfile(this.profile.id).then(async () => this.router.navigate(["/core/profiles"]));
			}
		});
	}
}
