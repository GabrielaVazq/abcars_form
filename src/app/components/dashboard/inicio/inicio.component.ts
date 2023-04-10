import { Component, Input, OnInit } from '@angular/core';
import { SandboxService } from 'src/app/shared/services/sandbox.service';
import { LoginComponent } from '../../login/login.component';
import { Observable } from 'rxjs';
import { Result } from '../../shared/models/result';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  id: string;
  nombre: string;
  vin: string ;
  comnetario: string ;
  category: string ;

  selectedFiles: FileList ;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  file: any;
  result: Result= new Result();

  @Input() data: LoginComponent | undefined;
  constructor(private sandboxService: SandboxService) {
    const data = JSON.parse(localStorage.getItem('data') || '{}');
    console.log(data);
    this.id = data.id;
    this.nombre = data.name;
    this.vin = data.vin;
    this.category = data.category;
  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.file = event.target.files[0];

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
  onGuardarCambios(): void {
    const data = new FormData();
    data.append('vehicle_id', this.id);
    data.append('category',"motor");
    data.append('comment', this.comnetario);
    data.append('path',this.file );

    this.sandboxService.postAbcars(data).subscribe({
      next: (res:any) => {
        this.result = res;

        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}
}
