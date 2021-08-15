import supertest from 'supertest'

export const request = supertest(`http://${process.env.HOST}:${process.env.PORT}`)
