import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Message} from 'primeng/message';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {WebServerService} from '../../service/web.server.service';
import {AddRequestRecipeDTO} from '../../types/AddRequestRecipeDTO';
import {TextareaModule} from 'primeng/textarea';
import {MessageService} from 'primeng/api';
import {ToasterUtility} from '../../utility/ToasterUtility';
import {Toast} from 'primeng/toast';
import {UpdateRequestRecipeDTO} from '../../types/UpdateRequestRecipeDTO';

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
    TextareaModule,
    Toast
  ],
  providers: [MessageService]
})
export class AddRecipePage {
  webServerService : WebServerService = inject(WebServerService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  updateId: string|null = ''

  addRecipeForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    ingredients: new FormControl('',[Validators.required]),
    steps: new FormControl('',[Validators.required]),
    cookingTime: new FormControl(0,[Validators.required, Validators.min(1),]),
    tags: new FormControl('',[Validators.required]),
  });

  ngOnInit(): void {
    if (this.validateUpdateRecipeRoute()){
      this.webServerService.getRecipe(this.updateId ? parseInt(this.updateId) : 0)
        .subscribe(
          value => {
            const cookingTime = parseInt(value.cookingTime.split(" ")[0]);
            this.addRecipeForm = new FormGroup({
              title: new FormControl(value.title,[Validators.required]),
              ingredients: new FormControl(value.ingredients,[Validators.required]),
              steps: new FormControl(value.steps,[Validators.required]),
              cookingTime: new FormControl(cookingTime,[Validators.required, Validators.min(1),]),
              tags: new FormControl(value.tags,[Validators.required]),
            });
          },
          error => {
            ToasterUtility.showError(this.messageService, "Unable to update recipe",
              "Oops! it seems something went wrong, please try again later");
          }
        )
    }
  }

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
    console.log("Testing errors: ",JSON.stringify(this.addRecipeForm.errors));
    if (this.addRecipeForm.valid){
      this.requestError = '';
      console.log(this.addRecipeForm.value.ingredients);

      if (!this.validateUpdateRecipeRoute()){
        this.webServerService.addRecipe(convertFormToDTO(this.addRecipeForm)).subscribe(
          value => {
            console.log(value)
            ToasterUtility.showSuccess(this.messageService, "Success", `${value.title} is successfully added`)

            setTimeout(()=> this.router.navigate(['/']), 1500)
          },
          error => {
            ToasterUtility.showError(this.messageService, "Failed to share recipe",
              error.message
            )

            console.log(error)
          }
        )
      }
      else {
        this.webServerService.updateRecipe(convertFormToUpdateDTO(this.addRecipeForm, this.updateId)).subscribe(
          value => {
            console.log(value)
            ToasterUtility.showSuccess(this.messageService, "Success", value.message)

            setTimeout(()=> this.router.navigate(['/']), 1500)
          },
          error => {
            ToasterUtility.showError(this.messageService, "Failed to share recipe",
              error.message
            )

            console.log(error)
          }
        )
      }

    }

    if (this.addRecipeForm.invalid){
      this.markAllFieldsAsDirty()
      this.requestError = "Enter valid information on all required fields to send a request.";
      setTimeout(()=> this.requestError = '', 2500)
    }
  }


  markAllFieldsAsDirty(){
    this.title?.markAsDirty()
    this.tags?.markAsDirty()
    this.ingredients?.markAsDirty()
    this.cookingTime?.markAsDirty()
    this.steps?.markAsDirty()
  }

  validateUpdateRecipeRoute(): boolean {
    const id =this.route.snapshot.paramMap.get('id');
    this.updateId = id;
    const hasId = id !== null && id.trim() !== '';

    const hasUpdateSegment = this.route.snapshot.url.some(segment => segment.path === 'update-recipe');

    return hasId && hasUpdateSegment;
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
function convertFormToUpdateDTO(form: FormGroup, id : string|null): UpdateRequestRecipeDTO {
  const recipeId = id ? parseInt(id) : 0;

  return {
    id: recipeId,
    title: form.get('title')?.value || '',
    ingredients: form.get('ingredients')?.value || '',
    steps: form.get('steps')?.value || '',
    cookingTime: form.get('cookingTime')?.value || 0,
    tags: form.get('tags')?.value || ''
  };
}

