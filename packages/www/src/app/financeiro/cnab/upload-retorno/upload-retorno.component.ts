import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RetornoService } from '../../../core/services/retorno/retorno.service';

@Component({
  selector: 'app-upload-retorno',
  templateUrl: './upload-retorno.component.html',
  styleUrls: ['./upload-retorno.component.scss']
})
export class UploadRetornoComponent implements OnInit {
  contasBancarias;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private retornoSvc: RetornoService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      contaBancaria: new FormControl(null),
      file: new FormControl(null),
    });

    this.route.data.subscribe(
      data => {
        this.contasBancarias = data.contasBancarias;
      }
    );
  }

  onFormSubmit(file: FileList) {
    this.retornoSvc.uploadRetorno(file[0])
      .subscribe(res => console.log(res));
  }

}
