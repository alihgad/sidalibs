import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/authentication';
import { RolesGuard } from './guards/authorization';
import { Reflector } from '@nestjs/core';
import { CryptoModule } from './crypto.module';

@Module({
  imports: [CryptoModule],
  providers: [AuthGuard, RolesGuard, Reflector],
  exports: [AuthGuard, RolesGuard, Reflector, CryptoModule]
})
export class AuthModule {}
