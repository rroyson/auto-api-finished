require('dotenv').config()

const express = require('express')
const app = express()
const dal = require('./dal')
const port = process.env.PORT || 5555
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const { pathOr, keys } = require('ramda')
const checkRequiredFields = require('./lib/check-required-fields')

const autoReqFieldCheck = checkRequiredFields([
  'modelYear',
  'make',
  'model',
  'MSRP'
])

const partReqFieldCheck = checkRequiredFields([
  'name',
  'cost',
  'partNo',
  'supplierID'
])

const supplierReqFieldCheck = checkRequiredFields(['name', 'hq'])

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the automobile api.')
})

////READ

app.get('/autos/:id', (req, res, next) =>
  dal.getAuto(req.params.id, callback(res, next))
)

app.get('/parts/:id', (req, res, next) =>
  dal.getPart(req.params.id, callback(res, next))
)

app.get('/suppliers/:id', (req, res, next) => {
  dal.getSupplier(req.params.id, callback(res, next))
})

////UPDATE

app.put('/autos/:id', (req, res, next) => {
  const auto = pathOr(null, ['body'], req)

  const missingFields = autoReqFieldCheck(auto)

  auto && missingFields.length === 0
    ? dal.updateAuto(auto, req.params.id, callback(res, next))
    : next(
        new HTTPError(400, 'Missing fields in request body', {
          fields: missingFields
        })
      )
})

app.put('/parts/:id', (req, res, next) => {
  const part = pathOr(null, ['body'], req)
  const missingFields = partReqFieldCheck(part)

  part && missingFields.length === 0
    ? dal.updatePart(part, req.params.id, callback(res, next))
    : next(
        new HTTPError(400, 'Missing fields in request body', {
          fields: missingFields
        })
      )
})

app.put('/suppliers/:id', (req, res, next) => {
  const supplier = pathOr(null, ['body'], req)
  const missingFields = supplierReqFieldCheck(supplier)

  supplier && missingFields.length === 0
    ? dal.updateSupplier(supplier, req.params.id, callback(res, next))
    : next(
        new HTTPError(400, 'Missing fields in request body', {
          fields: missingFields
        })
      )
})

/////CREATE

app.post('/autos', (req, res, next) => {
  const auto = pathOr(null, ['body'], req)
  const missingFields = autoReqFieldCheck(auto)

  auto && missingFields.length === 0
    ? dal.createAuto(auto, callback(res, next))
    : next(
        new HTTPError(400, 'Missing fields in request body', {
          fields: missingFields
        })
      )
})

app.post('/parts', (req, res, next) => {
  const part = pathOr(null, ['body'], req)
  const missingFields = partReqFieldCheck(part)

  part && missingFields.length === 0
    ? dal.createPart(part, callback(res, next))
    : next(
        new HTTPError(400, 'Missing fields in request body', {
          fields: missingFields
        })
      )
})

app.post('/suppliers', (req, res, next) => {
  const supplier = pathOr(null, ['body'], req)
  const missingFields = supplierReqFieldCheck(supplier)

  supplier && missingFields.length === 0
    ? dal.createSupplier(supplier, callback(res, next))
    : next(
        new HTTPError(400, 'Missing fields in Request body', {
          fields: missingFields
        })
      )
})
/////DELETE

app.delete('/autos/:id', (req, res, next) =>
  dal.deleteAuto(req.params.id, callback(res, next))
)

app.delete('/parts/:id', (req, res, next) =>
  dal.deletePart(req.params.id, callback(res, next))
)

app.delete('/suppliers/:id', (req, res, next) =>
  dal.deleteSupplier(req.params.id, callback(res, next))
)

////LIST

app.get('/autos', function(req, res, next) {
  const limit = Number(pathOr(5, ['query', 'limit'], req))
  const filter = pathOr(null, ['query', 'filter'], req)
  const lastItem = pathOr(null, ['query', 'lastItem'], req)

  dal.listAutos(lastItem, filter, limit, function(err, data) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(data)
  })
})

app.get('/suppliers', (req, res, next) => {
  const limit = Number(pathOr(5, ['query', 'limit'], req))
  const filter = pathOr(null, ['query', 'filter'], req)
  const lastItem = pathOr(null, ['query', 'lastItem'], req)

  dal.listSuppliers(
    lastItem,
    filter,
    limit,
    (err, data) =>
      err
        ? next(new HTTPError(err.status, err.message, err))
        : res.status(200).send(data)
  )
})

app.get('/parts', (req, res, next) => {
  const limit = Number(pathOr(5, ['query', 'limit'], req))
  const filter = pathOr(null, ['query', 'filter'], req)
  const lastItem = pathOr(null, ['query', 'lastItem'], req)

  dal.listParts(
    lastItem,
    filter,
    limit,
    (err, data) =>
      err
        ? next(new HTTPError(err.status, err.message, err))
        : res.status(200).send(data)
  )
})

////////MIDDLEWARE

app.use((err, req, res, next) => {
  console.log(req.method, ' ', req.path, ' ', 'error: ', err)
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => console.log('API is up on', port))

////// HELPERS

const callback = (res, next) => (err, result) =>
  err
    ? next(new HTTPError(err.status, err.message, err))
    : res.status(200).send(result)
