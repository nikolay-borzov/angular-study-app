import { Injector } from '@angular/core';

export abstract class BasePage {
  // injector is required by @Authorize
  constructor(public injector: Injector) {}
}
