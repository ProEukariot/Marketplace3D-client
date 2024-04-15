import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Model3d } from '../models/model3d';
import { FileMetaDto } from '../dto/file-meta.dto';
import { Router, UrlSerializer } from '@angular/router';
import { ParseUrlService } from './parse-api-url.service';

export type CreateModel3dDto = {
  name: string;
  amount: number;
};

@Injectable({
  providedIn: 'root',
})
export class Model3dService {
  private apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly urlService: ParseUrlService
  ) {}

  upload3dModel(formData: FormData) {
    return this.http.post(this.urlService.apiUrl(['models', 'add']), formData);
  }

  get3dModel(id: string) {
    return this.http.get<Model3d>(this.urlService.apiUrl(['models', id]));
  }

  get3dModels(cursor?: string) {
    const limit = 4;

    return this.http.get<Model3d[]>(
      this.urlService.apiUrl(['models'], {
        queryParams: { cursor: cursor ? btoa(cursor) : undefined, limit },
      })
    );
  }

  getSubscribed3dModels(cursor?: string) {
    const limit = 4;

    return this.http.get<Model3d[]>(
      this.urlService.apiUrl(['models', 'subscribed-models'], {
        queryParams: { cursor: cursor ? btoa(cursor) : undefined, limit },
      })
    );
  }

  getFileUrl(id: string) {
    
  }

  //////////

  createModel3d(model3dDto: CreateModel3dDto) {
    return this.http.post<{ insertedId: string }>(
      `${this.apiUrl}models/upload`,
      model3dDto
    );
  }

  createFiles(formData: FormData) {
    return this.http.post<{ insertedIds: string[] }>(
      `${this.apiUrl}models/upload/files`,
      formData
    );
  }

  loadUsersModels3d(page: number) {
    return this.http.get<Model3d[]>(`${this.apiUrl}models/my/${page}`);
  }

  getAvailableExtOf(model3dId: string) {
    return this.http.get<FileMetaDto[]>(
      `${this.apiUrl}models/${model3dId}/files`
    );
  }

  getFileMeta(model3dId: string, fileExt: string) {
    const file = this.http.get<FileMetaDto>(
      `${this.apiUrl}models/download/${model3dId}/file-meta/${fileExt}`
    );

    return file;
  }

  downloadFile(model3dId: string, fileExt: string) {
    const file = this.http.get(
      `${this.apiUrl}models/download/${model3dId}/file/${fileExt}`,
      { responseType: 'blob' }
    );

    return file;
  }
}
