import {Component, inject, signal} from '@angular/core';
import {HeaderComponent} from '../../module/header/header.component';
import {NavComponent} from '../nav/app.nav.component';
import {TimelineModule} from 'primeng/timeline';
import {Card} from 'primeng/card';
import {WebServerService} from '../../service/web.server.service';
import {RecipeDTO} from '../../types/RecipeDTO';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {Dialog} from 'primeng/dialog';
import {ToasterUtility} from '../../utility/ToasterUtility';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import {Toast} from 'primeng/toast';
import {DataView} from 'primeng/dataview';
import {Textarea} from 'primeng/textarea';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  templateUrl: './app.home.component.html',
  styleUrl: './app.home.component.css',
  standalone: true,
  imports: [
    HeaderComponent,
    NavComponent,
    DataView,
    Card,
    Button,
    Dialog,
    CommonModule,
    TimelineModule,
    NgOptimizedImage,
    Toast,
    Textarea,
    InputText,
    Message,
    ReactiveFormsModule
  ],
  providers: [MessageService, Dialog]
})
export class HomePage {
  webServerService : WebServerService = inject(WebServerService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);

  protected recipes = signal<RecipeDTO[]>([]);
  protected isLoading: boolean = false;
  protected dialogModel: {showDialog: boolean, recipe: RecipeDTO} = {
    showDialog : false, recipe : {} as RecipeDTO
  };

  constructor() {
   this.loadRecipes()
  }

  searchRecipeForm = new FormGroup({
    searchWord: new FormControl('',[Validators.required]),
  });

  get searchWord() {
    return this.searchRecipeForm.get('searchWord');
  }

  submitSearch(){
    this.searchWord?.markAsDirty()

    this.webServerService.searchRecipes(this.searchWord?.value ?? "").subscribe(
      value => {
        this.recipes.set(value);
      },
      error => {
        console.log(error);
        ToasterUtility.showError(this.messageService, "Search failed" ,"Failed to get search results")
      },
    )
  }

  private loadRecipes() {
    this.isLoading = true;
    this.webServerService.getAllRecipes().subscribe(
      value => {
        console.log(value)
        this.recipes.set(value);
      },
      error => {
        console.log(error);
      },
      () => this.isLoading = false
    )
  }

  updateRecipePage(recipeId : string) {
    console.log("updating recipe page: ", recipeId);
    this.router.navigate(['/update-recipe', recipeId]);
  }

  deleteRecipeDialog(recipe : RecipeDTO) {
    this.dialogModel.showDialog = true;
    this.dialogModel.recipe = recipe;
    console.log('deleteRecipeDialog: arg', recipe);
    console.log('deleteRecipeDialog: value', this.dialogModel.recipe);
  }

  deleteRecipe(){
    console.log('deleteRecipe: model values', this.dialogModel.recipe);
    this.dialogModel.showDialog = false;
    this.webServerService.deleteRecipe(parseInt(this.dialogModel.recipe.id)).subscribe(
      value => {
        ToasterUtility.showSuccess(this.messageService, "Deleted" ,value.message)
      },
      error => {
        ToasterUtility.showSuccess(this.messageService, "Failed to delete" ,error.message)
      },
      () => {
        this.loadRecipes();
        this.isLoading = false
      }
    )
  }

}

