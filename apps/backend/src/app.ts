import express from 'express'

export const createApp = () => {
  const app = express()
  app.use(express.json())

  app.get('/api/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'dating-app-backend',
    })
  })

  return app
}
