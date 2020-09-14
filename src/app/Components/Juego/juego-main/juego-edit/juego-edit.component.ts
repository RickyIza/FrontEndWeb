import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { JuegoService } from 'src/app/services/juego.service';
import { faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {faDollarSign, faRuler, faPager, faSave, faTimes, faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faTag, faAlignJustify, faGripVertical, faImage, faList,faCalendar} from '@fortawesome/free-solid-svg-icons';
import { Juego } from 'src/app/Models/juego';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juego-edit',
  templateUrl: './juego-edit.component.html',
  styleUrls: ['./juego-edit.component.css'],
  providers: [ImageService],
})
export class JuegoEditComponent implements OnInit {
  faUserPlus = faUserPlus;
  faCalendar =faCalendar;
  faListAlt = faListAlt;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  aPlus = faPlus;
  faTimes = faTimes;
  faSave = faSave;
  faIdCard = faIdCard;
  faTag = faTag;
  faAlignJustify = faAlignJustify;
  faGripVertical = faGripVertical;
  faImage = faImage;
  faDollarSign = faDollarSign;
  faRuler = faRuler;
  faPager = faPager;
  faCartPlus = faCartPlus;
  faList = faList;
  image: Variable;
  caption: Variable;
  @Input() juego: Juego;
  @Input() title: string;
  @Output() flagToReload = new EventEmitter<boolean>();

  public formJuego: FormGroup;
  submitted = false;
  imageUrl = '/assets/img/juego.png';
  fileToUpload: File = null;
  base64data: string;
  imageToShow: any = '/assets/img/juego.png';
  cambio = false;
  lastImagen: string;


  constructor(    
    private imageService: ImageService,
    private juegoService:JuegoService,
    private formBuilder: FormBuilder,

    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,

    ) 
    {
    
   }

   ngOnInit(): void {
    this.juego = new Juego();
    this.getProductFromService();
    this.formJuego = this.formBuilder.group({
      titulo: [''],
      precio: [''],
      plataforma: [''],
      estado: [''],
      fecha_lanzamiento: [''],
      genero: [''],
      idioma: [''],
      imagen: ['']
    });

  }
  public register(): void {
    const user = this.formJuego.value;
    console.log(user);
  }
  onSubmit(image): void {
    this.submitted = true;
    if (this.formJuego.invalid) {
      console.error('Error en formulario');
      Swal
        .fire({
          title: 'Error en el formulario',
          text: 'El formulario debe contener todos los datos',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        })
        .then((result) => {
          if (result.value) {
            return;
          }
        });
      return;
    }
    console.log(this.juego);
    // Si la Imagen Cambió
    if (this.cambio) {
      console.log(this.cambio);
      console.log(this.lastImagen);
      // Elimino el archivo
      this.imageService.deleteFile(this.lastImagen).subscribe(
        (data) => {
          // Subo la imagen
          this.imageService
            .postFile(this.juego.titulo, this.fileToUpload)
            .subscribe((data2) => {
              this.juego.imagen = data2;
              console.log(data2);
              // Actualizo el producto
              this.juegoService.update(this.juego).subscribe((result) => {
                this.submitted = false;
                console.log(result);
                this.flagToReload.emit(true);
              });
            });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log(this.cambio);
      // Actualizo el producto
      this.juegoService.update(this.juego).subscribe((result) => {
        this.submitted = false;
        console.log(result);
        this.flagToReload.emit(true);
      });
    }
  }
  onReset(): void {
    this.submitted = false;
    this.formJuego.reset();
    this.juego = new Juego();
  }
  handleFileInput(file: FileList): void {
    this.fileToUpload = file.item(0);
    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageToShow = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    this.cambio = true;
  }

  // Obtiene el producto segun la id
  getProductFromService(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.juego = new Juego();
        if (params['id']) {
          this.juegoService.retrieve(params['id']).subscribe((result) => {
            (this.juego = result), this.getImageFromService();
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Obtiene la imagen respecto a ese producto
  getImageFromService(): void {
    this.imageService.getProfileImage(this.juego.imagen).subscribe(
      (data: any) => {
        const objectURL = 'data:image/jpeg;base64,' + data;
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        // Guarda el nombre de la imagen anterior si hay cambio
        this.lastImagen = this.juego.imagen;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

