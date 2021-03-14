import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";
import { AuthStorageService } from "../services/auth-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthStorageService,
    private router: Router
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated.pipe(
      take(1),
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return this.authService.AoutoLogin();
        }
        return of(isAuthenticated);
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl("/auth");
        }
      })
    );
  }
}
