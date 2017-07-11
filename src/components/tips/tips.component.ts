import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class TipsComponent implements OnChanges {
  @Input() phase: string;
  @Input() zodiacName: string;
  @Input() zodiacImage: string;
  @Input() token: string;
  private tips: Tip[] = [];
  private errorMessage;
  /**
     * Temporary token to be used on ngOnChanges
     * 
     * @private
     * @type {string}
     * @memberof TipsComponent
     */
  private tempToken: string;
  /**
   * Temporary token to be used on ngOnChanges
   * 
   * @private
   * @type {string}
   * @memberof TipsComponent
   */
  private tempzodiacName: string;
  /**
   * Temporary token to be used on ngOnChanges
   * 
   * @private
   * @type {string}
   * @memberof TipsComponent
   */
  private tempPhase: string;
  constructor(private tipService: TipsProvider) { }


  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName == 'zodiacName') {
        this.tempzodiacName = changes[propName].currentValue;
      }
      if (propName == 'phase') {
        this.tempPhase = changes[propName].currentValue;
      }
      if (propName == 'token') {
        this.tempToken = changes[propName].currentValue;
      }
    }
    if (this.tempzodiacName && this.tempToken && this.tempPhase) {
      try {
        this.getTips({ zodiac: this.tempzodiacName, phase: this.tempPhase, token: this.tempToken });
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**Returns the current crops  */
  getTips(data: { zodiac: string, phase: string, token: string }) {
    this.tipService.getTips({ tips: { zodiac: data.zodiac, phase: data.phase }, token: data.token })
      .subscribe(api => {
        try {
          this.tips = api.data;
        } catch (error) {
          this.errorMessage = api.error;
        }
      },
      msg => this.errorMessage = msg.error);
  }
}
