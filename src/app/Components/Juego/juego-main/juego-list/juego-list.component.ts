import { Component, OnInit } from '@angular/core';
import { faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { Juego } from 'src/app/Models/juego';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-juego-list',
  templateUrl: './juego-list.component.html',
  styleUrls: ['./juego-list.component.css']
})
export class JuegoListComponent implements OnInit {
  faUserPlus = faUserPlus;
  faListAlt = faListAlt;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  juegos: Juego[];


  constructor(private juegosService: JuegoService) { }

  ngOnInit() {
    this.list();
  }

  list() : void{
    this.juegosService.list().subscribe(result => {
      this.juegos = result;
    });
  }

  delete(u : Juego) : void{
    swal.fire({
      title: '¿Estas seguro que desea continuar?',
      text: "El registro de " + u.titulo + " " + u.plataforma + " será eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) =>{
      if(result.value){
        this.juegosService.delete(u).subscribe(
          result => {console.log(result)
          this.list();
        }
        ) 
      }
    })
  }

}
