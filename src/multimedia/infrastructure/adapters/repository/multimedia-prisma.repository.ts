import { Injectable } from '@nestjs/common'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { Multimedia } from '@multimedia/domain/multimedia'
import { MultimediaStorage } from '../prisma/multimedia.storage'
import { mapPrismaMultimediaToDomain } from './multimedia.utils'

@Injectable()
export class MultimediaStorageAdapter implements IMultimediaStorageAdapter {
  constructor(private readonly storage: MultimediaStorage) {}

  async create(multimedia: Multimedia): Promise<Multimedia> {
    const created = await this.storage.createMultimedia({
      task: { connect: { id: multimedia.taskId } },
      photoUrl: multimedia.photoUrl,
      videoUrl: multimedia.videoUrl,
      audioTranscription: multimedia.audioTranscription
    })

    return mapPrismaMultimediaToDomain(created)
  }

  async findAll(): Promise<Multimedia[]> {
    const result = await this.storage.getAll()
    return result.map(mapPrismaMultimediaToDomain)
  }

  async findOne(id: number): Promise<Multimedia> {
    const result = await this.storage.getById(id)
    return mapPrismaMultimediaToDomain(result)
  }

  async update(multimedia: Multimedia): Promise<Multimedia> {
    const updated = await this.storage.updateMultimedia(multimedia.id, {
      photoUrl: multimedia.photoUrl,
      videoUrl: multimedia.videoUrl,
      audioTranscription: multimedia.audioTranscription
    })

    return mapPrismaMultimediaToDomain(updated)
  }

  async delete(id: number): Promise<boolean> {
    await this.storage.deleteMultimedia(id)
    return true
  }
}
