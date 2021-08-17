
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component'; 
import { VarifyaccountComponent } from './varifyaccount/varifyaccount.component';
import { JoinLeagueComponent } from './join-league/join-league.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { ChooseCaptainComponent } from './choose-captain/choose-captain.component';
import { MyteamComponent } from './myteam/myteam.component';
import { WalletComponent } from './wallet/wallet.component';
import { WithdrawAmountComponent } from './withdraw-amount/withdraw-amount.component';
import { SingleleaugeComponent } from './singleleauge/singleleauge.component';
import { InvitefriendsComponent } from './invitefriends/invitefriends.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqComponent } from './faq/faq.component';
import { PointsystemComponent } from './pointsystem/pointsystem.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationComponent } from './notification/notification.component';
/* import { LivematchesComponent } from './livematches/livematches.component';
import { MystatsComponent } from './mystats/mystats.component'; */
import { MoreComponent } from './more/more.component';
import { CareersComponent } from './careers/careers.component';
import { MeComponent } from './me/me.component';
import { LoginActivate } from './app.service';
import { AllContestComponent } from './all-contest/all-contest.component';
import { CreateContestComponent } from './create-contest/create-contest.component';
import { MyContestComponent } from './my-contest/my-contest.component'; 
import { RateReviewsComponent } from './rate-reviews/rate-reviews.component'; 
import { FairplayComponent } from './fairplay/fairplay.component';
import { LegalityComponent } from './legality/legality.component'; 
import { BountyComponent } from './bounty/bounty.component';
import { BecomeAPartnerComponent } from './become-a-partner/become-a-partner.component'; 
import { PlayerinfoComponent } from './playerinfo/playerinfo.component'; 
import { HowtoplayComponent } from './howtoplay/howtoplay.component'; 
import { CommunityComponent } from './community/community.component'; 
import { ContactUsComponent } from './contact-us/contact-us.component'; 
import { PromoOffersComponent } from './promo-offers/promo-offers.component';
import { AutoSupportComponent } from './auto-support/auto-support.component'; 
import { HowitworksComponent } from './howitworks/howitworks.component'; 
import { RulesoffairplayComponent } from './rulesoffairplay/rulesoffairplay.component'; 
import { BlogComponent } from './blog/blog.component'; 
const appRoutes: Routes = [
    {
      path: '',
      children: [
            {
                path: '',
                component: IndexComponent
            }, 
            {
                path: 'login',
                component: LoginComponent
            },  
            {
                path: 'register',
                component: RegisterComponent
            }, 
            {
                path: 'contact-us',
                component: ContactUsComponent
            }, 
            {
                path: 'community',
                component: CommunityComponent
            }, 
             {
                path: 'home',
                component: HomeComponent
            }, 
             {
                path: 'profile',
                component: ProfileComponent
            }, 
             {
                path: 'all-contests',
                component: AllContestComponent
            }, 
             {
                path: 'verify-account',
                component: VarifyaccountComponent
            },
             {
                path: 'join-contest',
                component: JoinLeagueComponent
            },
             {
                path: 'create-team',
                component: CreateTeamComponent
            },
             {
                path: 'choose-captain',
                component: ChooseCaptainComponent
            },
             {
                path: 'myteams',
                component: MyteamComponent
            },
             {
                path: 'my-account',
                component: WalletComponent
            },
            {
                path: 'withdraw-amount',
                component: WithdrawAmountComponent
            },
            {
                path: 'create-contest',
                component: CreateContestComponent
            },
            {
                path: 'my-contests',
                component: MyContestComponent
            },
            {
                path: 'contest-info',
                component: SingleleaugeComponent
            },
            {
                path: 'my-transcations',
                component: TransactionsComponent
            }, 
            {
                path: 'rate-reviews',
                component: RateReviewsComponent
            },
            {
                path: 'invite-friends',
                component: InvitefriendsComponent
            },
            
			{
                path: 'about-us',
                component: AboutUsComponent
            },
            {
                path: 'terms-conditions',
                component: TermsConditionsComponent
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent
            },
            {
                path: 'faq',
                component: FaqComponent
            },
            {
                path: 'point-system',
                component: PointsystemComponent
            },
            {
                path: 'fairplay',
                component: FairplayComponent
            },
            {
                path: 'legality',
                component: LegalityComponent
            },
            {
                path: 'how-to-play',
                component: HowtoplayComponent
            }, 
            {
                path: 'promo-offers',
                component: PromoOffersComponent
            }, 
            {
                path: 'quick-support',
                component: AutoSupportComponent
            }, 
            {
                path: 'bounty',
                component: BountyComponent
            },
            {
                path: 'become-a-partner',
                component: BecomeAPartnerComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
            },
            {
                path: 'playerinfo',
                component: PlayerinfoComponent
            },
            {
                path: 'notifications',
                component: NotificationComponent
            },/*
            {
                path: 'leaugenfo',
                component: SingleleaugeComponent
            },
            {
                path: 'livematches',
                component: LivematchesComponent
            },
            {
                path: 'livematches',
                component: LivematchesComponent
            },
			{
                path: 'my-stats',
                component: MystatsComponent
            },*/
			{
                path: 'more',
                component: MoreComponent
            },
			{
                path: 'careers',
                component: CareersComponent
            },		
			{
                path: 'me',
                component: MeComponent
            },	
			{
                path: 'how-it-works', 
                component: HowitworksComponent
            },	
			{
                path: 'rules-of-fairplay', 
                component: RulesoffairplayComponent
            },
			{
                path: 'blog', 
                component: BlogComponent
            },			 
              {
                path: '**',
                redirectTo: 'home'
              }, 
        ]
        
    }
]


export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);