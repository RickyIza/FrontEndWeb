import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
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
  selector: 'app-juego-card',
  templateUrl: './juego-card.component.html',
  styleUrls: ['./juego-card.component.css'],
  providers: [ImageService],
})
export class JuegoCardComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this.getProductFromService();
  }
  // Obtiene el producto segun la id
  getProductFromService(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.juego = new Juego();
      if (params['id']) {
        this.juegoService.retrieve(params['id']).subscribe((result) => {
          (this.juego = result), this.getImageFromService();
        });
      }
    });
  }
  // Obtien la imagen respecto a ese producto
  getImageFromService(): void {
    this.imageService.getProfileImage(this.juego.imagen).subscribe(
      (data: any) => {
        const objectURL = 'data:image/jpeg;base64,' + data;
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
