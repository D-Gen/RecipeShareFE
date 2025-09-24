import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Message} from 'primeng/message';
import {RouterLink} from '@angular/router';
import {WebServerService} from '../../service/web.server.service';
import {AddRequestRecipeDTO} from '../../types/AddRequestRecipeDTO';
import {TextareaModule} from 'primeng/textarea';

@Component({
  templateUrl: './app.addrecipe.component.html',
  styleUrl: './app.addrecipe.component.css',
  standalone: true,
  imports: [
    Button,
    InputText,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgIf,
    Message,
    RouterLink,
    TextareaModule
  ],
})
export class AddRecipePage {
  webServerService : WebServerService = inject(WebServerService);

  addRecipeForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    ingredients: new FormControl('',[Validators.required]),
    steps: new FormControl('',[Validators.required]),
    cookingTime: new FormControl(null,[Validators.required, Validators.min(1),]),
    tags: new FormControl('',[Validators.required]),
  });

  get title() {
    return this.addRecipeForm.get('title');
  }
  get ingredients() {
    return this.addRecipeForm.get('ingredients');
  }
  get steps() {
    return this.addRecipeForm.get('steps');
  }

  get cookingTime() {
    return this.addRecipeForm.get('cookingTime');
  }

  get tags() {
    return this.addRecipeForm.get('tags');
  }

  requestError = '';
  submitRequest(){
    console.log("Testing errors: ",JSON.stringify(this.title?.errors));
    if (this.addRecipeForm.valid){
      this.requestError = '';
      console.log(this.addRecipeForm.value.ingredients);
      this.webServerService.addRecipe(convertFormToDTO(this.addRecipeForm)).subscribe(
        value => {
          console.log(value)
        },
        error => {
          console.log(error)
        }
      )
    }

    if (this.addRecipeForm.invalid){
      this.requestError = "Enter valid information on all required fields to send a request.";
      setTimeout(()=> this.requestError = '', 2500)
    }
  }
}

function convertFormToDTO(form: FormGroup): AddRequestRecipeDTO {
  return {
    title: form.get('title')?.value || '',
    ingredients: form.get('ingredients')?.value || '',
    steps: form.get('steps')?.value || '',
    cookingTime: form.get('cookingTime')?.value || 0,
    tags: form.get('tags')?.value || ''
  };
}

