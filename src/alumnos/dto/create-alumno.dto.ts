import { IsString, IsEmail, IsNotEmpty, IsOptional, IsInt, Min, Max, Length } from 'class-validator';

export class CreateAlumnoDto {

    @IsString()
    @Length(10,10)
    cedula!:string

    @IsString()
    @Length(50)
    nombre!: string;
    
    @IsString()
    @Length(50)
    apellido!: string;
    
    @IsString()
    @Length(100)  
    correo!: string; 
    
    @IsString()
    @Length(15)
    telefono!: string; 
    
    @IsString()
    @IsOptional()
    fecha_nacimiento?: string; 
    
    @IsString()
    @Length(50)
    carrera!: string; 
    
    @IsInt({ message: 'El nivel debe ser un número entero' })
    @Min(1, { message: 'El nivel mínimo es 1' })
    @Max(10, { message: 'El nivel máximo es 10' })
    nivel!: number; 
    
     

}
