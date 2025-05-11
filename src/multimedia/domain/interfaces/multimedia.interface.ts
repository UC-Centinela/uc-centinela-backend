import { Multimedia } from '../multimedia'

export interface CreateMultimediaDTO {
  taskId: number;
  photoUrl?: string;
  videoUrl?: string;
  audioTranscription?: string;
}

export interface UpdateMultimediaDTO {
  id: number;
  updateMultimedia: Partial<CreateMultimediaDTO>;
}

export interface IMultimediaService {
  create(dto: CreateMultimediaDTO): Promise<Multimedia>;
  findAll(): Promise<Multimedia[]>;
  findOne(id: number): Promise<Multimedia>;
  update(dto: UpdateMultimediaDTO): Promise<Multimedia>;
  delete(id: number): Promise<boolean>;
}
