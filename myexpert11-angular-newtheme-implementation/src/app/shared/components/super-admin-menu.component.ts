import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'super-admin-menu',
    template: `
        <div class="col-md-3 col-sm-3" style="border-right:1px solid #ddd;padding:0px;">
            <ul id="ulid" class="nln1" style="margin: 0px; padding: 0px;">
                <li [routerLinkActive]="'listactive'" routerLink="/add-category" class="listiingsli"><a><i class="fa fa-arrow-right"></i>  &nbsp;Add Category</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/category-list" class="listiingsli"><a><i class="fa fa-arrow-right"></i>  &nbsp;Manage Categories</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/user-list" class="listiingsli"><a><i class="fa fa-arrow-right"></i> &nbsp;Manage Users</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/company-list" class="listiingsli"><a><i class="fa fa-arrow-right"></i> &nbsp;Manage Company</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/banner" class="listiingsli"><a><i class="fa fa-arrow-right"></i> &nbsp;Manage Banner</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/blog-list" class="listiingsli"><a><i class="fa fa-arrow-right"></i> &nbsp;Manage Blog</a></li>
                <li [routerLinkActive]="'listactive'" routerLink="/create-blog" class="listiingsli"><a><i class="fa fa-arrow-right"></i> &nbsp;Create Blog</a></li>
            </ul>
        </div>
    `
})

export class SuperAdminMenuComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}