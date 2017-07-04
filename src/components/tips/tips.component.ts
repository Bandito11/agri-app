import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TipsProvider } from './../../providers/tips.provider';
import { Tip } from './../../types';
/**
/**
 * Generated class for the TipsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tips-component',
  templateUrl: 'tips.component.html'
})
export class TipsComponent implements OnInit, OnChanges {
  @Input() phase: string;
  @Input() zodiacName: string;
  @Input() zodiacImage: string;
  tips: Tip[] = [];
  errorMessage;
  constructor(private tipService: TipsProvider) { }

  ngOnInit() {
    this.getTips({ zodiac: this.zodiacName, phase: this.phase });
  }

  ngOnChanges(changes) {
    this.getTips({ zodiac: this.zodiacName, phase: this.phase });
  }

  /**Returns the current crops  */
  getTips(data: { zodiac: string, phase: string }) {
    if(data.phase){ 
    this.tipService.getTips({ zodiac: data.zodiac, phase: data.phase })
      .subscribe(api => this.tips = api.data,
      error => this.errorMessage = <any>error);
  }
  }
}
