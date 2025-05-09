import { Multimedia } from '@multimedia/domain/multimedia'
import { Multimedia as PrismaMultimedia } from '@prisma/client'

const mapPrismaMultimediaToDomain = (data: PrismaMultimedia): Multimedia => {
  return Multimedia.reconstitute({
    id: data.id,
    taskId: data.taskId,
    photoUrl: data.photoUrl,
    videoUrl: data.videoUrl,
    audioTranscription: data.audioTranscription,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  })
}

export { mapPrismaMultimediaToDomain }
