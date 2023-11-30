import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    routesToCache: string[] = ["events"];
    storedRouteHandles = new Map<string, DetachedRouteHandle>();
   
    // decides if the route should be stored
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
       return this.routesToCache.indexOf(route.routeConfig!.path!) > -1;
    }
   
    // store the information for the route we're destructing
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
       this.storedRouteHandles.set(route.routeConfig!.path!, handle);
    }
   
   // return true if we have a stored route object for the next route
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
       return this.storedRouteHandles.has(route.routeConfig!.path!);
    }
   
    // if we returned true in shouldAttach(), now return the actual route data for restoration
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
       return this.storedRouteHandles.get(route.routeConfig!.path!) || null;
    }
   
    // reuse the route if we're going to and from the same route
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
       return future.routeConfig === curr.routeConfig;
    }
   }