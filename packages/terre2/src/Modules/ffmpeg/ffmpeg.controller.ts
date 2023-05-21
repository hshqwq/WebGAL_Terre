import { Controller, Get } from '@nestjs/common';
import { FFmpegService } from './ffmpeg.service';

@Controller('api/ffmpeg')
export class FFmpegController {
  constructor(private readonly ffmpegService: FFmpegService) {}

  @Get('prepared')
  prepared(): boolean {
    return this.ffmpegService.prepared();
  }

  @Get('availableFormats')
  availableFormats(): Promise<string[]> {
    return this.ffmpegService.availableFormats();
  }
}
