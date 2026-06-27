import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { variables_ambiente } from '../../environments/environment.developer';
import { Observable } from 'rxjs';
import { Ialumno } from '../interfaces/ialumno';
@Injectable({
    providedIn:'root',
})
export class AlumnoServices {
    private readonly http = inject(HttpClient)
    apiurl=variables_ambiente.apiBaseUrl
    todos():Observable<Ialumno[]>{        
        return this.http.get<Ialumno[]>(`${this.apiurl}/alumnos`);
    }
uno(id:number):Observable<Ialumno>{
    return this.http.get<Ialumno>('$(this.apiurl)/alumnos/&{id}')
}
nuevo(alumno:Ialumno):Observable<Ialumno>{
    return this.http.post<Ialumno>('$(this.apiurl)/alumnos',alumno)
}
actualizar(id:number,alumno:Ialumno):Observable<Ialumno>{
    return this.http.patch<Ialumno>('$(this.apiurl)/alumnos/&{id}',alumno)
}
eliminar(id:number):Observable<string>{
    return this.http.delete<string>('$(this.apiurl)/alumnos/&{id}')
}
}
