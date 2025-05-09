import { Injectable } from '@nestjs/common'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { UpdateMultimediaDTO } from '@multimedia/domain/interfaces/multimedia.interface'
import { Multimedia } from '@multimedia/domain/multimedia'

@Injectable()
export class UpdateMultimediaUseCase {
  constructor(private readonly storage: IMultimediaStorageAdapter) {}

  execute(dto: UpdateMultimediaDTO): Promise<Multimedia> {
    const multimedia = Multimedia.reconstitute({ id: dto.id, ...dto.updateMultimedia } as any)
    return this.storage.update(multimedia)
  }
}
