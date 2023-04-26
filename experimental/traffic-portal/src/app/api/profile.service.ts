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

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestProfile, ResponseProfile } from "trafficops-types";

import { APIService } from "./base-api.service";

/**
 * ProfileService exposes API functionality related to Profiles.
 */
@Injectable()
export class ProfileService extends APIService {

	/**
	 * Injects the Angular HTTP client service into the parent constructor.
	 *
	 * @param http The Angular HTTP client service.
	 */
	constructor(http: HttpClient) {
		super(http);
	}

	public async getProfiles(idOrName: number | string): Promise<ResponseProfile>;
	public async getProfiles(): Promise<Array<ResponseProfile>>;
	/**
	 * Retrieves Profiles from the API.
	 *
	 * @param idOrName Specify either the integral, unique identifier (number) of a specific Profile to retrieve, or its name (string).
	 * @returns The requested Profile(s).
	 */
	public async getProfiles(idOrName?: number | string): Promise<Array<ResponseProfile> | ResponseProfile> {
		const path = "profiles";
		if (idOrName !== undefined) {
			let params;
			switch (typeof idOrName) {
				case "number":
					params = {id: String(idOrName)};
					break;
				case "string":
					params = {name: idOrName};
			}
			const r = await this.get<[ResponseProfile]>(path, undefined, params).toPromise();
			return r[0];
		}
		return this.get<Array<ResponseProfile>>(path).toPromise();
	}

	/**
	 * Creates a new profile.
	 *
	 * @param profile The profile to create.
	 * @returns The created profile.
	 */
	public async createProfile(profile: RequestProfile): Promise<ResponseProfile> {
		return this.post<ResponseProfile>("profiles", profile).toPromise();
	}

	/**
	 * Replaces the current definition of a profile with the one given.
	 *
	 * @param profile The new profile.
	 * @returns The updated profile.
	 */
	public async updateProfile(profile: ResponseProfile): Promise<ResponseProfile> {
		const path = `profiles/${profile.id}`;
		return this.put<ResponseProfile>(path, profile).toPromise();
	}

	/**
	 * Deletes an existing profile.
	 *
	 * @param profileId Id of the profile to delete.
	 * @returns The success message.
	 */
	public async deleteProfile(profileId: number | ResponseProfile): Promise<ResponseProfile> {
		const id = typeof (profileId) === "number" ? profileId : profileId.id;
		return this.delete<ResponseProfile>(`profiles/${id}`).toPromise();
	}

}
