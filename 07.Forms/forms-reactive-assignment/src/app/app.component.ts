import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatusList = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.forbiddenProjectName),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null)
    });
  }

  onSubmit() {
    console.log("projectForm => ", this.projectForm.value);
  }

  /* Validators */

  forbiddenProjectName(control: FormControl): Promise<any> | Observable<any> {
    const forbiddenNames = ['Test']
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (forbiddenNames.indexOf(control.value) !== -1) {
          resolve({ 'projectNameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 800);
    });
    return promise;
  }

  /* FormControl Getters */
  get projectName(): FormControl {
    return this.projectForm.get('projectName') as FormControl;
  }

  get email(): FormControl {
    return this.projectForm.get('email') as FormControl;
  }

  get projectStatus(): FormControl {
    return this.projectForm.get('projectStatus') as FormControl;
  }

}
