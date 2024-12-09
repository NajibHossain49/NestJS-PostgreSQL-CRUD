import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Admin',
      database: 'nestjs_crud',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true,     // Automatically sync schema (turn off in production)
    }),
    UsersModule,
  ],
})
export class AppModule {}
