import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-menu',
    template: `
        <div class="col-md-3 col-sm-3" style="border-right:1px solid #ddd;padding:0px;">
            <ul id="ulid" class="nln1" style="margin: 0px; padding: 0px;">
                <li [routerLinkActive]="'listactive'" routerLink="/add-product" class="listiingsli"><a><i class="fa fa-arrow-right"></i>  &nbsp;Add Product</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/product-list" class="listiingsli"><a><i class="fa fa-arrow-right"></i> &nbsp;Manage Products</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/project-list" class="listiingsli"><a><i class="fa fa-arrow-right"></i> &nbsp;Manage Projects</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/service-list" class="listiingsli"><a><i class="fa fa-arrow-right"></i> &nbsp;Manage Services</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/quotes" class="listiingsli"><a><i class="fa fa-arrow-right"></i> &nbsp;Quotes</a></li>
            </ul>
        </div>
    `
})

export class AdminMenuComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}