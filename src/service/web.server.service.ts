import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SubPaths} from './SubPaths';
import {AddRequestRecipeDTO} from '../types/AddRequestRecipeDTO';
import {UpdateRequestRecipeDTO} from '../types/UpdateRequestRecipeDTO';
import {RecipeDTO} from '../types/RecipeDTO';
import {GenreResponse} from '../types/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class WebServerService {

  private apiUrl = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  getRecipe(id:number) {
    const url = `${this.apiUrl}${SubPaths.Recipe}`;
    console.log("getRecipe",url)
    return this.httpClient.get<RecipeDTO>(url,
      {
        params: {"recipeId" : id },
      }
    )
  }

  getAllRecipes() {
    const url = `${this.apiUrl}${SubPaths.GetAllRecipe}`;
    console.log("getAllRecipe",url)
    return this.httpClient.get<RecipeDTO[]>(url)
  }

  addRecipe(request: AddRequestRecipeDTO){
    return this.httpClient.post<RecipeDTO>(`${this.apiUrl}${SubPaths.Recipe}`,
      JSON.stringify(request),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  updateRecipe(request: UpdateRequestRecipeDTO){
    return this.httpClient.put<GenreResponse>(`${this.apiUrl}${SubPaths.Recipe}`,
      JSON.stringify(request),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  deleteRecipe(id:number){
    return this.httpClient.delete<GenreResponse>(`${this.apiUrl}${SubPaths.Recipe}`,
      {
        params: {"recipeId" : id },
      }
    );
  }

  searchRecipes(searchWord : string){
    return this.httpClient.get<RecipeDTO[]>(`${this.apiUrl}${SubPaths.SearchRecipe}`,
      {
        params: {"searchWord" : searchWord }
      });
  }
}
