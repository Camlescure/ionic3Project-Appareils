import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {AppareilsService} from "../../../services/appareils.service";
import {Appareil} from "../../../models/appareil";


@Component({
  selector: 'page-appareil-form',
  templateUrl: 'appareil-form.html',
})
export class AppareilFormPage implements OnInit {

  appareilForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public appareilsService: AppareilsService) {
  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.appareilForm = this.formBuilder.group({
      name:['', Validators.required],
      description: this.formBuilder.array([])
    });
  }

  getDescriptionArray(){
    return this.appareilForm.get('description') as FormArray;
  }

  onAddDescription() {
    let newControl = this.formBuilder.control('');
    this.getDescriptionArray().controls.push(newControl);
  }

  onRemoveDescription(index: number) {
    this.getDescriptionArray().removeAt(index);
  }

  onSubmitForm() {
    let newAppareil = new Appareil(this.appareilForm.get('name').value);
    for (let control of this.getDescriptionArray().controls) {
      newAppareil.description.push(control.value);
    }
    this.appareilsService.addAppareil(newAppareil);
    this.navCtrl.pop();
  }
}
