const mysql = require('mysql')
const HTTPError = require('node-http-error')
const dalHelper = require('./lib/dal-helper')
const { assoc, prop, compose, omit } = require('ramda')

////CREATE

const createAuto = (auto, cb) =>
  dalHelper.create('auto', auto, autoFormatter, cb)

const createPart = (part, cb) =>
  dalHelper.create('part', part, partFormatter, cb)

const createSupplier = (supplier, cb) =>
  dalHelper.create('supplier', supplier, supplierFormatter, cb)

////READ

const getAuto = (id, cb) => dalHelper.read('auto', 'ID', id, autoFormatter, cb)

const getPart = (id, cb) => dalHelper.read('part', 'ID', id, partFormatter, cb)

const getSupplier = (id, cb) =>
  dalHelper.read('supplier', 'ID', id, supplierFormatter, cb)

////UPDATE
const updateAuto = (auto, id, cb) =>
  dalHelper.update('auto', auto, 'ID', Number(id), cb)

const updatePart = (part, id, cb) =>
  dalHelper.update('part', part, 'ID', Number(id), cb)

const updateSupplier = (supplier, id, cb) =>
  dalHelper.update('supplier', supplier, 'ID', Number(id), cb)

////DELETE

const deleteAuto = (id, cb) => dalHelper.deleteRow('auto', 'ID', id, cb)

const deletePart = (id, cb) => dalHelper.deleteRow('part', 'ID', id, cb)

const deleteSupplier = (id, cb) => dalHelper.deleteRow('supplier', 'ID', id, cb)

////LIST

const listAutos = (lastItem, filter, limit, cb) => {
  dalHelper.queryDB(
    'auto',
    lastItem,
    filter,
    limit,
    autoFormatter,
    'ID',
    function(err, data) {
      err ? cb(err) : cb(null, data)
    }
  )
}

const listSuppliers = (lastItem, filter, limit, cb) => {
  dalHelper.queryDB(
    'supplier',
    lastItem,
    filter,
    limit,
    supplier => supplier,
    'ID',
    (err, data) => (err ? cb(err) : cb(null, data))
  )
}

const listParts = (lastItem, filter, limit, cb) => {
  dalHelper.queryDB(
    'part',
    lastItem,
    filter,
    limit,
    part => part,
    'ID',
    (err, data) => (err ? cb(err) : cb(null, data))
  )
}

const autoFormatter = a => a

const partFormatter = p => p

const supplierFormatter = v => v

const dal = {
  getAuto,
  updateAuto,
  deleteAuto,
  createAuto,
  listAutos,
  getPart,
  deletePart,
  createPart,
  listParts,
  updatePart,
  listSuppliers,
  createSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier
}

module.exports = dal
