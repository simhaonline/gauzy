import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user';
import { EmployeeModule } from './employee';
import { RoleModule } from './role';
import { OrganizationModule } from './organization';
import { IncomeModule } from './income';
import { ExpenseModule } from './expense';
import { EmployeeSettingModule } from './employee-setting';
import { CoreModule } from './core';
import { AuthModule } from './auth';
import { SeedDataService } from './core/seeds/SeedDataService';
import { UserOrganizationModule } from './user-organization';
import { EmployeeStatisticsModule } from './employee-statistics';
import { OrganizationDepartmentModule } from './organization-department';
import { OrganizationRecurringExpenseModule } from './organization-recurring-expense';
import { EmployeeRecurringExpenseModule } from './employee-recurring-expense';
import { OrganizationClientsModule } from './organization-clients';
import { OrganizationPositionsModule } from './organization-positions';
import { OrganizationProjectsModule } from './organization-projects';
import { OrganizationVendorsModule } from './organization-vendors';
import { OrganizationTeamsModule } from './organization-teams';
import { ProposalModule } from './proposal';
import { CountryModule } from './country';
import { InviteModule } from './invite';
import { EmailModule } from './email-templates';
import { TimeOffPolicyModule } from './time-off-policy/time-off-policy.module';

@Module({
	imports: [
		RouterModule.forRoutes([
			{
				path: '',
				children: [
					{ path: '/auth', module: AuthModule },
					{ path: '/user', module: UserModule },
					{ path: '/role', module: RoleModule },
					{ path: '/organization', module: OrganizationModule },
					{ path: '/income', module: IncomeModule },
					{ path: '/expense', module: ExpenseModule },
					{ path: '/employee', module: EmployeeModule },
					{
						path: '/employee-settings',
						module: EmployeeSettingModule
					},
					{
						path: '/employee-statistics',
						module: EmployeeStatisticsModule
					},
					{
						path: '/user-organization',
						module: UserOrganizationModule
					},
					{
						path: '/organization-department',
						module: OrganizationDepartmentModule
					},
					{
						path: '/organization-clients',
						module: OrganizationClientsModule
					},
					{
						path: '/organization-positions',
						module: OrganizationPositionsModule
					},
					{
						path: '/organization-projects',
						module: OrganizationProjectsModule
					},
					{
						path: '/organization-vendors',
						module: OrganizationVendorsModule
					},
					{
						path: '/organization-recurring-expense',
						module: OrganizationRecurringExpenseModule
					},
					{
						path: '/employee-recurring-expense',
						module: EmployeeRecurringExpenseModule
					},
					{
						path: '/organization-teams',
						module: OrganizationTeamsModule
					},
					{
						path: '/proposal',
						module: ProposalModule
					},
					{
						path: '/country',
						module: CountryModule
					},
					{
						path: '/invite',
						module: InviteModule
					},
					{
						path: '/email',
						module: EmailModule
					},
					{
						path: 'time-off-policy',
						module: TimeOffPolicyModule
					}
				]
			}
		]),
		CoreModule,
		AuthModule,
		UserModule,
		EmployeeModule,
		EmployeeSettingModule,
		EmployeeStatisticsModule,
		RoleModule,
		OrganizationModule,
		IncomeModule,
		ExpenseModule,
		UserOrganizationModule,
		OrganizationDepartmentModule,
		OrganizationRecurringExpenseModule,
		OrganizationClientsModule,
		OrganizationPositionsModule,
		OrganizationProjectsModule,
		OrganizationVendorsModule,
		EmployeeRecurringExpenseModule,
		OrganizationTeamsModule,
		ProposalModule,
		EmailModule,
		CountryModule,
		InviteModule,
		TimeOffPolicyModule
	],
	controllers: [AppController],
	providers: [AppService, SeedDataService],
	exports: []
})
export class AppModule {}
