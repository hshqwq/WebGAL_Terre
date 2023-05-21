import { Module } from '@nestjs/common';
import { FFmpegController } from './ffmpeg.controller';
import { FFmpegService } from './ffmpeg.service';

@Module({
  controllers: [FFmpegController],
  providers: [FFmpegService],
  exports: [FFmpegService],
})
export class FFmpegModule {}
