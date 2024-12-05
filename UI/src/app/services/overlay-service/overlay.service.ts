import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { QueryOverlayComponent } from '../../overlays/query-overlay/query-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private overlay: Overlay) {}

  queryOverlay() {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      panelClass: 'overlay-panel',
    });

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });

    const injector = Injector.create({
      providers: [{ provide: OverlayRef, useValue: overlayRef }],
    });

    const queryOverlayRef = new ComponentPortal(QueryOverlayComponent,null,injector);
    overlayRef.attach(queryOverlayRef);
  }
}
