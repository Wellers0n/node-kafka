import { connect, disconnect, cleanData } from './src/mongodb-database-memory'

beforeAll(async () => await connect())

beforeEach(async () => await cleanData())
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterAll(async () => await disconnect())
