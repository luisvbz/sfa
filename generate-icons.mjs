import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const publicDir = path.join(process.cwd(), 'public')
const inputPath = path.join(publicDir, 'logo.png')

async function run() {
  if (!fs.existsSync(inputPath)) {
    console.error('No se encontró logo.png en public/')
    return
  }

  try {
    await sharp(inputPath)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'icon-512x512.png'))
      
    await sharp(inputPath)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'icon-192x192.png'))
      
    await sharp(inputPath)
      .resize(64, 64, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFormat('png')
      .toFile(path.join(publicDir, 'favicon.ico'))
    
    console.log('Iconos 192, 512 y favicon generados exitosamente de logo.png')
  } catch(e) {
    console.error(e)
  }
}

run()
