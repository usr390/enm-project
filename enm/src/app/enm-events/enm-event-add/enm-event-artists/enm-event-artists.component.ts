import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enm-event-artists',
  templateUrl: './enm-event-artists.component.html',
  styleUrls: ['./enm-event-artists.component.less']
})
export class EnmEventArtistsComponent {
  
  @ViewChildren('artistInput') artistInputs!: QueryList<ElementRef>;

  artistsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.artistsForm = this.fb.group({ artists: this.fb.array([ this.createArtistInputField() ]) });
  }
  
  get artistsArray() { return this.artistsForm.get('artists') as FormArray; }

  canAddArtistInputField() {
    //#region summary
      /* returns true when:
        - less than 50 input fields
        - the previous input field has been filled
      */
    //#endregion
    const previousArtistInputField = this.artistsArray.controls[this.artistsArray.controls.length - 1];
    return this.artistsArray.controls.length < 50 && previousArtistInputField.value.artist;
  }
  addArtistInputField() {
    this.artistsArray.push(this.createArtistInputField());
    setTimeout(() => this.artistInputs.last.nativeElement.focus(), 0);
  }
  createArtistInputField() { return this.fb.group({ artist: ['', Validators.required] }); }
  deleteArtistInputField(index: number) {
    this.artistsArray.removeAt(index);
  }
  

  cancelForm() { this.router.navigate(['/']); }
  goBack(): void { this.router.navigate(['/add-event/price']); }
  onSubmit(): void { if (this.artistsForm.valid) console.log(this.artistsForm.value); }

}
