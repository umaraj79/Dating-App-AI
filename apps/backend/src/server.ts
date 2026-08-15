import { createApp } from './app.js'

const port = Number.parseInt(process.env.PORT ?? '3000', 10)

const app = createApp()

app.listen(port, () => {
  console.log(`Dating App backend listening on port ${port}`)
})
