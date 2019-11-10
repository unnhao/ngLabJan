import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ReferrerService } from '../referrer.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  constructor(private referrerService: ReferrerService) { }

  validationForm: FormGroup;
  cityDatas = [
    { name: 'Taipei', zip: '100' },
    { name: 'Kaohsiung', zip: '800' },
    { name: 'Keelung', zip: '200' },
    { name: 'Hsinchu', zip: '300' },
    { name: 'Taichung', zip: '400' },
    { name: 'Chiayi', zip: '600' },
    { name: 'Tainan', zip: '700' },
    { name: 'Taipei', zip: '220' },
    { name: 'Taoyuan', zip: '330' },
    { name: 'Hsinchu', zip: '300' },
    { name: 'Miaoli	', zip: '360' },
    { name: 'Taichung', zip: '420' },
    { name: 'Changhua', zip: '500' },
    { name: 'Nantou	', zip: '540' },
    { name: 'Yunlin', zip: '640' },
    { name: 'Chiayi', zip: '600' },
    { name: 'Tainan', zip: '730' },
    { name: 'Kaohsiung', zip: '830' },
    { name: 'Pingtung', zip: '900' },
    { name: 'Yilan', zip: '260' },
    { name: 'Hualien', zip: '970' },
    { name: 'Taitung	', zip: '950' },
    { name: 'Penghu', zip: '880' },
  ];

  ngOnInit() {
    this.validationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, this.ageValidator(50)]),
      email: new FormControl('', Validators.required)
      ,
      city: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      referrer: new FormControl('', {
        asyncValidators: [this.referrerValidator$()],
        updateOn: 'blur'
      })
    });
  }

  // get
  get name() { return this.validationForm.get('name'); }
  get gender() { return this.validationForm.get('gender'); }
  get age() { return this.validationForm.get('age'); }
  get email() { return this.validationForm.get('email'); }
  get city() { return this.validationForm.get('city'); }
  get zip() { return this.validationForm.get('zip'); }
  get referrer() { return this.validationForm.get('referrer'); }

  // customize validator
  ageValidator(age: number): ValidatorFn {
    return (control: AbstractControl) => {
      const ageValid = age < control.value;
      return ageValid ? null : {ageInvalid: control.value} ;
    };
  }

  referrerValidator$() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.referrerService.getReferrer(control.value).pipe(
        map((referrer: any) => (!referrer.length ? { referrerInValid: true } : null)),
        catchError((error): any =>  of({referrerInValid: error.message}))
      );
    };
  }

  submit() {
    this.validationForm.markAllAsTouched();
  }

  reset() {
    this.validationForm.reset();
  }
}
