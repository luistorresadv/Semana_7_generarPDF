import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const existe = await this.alumnoRepository.findOne({
      where: { cedula: createAlumnoDto.cedula }
    })

    if (existe) {
      throw new ConflictException("Ya existe un alumno registrado con ese número de cédula")
    }

    const alumno = this.alumnoRepository.create(createAlumnoDto)
    return this.alumnoRepository.save(alumno)
  }


  async findAll(): Promise<Alumno[]> {
  return await this.alumnoRepository.find(); 
}

  async findOne(id: number):Promise<Alumno> {
    const alumno = await this.alumnoRepository.findOne({where:{id}})
    if(!alumno){
      throw new NotFoundException("Alumno no encontrado")
    }
    
    return alumno
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    
    const alumno = await this.findOne(id)
    if(updateAlumnoDto.cedula && updateAlumnoDto.cedula != alumno.cedula)
    {
      const existe = await this.alumnoRepository.findOne({
        where: {cedula: updateAlumnoDto.cedula}
      })
      if (existe){
        throw new ConflictException("Ya existe un alumno registrado")
      }
    }
    Object.assign(alumno, updateAlumnoDto)
    return this.alumnoRepository.save(alumno)

  }

  async remove(id: number):Promise<{message:string}> {
    const alumno = await this.findOne(id)
    await this.alumnoRepository.remove(alumno)
    return {message:"Alumno eliminado con exito"}
  }
}
