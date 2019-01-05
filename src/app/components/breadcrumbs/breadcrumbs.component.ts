import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  Params,
  PRIMARY_OUTLET
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

// http://brianflove.com/2016/10/23/angular2-breadcrumb-using-router/
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  private TITLE_PROPERTY = 'title';

  public breadcrumbs: IBreadcrumb[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    // Subscribe to the NavigationEnd event
    this.router.events.pipe(filter(event => event instanceof NavigationEnd), untilDestroyed(this))
      .subscribe(() => {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  ngOnDestroy() { }

  private createBreadcrumb(url: string, child: ActivatedRoute) {
    // Get the route's URL segment
    const routeURL: string = child.snapshot.url
      .map(segment => segment.path)
      .join('/');

    // Append route URL to URL
    url += `/${routeURL}`;

    // Add breadcrumb
    return {
      label: child.snapshot.data[this.TITLE_PROPERTY],
      params: child.snapshot.params,
      url: url
    } as IBreadcrumb;
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadcrumb[] = []
  ): IBreadcrumb[] {
    // Get the child routes
    const children: ActivatedRoute[] = route.children;

    // Return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // Iterate over each children
    for (const child of children) {
      // Only primary outlet routes
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      const hasTitle = child.snapshot.data.hasOwnProperty(this.TITLE_PROPERTY);
      const hasPath = child.snapshot.url.length > 0;

      if (hasTitle && hasPath) {
        breadcrumbs.push(this.createBreadcrumb(url, child));
      }

      // Recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
