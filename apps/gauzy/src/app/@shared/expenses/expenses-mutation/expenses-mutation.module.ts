import { ThemeModule } from '../../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
	NbCardModule,
	NbButtonModule,
	NbIconModule,
	NbInputModule,
	NbDatepickerModule,
	NbSelectModule,
	NbRadioModule
} from '@nebular/theme';
import { ExpensesMutationComponent } from './expenses-mutation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrganizationsService } from '../../../@core/services/organizations.service';
import { EmployeeSelectorsModule } from '../../../@theme/components/header/selectors/employee/employee.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AttachReceiptComponent } from './attach-receipt/attach-receipt.component';
import { ImageUploaderModule } from '../../image-uploader/image-uploader.module';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	imports: [
		ThemeModule,
		NbCardModule,
		NbButtonModule,
		NbIconModule,
		NgSelectModule,
		ImageUploaderModule,
		ReactiveFormsModule,
		NbInputModule,
		FormsModule,
		NbDatepickerModule,
		NbSelectModule,
		NbRadioModule,
		EmployeeSelectorsModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	exports: [ExpensesMutationComponent],
	declarations: [ExpensesMutationComponent, AttachReceiptComponent],
	entryComponents: [ExpensesMutationComponent, AttachReceiptComponent],
	providers: [OrganizationsService]
})
export class ExpensesMutationModule {}
