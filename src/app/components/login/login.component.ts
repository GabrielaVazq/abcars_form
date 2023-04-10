import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SandboxService } from 'src/app/shared/services/sandbox.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  codigVIN: string;
  data: any;
  constructor(private router: Router, private sandboxService: SandboxService) {}

  ngOnInit(): void {}

  ingresar() {
    this.sandboxService.getAbcars(this.codigVIN).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.removeItem('data');
        const newVin = res.vehicle;
        if(newVin){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'VIN correcto',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem('data', JSON.stringify(newVin[0]));
              this.router.navigateByUrl('/dashboard');
            }
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: res.message,
          });
        }
       
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'erro en peticion',
        });
      },
    });
  }
}
