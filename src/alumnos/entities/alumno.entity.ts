import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; 
@Entity({ name: 'api_alumnos' })
export class Alumno {
  @PrimaryGeneratedColumn()
  id!:number;
  @Column({ type: 'varchar', length: 10, unique: true })
  cedula!: string;

  @Column({ type: 'varchar', length: 50 })
  nombre!: string;

  @Column({ type: 'varchar', length: 50 })
  apellido!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  correo!: string; 

  @Column({ type: 'varchar', length: 15, nullable: true })
  telefono!: string; 

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento!: Date;

  @Column({ type: 'varchar', length: 50 })
  carrera!: string; 

  @Column({ type: 'int' })
  nivel!: number; 

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

}