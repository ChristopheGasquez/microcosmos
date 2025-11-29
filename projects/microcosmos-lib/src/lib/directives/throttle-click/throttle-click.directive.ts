import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  type OnChanges,
  type OnDestroy,
  Output,
  type SimpleChanges,
} from '@angular/core';
import { Subject, Subscription, tap, throttleTime } from 'rxjs';

@Directive({
  selector: '[mcsThrottleClick]',
  standalone: true,
})
export class ThrottleClickDirective implements OnChanges, OnDestroy {
  #click$: Subject<Event> = new Subject<Event>();
  #subscription?: Subscription;

  @Input() mcsThrottleClickDelay: number = 500;

  @Output() mcsThrottleClick: EventEmitter<Event> = new EventEmitter<Event>();

  @HostListener('click', [ '$event' ])
  onClick(event: Event): void {
    this.#click$.next(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.#setupStream();
  }

  #setupStream(): void {
    this.#subscription?.unsubscribe();

    this.#subscription = this.#click$
      .pipe(
        throttleTime(this.mcsThrottleClickDelay),
        tap((event: Event) => this.mcsThrottleClick.emit(event)),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#subscription?.unsubscribe();
  }
}
