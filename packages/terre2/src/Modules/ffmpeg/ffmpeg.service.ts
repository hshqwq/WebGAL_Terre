import { Injectable } from '@nestjs/common';
import type { FfmpegCommandOptions } from 'fluent-ffmpeg';
import ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class FFmpegService {
  command = ffmpeg();

  // constructor() {
  //   this.ffmpeg = new FfmpegCommand();
  // }

  reset(options?: FfmpegCommandOptions) {
    this.command.kill('Command will reset');
    this.command = ffmpeg(options);
  }

  prepared(): boolean {
    return !!this.command;
  }

  availableFormats(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.command.getAvailableFormats((err, formats) => {
        if (err) return reject(err);
        resolve(
          Object.keys(formats).map((key) => {
            const { canDemux, canMux } = formats[key];

            return canDemux && canMux ? '.' + key : void 0;
          }),
        );
      });
    });
  }
}
