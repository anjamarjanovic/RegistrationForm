import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  formControls: any;
  public registrationForm: FormGroup = this.fb.group({});
  readonly AVAILABLE_INPUT_TYPES = [
    'text',
    'password',
    'email',
    'number',
    'search',
    'tel',
    'url',
    'date'
  ];

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.http.get('/assets/form-json.json').subscribe((res: any) => {
      this.formControls = res.controls;
      //console.log(this.formControls);
      this.createForm();
    });
  }

  createForm() {
    let validatorsArray: any[] = [];
    this.formControls.forEach((control: any) => {
      Object.keys(control.validators).forEach((validatorKey) => {
        if (validatorKey === 'required') {
          validatorsArray.push(Validators.required);
        } else if (validatorKey === 'minLength') {
          validatorsArray.push(
            Validators.minLength(control.validators[validatorKey])
          );
        } else if (validatorKey === 'maxLength') {
          validatorsArray.push(
            Validators.maxLength(control.validators[validatorKey])
          );
        } else if (validatorKey === 'email') {
          validatorsArray.push(
            Validators.email)

        }
      });
      this.registrationForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsArray)
      );
    });

  }
  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
