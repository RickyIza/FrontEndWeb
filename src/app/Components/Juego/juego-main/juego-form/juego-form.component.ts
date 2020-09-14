import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { JuegoService } from 'src/app/services/juego.service';
import { faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {faDollarSign, faRuler, faPager, faSave, faTimes, faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faTag, faAlignJustify, faGripVertical, faImage, faList,faCalendar} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Juego } from 'src/app/Models/juego';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juego-form',
  templateUrl: './juego-form.component.html',
  styleUrls: ['./juego-form.component.css'],
  providers: [ImageService],
})
export class JuegoFormComponent implements OnInit {
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
  formJuego: FormGroup;
  submitted = false;
  imageUrl = '/assets/img/juego.png';
  fileToUpload: File = null;
  constructor(  
    private imageService: ImageService,
    private juegoService:JuegoService,
    private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
      this.juego = new Juego();
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
    get f(): any {
      return this.formJuego.controls;
    }
    
    public register(): void {
      const user = this.formJuego.value;
      console.log(user);
    }
    onSubmit(): void {
      this.submitted = true;
      if (this.formJuego.invalid) {
        Swal.fire({
          title: 'Error',
          text: 'Error en formulario',
          icon: 'error',
        });
        console.error('Error en formulario');
        return;
      }
      this.imageService
        .postFile(this.juego.titulo, this.fileToUpload)
        .subscribe((data) => {
          this.juego.imagen = data;
          this.juegoService.save(this.juego).subscribe((result) => {
            this.submitted = false;
            this.flagToReload.emit(true);
          });
        });
    }
    onReset(): void {
      this.submitted = false;
      this.formJuego.reset();
      this.imageUrl = '/assets/img/juego.png';
      this.juego = new Juego();
    }
    handleFileInput(file: FileList): void {
      this.fileToUpload = file.item(0);
      // Show image preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    }
    
  }
  