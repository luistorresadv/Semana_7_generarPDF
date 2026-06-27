import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlumnosModule } from './alumnos/alumnos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './alumnos/entities/alumno.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root", 
      database: "api_alumnos", 
      entities: [Alumno],
      synchronize: true, 
    }),
    AlumnosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}