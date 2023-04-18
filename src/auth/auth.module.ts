import { UsersModule } from './../users/users.module';
import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
