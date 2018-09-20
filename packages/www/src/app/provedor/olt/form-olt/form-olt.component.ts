import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { OltService } from '../../../core/services/olt/olt.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-olt',
  templateUrl: './form-olt.component.html',
  styleUrls: ['./form-olt.component.scss']
})
export class FormOltComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  formFunction: 'creating' | 'updating' = 'creating';

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private oltService: OltService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ip: [null, Validators.required],
      nome: [null, Validators.required],
      obs: [null],
    });

    this.route.data.subscribe(
      ({ olt }) => {
        if (olt) {
          this.formFunction = 'updating';

          this.form.addControl('_id', new FormControl(null, Validators.required));
          this.form.patchValue(olt);
        }
      }
    );
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('O formulário é inválido! Verifique os dados digitados', 'Ok');
    }

    if (this.formFunction === 'creating') {

      this.oltService.create(this.form.value)
        .subscribe(
          (created) => {
            this.snackbar.open(`OLT ${created._id} - ${created.nome} criada!`, 'Ok', { duration: 2000 });
            this.location.back();
          }
        );
    } else {
      const { _id, ...input } = this.form.value;

      this.oltService.updateOlt(_id, input)
        .subscribe(
          () => {
            this.snackbar.open(`OLT alterada com sucesso!`, 'Ok', {duration: 4000});
            this.location.back();
          }
        );
    }
  }

}
