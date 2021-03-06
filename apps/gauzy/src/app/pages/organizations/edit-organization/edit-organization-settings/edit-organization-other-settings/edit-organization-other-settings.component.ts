import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	AlignmentOptions,
	DefaultValueDateTypeEnum,
	Organization,
	WeekDaysEnum,
	RegionsEnum,
	CurrenciesEnum
} from '@gauzy/models';
import { NbToastrService } from '@nebular/theme';
import { OrganizationEditStore } from 'apps/gauzy/src/app/@core/services/organization-edit-store.service';
import * as moment from 'moment';
import * as timezone from 'moment-timezone';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrganizationsService } from '../../../../../@core/services/organizations.service';

@Component({
	selector: 'ga-edit-org-other-settings',
	templateUrl: './edit-organization-other-settings.component.html',
	styleUrls: ['./edit-organization-other-settings.component.scss']
})
export class EditOrganizationOtherSettingsComponent
	implements OnInit, OnDestroy {
	private _ngDestroy$ = new Subject<void>();

	organization: Organization;

	form: FormGroup;

	defaultValueDateTypes: string[] = Object.values(DefaultValueDateTypeEnum);
	defaultAlignmentTypes: string[] = Object.values(AlignmentOptions).map(
		(type) => {
			return type[0] + type.substr(1, type.length).toLowerCase();
		}
	);
	listOfZones = timezone.tz.names().filter((zone) => zone.includes('/'));
	// todo: maybe its better to place listOfDateFormats somewhere more global for the app?
	listOfDateFormats = ['L', 'L hh:mm', 'LL', 'LLL', 'LLLL'];
	numberFormats = ['USD', 'BGN', 'ILS'];
	numberFormat: string;
	weekdays: string[] = Object.values(WeekDaysEnum);
	currencies = Object.values(CurrenciesEnum);
	regionCodes = Object.keys(RegionsEnum);
	regionCode: string;
	regions = Object.values(RegionsEnum);

	constructor(
		private fb: FormBuilder,
		private organizationService: OrganizationsService,
		private toastrService: NbToastrService,
		private readonly organizationEditStore: OrganizationEditStore
	) {}

	getTimeWithOffset(zone: string) {
		let cutZone = zone;
		if (zone.includes('/')) {
			cutZone = zone.split('/')[1];
		}

		const offset = timezone.tz(zone).format('zZ');

		return '(' + offset + ') ' + cutZone;
	}

	dateFormatPreview(format: string) {
		this.form.valueChanges
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((val) => {
				this.regionCode = val.regionCode;
			});

		moment.locale(this.regionCode);
		return moment().format(format);
	}

	numberFormatPreview(format: string) {
		const number = 12345.67;
		let code: string;
		switch (format) {
			case 'BGN':
				code = 'bg';
				break;
			case 'USD':
				code = 'en';
				break;
			case 'ILS':
				code = 'he';
				break;
		}
		return number.toLocaleString(`${code}`, {
			style: 'currency',
			currency: `${format}`,
			currencyDisplay: 'symbol'
		});
	}

	ngOnInit(): void {
		this.organizationEditStore.selectedOrganization$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((organization) => {
				this.organization = organization;
				this._initializedForm();
			});
	}

	async updateOrganizationSettings() {
		this.organizationService.update(
			this.organization.id,
			this.form.getRawValue()
		);
		this.toastrService.primary(
			this.organization.name + ' organization settings updated.',
			'Success'
		);
		this.goBack();
	}

	goBack() {
		const currentURL = window.location.href;
		window.location.href = currentURL.substring(
			0,
			currentURL.indexOf('/settings')
		);
	}

	private _initializedForm() {
		if (!this.organization) {
			return;
		}

		this.form = this.fb.group({
			defaultValueDateType: [
				this.organization.defaultValueDateType,
				Validators.required
			],
			regionCode: [this.organization.regionCode],
			defaultAlignmentType: [this.organization.defaultAlignmentType],
			brandColor: [this.organization.brandColor],
			dateFormat: [this.organization.dateFormat],
			timeZone: [this.organization.timeZone],
			startWeekOn: [this.organization.startWeekOn],
			numberFormat: [this.organization.numberFormat]
		});
	}

	ngOnDestroy() {
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}
}
