import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SuperAdminMenuComponent } from './components/super-admin-menu.component';
import { AdminMenuComponent } from './components/admin-menu.component';
import { TruncatePipe } from './shared.pipe';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [SuperAdminMenuComponent, AdminMenuComponent, TruncatePipe],
    declarations: [SuperAdminMenuComponent, AdminMenuComponent, TruncatePipe],
})
export class SharedModule { }
