import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ManageGameModule } from './Modules/manage-game/manage-game.module';
import { LspModule } from './Modules/lsp/lsp.module';
import { FFmpegModule } from './Modules/ffmpeg/ffmpeg.module';

@Module({
  imports: [
    // 代码提示
    LspModule,
    ManageGameModule,
    // 静态文件服务：游戏与编辑器静态资源文件
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/',
    }),
    // 静态文件服务：引擎模板
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'assets', 'templates', 'WebGAL_Template'),
      serveRoot: '/Games/:gamename/',
    }),
    // ffmpeg 相关的媒体工具 APIs
    FFmpegModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
