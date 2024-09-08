import { UploadEvent } from '../ngxf-uploader.model';

export class NgxfUploadError extends Error {
  constructor(
    message: string,
    private state: UploadEvent,
  ) {
    super(message);
  }
}
