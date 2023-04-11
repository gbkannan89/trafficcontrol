/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe("DS Card Spec", () => {
	it("Verify expand test", async (): Promise<void> => {
		await browser.page.common()
			.section.sidebar
			.click("@dashboard");
		await browser.page.deliveryServices.deliveryServiceCard()
			.section.cards
			.expandDS(`testDS${browser.globals.uniqueString}`);
	});

	it("Verify detail test", async (): Promise<void> => {
		await browser.page.common()
			.section.sidebar
			.click("@dashboard");
		await browser.page.deliveryServices.deliveryServiceCard()
			.section.cards
			.viewDetails(`testDS${browser.globals.uniqueString}`);
	});
});
