import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 Agregamos ChangeDetectorRef
import { AlumnoServices } from '../../core/services/alumno.services';
import { CommonModule } from '@angular/common';
import { Ialumno } from '../../core/interfaces/ialumno';
import DataTables from 'datatables.net-dt';
import esES from 'datatables.net-plugins/i18n/es-MX.json'
import { Router, RouterModule } from '@angular/router';
import 'datatables.net-buttons'
import 'datatables.net-buttons-dt'
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-alumno.component', 
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css',
})
export class AlumnoComponent implements OnInit {
  private readonly alumnoServicio = inject(AlumnoServices);
  private readonly cdr = inject(ChangeDetectorRef);   
  listaAlumnos: Ialumno[] = [];
  private readonly rutas = inject(Router)
  private tabla_alumnos:any;

  ngOnInit(): void {
    this.cargaLista();
    const fuentes = (pdfFonts as any).vfs !!(pdfFonts as any).pdfmake.vfs;
    (pdfMake as any).vfs=fuentes;
       
  }


  cargaLista() {
    this.alumnoServicio.todos().subscribe({
      next: (alumnos) => {
        this.listaAlumnos = alumnos;
        console.log("Datos cargados en el componente:", this.listaAlumnos)       
        this.cdr.detectChanges(); 
       setTimeout(() => {
          this.inicializador();
        }, 50);

      },
      error: (errores) => {
        alert("Error en la petición: " + errores.message); 
        console.error(errores);
      }
    });
  }
inicializador(){
    if (this.tabla_alumnos){
      this.tabla_alumnos.destroy();
    }
    
    
    this.tabla_alumnos = new DataTables("#tabla_alumnos", {
      paging: true,
      search: true,
      ordering: true,
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50],
      language: {
        search: 'Buscador:',
        lengthMenu: 'Mostrar _MENU_ registros',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ alumnos',
        infoEmpty: 'No hay registros',
        infoFiltered: 'Filtrando _MAX_ de registros',
        paginate: {
          first: '<<',
          previous: '<',
          next: '>',
          last: '>>'
        }
      },
      layout: {
        top5End: {
          buttons: ['copy', 'csv', 'excel', 'pdf', 'print'] // Corregido 'csc' por 'csv'
        }
      }
    });

  }

  imprimirPDF(){
 
    const cuerpoTabla = this.listaAlumnos.map((alumno, index) => [
  index + 1,
  alumno.cedula,
  alumno.nombre,
  alumno.apellido,
  alumno.correo,
  alumno.carrera,
  alumno.nivel
]);
    console.log(cuerpoTabla)
    const documento:any = {
      pageSize:'A4',
      content:[
        {
          text: 'Alumnos',
          style: 'titulo', 
          alignment: 'center', 
          margin: [0, 0, 0, 15], 
        },
        {
          table:{
            headerRows:1,
            widths:['auto','auto','auto','auto','auto','auto','auto'],
            body:[
              [
                {text:'#',style:'cabecera'},
                {text:'Cedula',style:'cabecera'},
                {text:'Nombres',style:'cabecera'},
                {text:'Apellido',style:'cabecera'},
                {text:'correo',style:'cabecera'},
                {text:'Carrera',style:'cabecera'},
                {text:'Nivel',style:'cabecera'},

              ],
              ...cuerpoTabla
            ]
          }
        }
      ],
      styles:{
        titulo:{
          fontSize: 18,
          bold:true,

        },
        cabecera:{
          bold:true,
          fontSize: 12,
          color:'black'
        }
      },
      defaultStyle: { 
        fontSize: 9 
      }
    }

    pdfMake.createPdf(documento).download('tabla_alumnos.pdf')
  }

}