import path from 'path'

const BASE_PATH = path.join(__dirname, 'src', 'db')

const development = {
  client: 'pg',
  connection: 'postgres://chat_live_guard:cl@localhost:5432/chat_live',
  migrations: {
    directory: path.join(BASE_PATH, 'migrations')
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds')
  }
}

export default { development }
export { development }
