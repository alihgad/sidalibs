import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptoHelper } from './crypto.helper';
import { CryptoExporter } from './crypto.exporter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: 'config/.env',
    }),
    ConfigModule
  ],
  providers: [
    CryptoHelper,
    {
      provide: CryptoExporter,
      useFactory: (cryptoHelper: CryptoHelper) => {
        return new CryptoExporter(cryptoHelper);
      },
      inject: [CryptoHelper]
    }
  ],
  exports: [CryptoHelper, CryptoExporter]
})
export class CryptoModule {}