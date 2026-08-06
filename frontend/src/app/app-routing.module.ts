import { Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
    { path: '', component: HeroComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin-panel',
        component: AdminComponent,
        canActivate: [AuthGuard] // This protects the page
    }
]