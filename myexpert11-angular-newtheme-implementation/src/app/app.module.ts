import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.route';
import { HttpClientService, HeaderService,ManualAuthService,LoaderService, CommonService, HttpIntercepter, AuthService, LoginActivate, NotificationService} from './app.service'; 
import { ToastrModule } from 'ngx-toastr';
import { ChallengeFilterPipe } from './shared/pipes/challenge.pipe';
import { PlayerrolePipe } from './shared/pipes/playerrole.pipe'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component'; 
import { ProfileComponent } from './profile/profile.component';
import { JoinLeagueComponent } from './join-league/join-league.component'; 
import { CreateTeamComponent } from './create-team/create-team.component';
import { ChooseCaptainComponent } from './choose-captain/choose-captain.component';
import { VarifyaccountComponent } from './varifyaccount/varifyaccount.component';
import { SocialLoginModule, AuthServiceConfig  } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { CountdownTimerModule } from 'ngx-countdown-timer';
// import { LeaugesComponent } from './leauges/leauges.component';
import { MyteamComponent } from './myteam/myteam.component';
import { WalletComponent } from './wallet/wallet.component';
// import { OtherHeaderComponent } from './other-header/other-header.component';
import {Globals} from './global';
import { TransactionsComponent } from './transactions/transactions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqComponent } from './faq/faq.component';
import { WithdrawAmountComponent } from './withdraw-amount/withdraw-amount.component';
import { SingleleaugeComponent } from './singleleauge/singleleauge.component';
import { InvitefriendsComponent } from './invitefriends/invitefriends.component';
import { NotificationComponent } from './notification/notification.component';
import { PointsystemComponent } from './pointsystem/pointsystem.component';
// import { RightSideComponent } from './right-side/right-side.component'; 
import { LeftSideComponent } from './left-side/left-side.component';
// import { LivematchesComponent } from './livematches/livematches.component';
// import { CeiboShare } from 'ng2-social-share';
import { ChangePasswordComponent } from './change-password/change-password.component';
// import { MystatsComponent } from './mystats/mystats.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MoreComponent } from './more/more.component';
import { MeComponent } from './me/me.component';
import { DataTableModule} from "angular-6-datatable";
import { AllContestComponent } from './all-contest/all-contest.component';
import { CreateContestComponent } from './create-contest/create-contest.component';
import { MyContestComponent } from './my-contest/my-contest.component';
import { JoinedContestComponent } from './joined-contest/joined-contest.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { RateReviewsComponent } from './rate-reviews/rate-reviews.component';
import { FairplayComponent } from './fairplay/fairplay.component';
import { LegalityComponent } from './legality/legality.component';
import { BountyComponent } from './bounty/bounty.component';
import { BecomeAPartnerComponent } from './become-a-partner/become-a-partner.component';
import { PlayerinfoComponent } from './playerinfo/playerinfo.component';
import { CareersComponent } from './careers/careers.component';
import { HowtoplayComponent } from './howtoplay/howtoplay.component';
import { CommunityComponent } from './community/community.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PromoOffersComponent } from './promo-offers/promo-offers.component';
import { AutoSupportComponent } from './auto-support/auto-support.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { RulesoffairplayComponent } from './rulesoffairplay/rulesoffairplay.component';
import { BlogComponent } from './blog/blog.component'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from './mainHttpInterceptor';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
// import { DeviceDetectorModule } from 'ngx-device-detector';
import {DeviceDetectorModule} from 'ngx-device-detector';
let config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider("861715735903-sjtjmqccnu286ldl782pjm9a61afmlan.apps.googleusercontent.com")
  // },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("861715735903-sjtjmqccnu286ldl782pjm9a61afmlan.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("555093354908924")
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    JoinLeagueComponent, 
    CreateTeamComponent,
    ChooseCaptainComponent,
    PlayerrolePipe,
    ChallengeFilterPipe,
    VarifyaccountComponent,
    MyteamComponent,
    WalletComponent,
    // OtherHeaderComponent,
    TransactionsComponent,
    AboutUsComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    FaqComponent,
    WithdrawAmountComponent,
    SingleleaugeComponent,
    InvitefriendsComponent,
    NotificationComponent,
    PointsystemComponent,
    // RightSideComponent, 
    LeftSideComponent, 
    // LivematchesComponent,
	// LeaugesComponent,
    // CeiboShare,
    ChangePasswordComponent,
    // MystatsComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    MoreComponent,
    MeComponent,
    AllContestComponent,
    CreateContestComponent,
    MyContestComponent,
    JoinedContestComponent,
    TransactionDetailComponent,
    RateReviewsComponent,
    FairplayComponent,
    LegalityComponent,
    BountyComponent,
    BecomeAPartnerComponent,
    PlayerinfoComponent,
    CareersComponent,
    HowtoplayComponent,
    CommunityComponent,
    ContactUsComponent,
    PromoOffersComponent,
    AutoSupportComponent,
    HowitworksComponent,
    RulesoffairplayComponent,
    BlogComponent, 
    
  ],
  imports: [
    BrowserModule, 
    AppRoutes, 
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule ,
    FormsModule,
    SocialLoginModule,
    RecaptchaModule,  //this is the recaptcha main module
    RecaptchaFormsModule, //this is the module for form incase form validation
    // CountDownModule,
    CountdownTimerModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    BrowserAnimationsModule, // required animations module 
	ToastrModule.forRoot({
    timeOut: 2000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  }),
  ],
  providers: [
    Globals,HttpClientService,NotificationService,HeaderService,
    ManualAuthService,LoginActivate,LoaderService,CommonService,
    HttpIntercepter,AuthService,
     { 
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:MainInterceptor,
    //   multi:true
    // }
  ], 
  bootstrap: [AppComponent]
})
 
 
export class AppModule { }
