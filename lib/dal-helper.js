require('dotenv').config()
const HTTPError = require('node-http-error')
const { propOr, assoc, split, head, last, map, omit } = require('ramda')
const mysql = require('mysql')

//////////////////////////////
///  HELPERS
//////////////////////////////

function createConnection() {
  return mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })
}

const create = (tableName, data, formatter, callback) => {
  if (data) {
    const connection = createConnection()

    const sql = `INSERT INTO ${connection.escapeId(tableName)} SET ? `
    connection.query(sql, formatter(data), (err, result) => {
      if (err) return callback(err)

      propOr(null, 'insertId', result)
        ? callback(null, { ok: true, id: result.insertId })
        : callback(null, { ok: false, id: null })
    })

    connection.end(err => callback(err))
  }
}

const read = (tableName, columnName, id, formatter, callback) => {
  if (id && tableName) {
    const connection = createConnection()

    connection.query(
      'SELECT * FROM ' +
        connection.escapeId(tableName) +
        ' WHERE ' +
        connection.escapeId(columnName) +
        ' = ? ',
      [id],
      function(err, result) {
        if (err) return callback(err)
        if (propOr(0, 'length', result) > 0) {
          const formattedResult = formatter(head(result))
          console.log('Formatted Result: ', formattedResult)
          return callback(null, formattedResult)
        } else {
          //send back a 404

          return callback(
            new HTTPError(404, 'missing', {
              name: 'not_found',
              error: 'not found',
              reason: 'missing'
            })
          )
        }
      }
    )
  }
}

const update = (tableName, data, columnName, id, callback) => {
  if (data) {
    const connection = createConnection()
    data = omit('ID', data)

    const sql =
      'UPDATE ' +
      connection.escapeId(tableName) +
      ' SET ? ' +
      ' WHERE ' +
      connection.escapeId(columnName) +
      ' =  ?'

    // UPDATE `auto`
    // SET `modelYear` = 2016,
    // `make` = 'Acura',
    // `model` = 'ILX',
    // `MSRP` = 28950,
    // `description` = 'Although the ILX is basically a Honda Civic, it is a really nice Civic.'
    // WHERE `ID` =  2

    connection.query(sql, [data, id], function(err, result) {
      if (err) return callback(err)
      console.log('Updated result: ', result)

      if (propOr(0, 'affectedRows', result) === 1) {
        return callback(null, { ok: true, id: id })
      } else if (propOr(0, 'affectedRows', result) === 0) {
        return callback(
          new HTTPError(404, 'missing', {
            name: 'not_found',
            error: 'not found',
            reason: 'missing'
          })
        )
      }
    })

    connection.end(function(err) {
      if (err) return err
    })
  } else {
    return callback(new HTTPError(400, 'Missing data for update.'))
  }
}

const deleteRow = (tableName, columnName, id, callback) => {
  if (tableName && id) {
    const connection = createConnection()

    connection.query(
      'DELETE FROM ' +
        connection.escapeId(tableName) +
        ' WHERE ' +
        connection.escapeId(columnName) +
        ' = ?',
      [id],
      function(err, result) {
        if (err) return callback(err)

        console.log('result', result)

        if (result && result.affectedRows === 1) {
          return callback(null, { ok: true, id: id })
        } else if (result && result.affectedRows === 0) {
          return callback(
            new HTTPError(404, 'missing', {
              name: 'not_found',
              error: 'not found',
              reason: 'missing'
            })
          )
        }
      }
    )

    connection.end(err => err)
  } else {
    return callback(new HTTPError(400, 'Missing id or entity name.'))
  }
}

const queryDB = (
  tableName,
  lastItem,
  filter,
  limit,
  formatter,
  orderColumn,
  callback
) => {
  limit = limit ? limit : 5

  const connection = createConnection()

  if (filter) {
    console.log('FILTER MODE')
    // filter  = "category:Oboe"
    const arrFilter = split(':', filter) // ['category','Oboe']
    const filterField = head(arrFilter)
    const filterValue = last(arrFilter)

    // SELECT *
    // FROM instrument
    // WHERE category = 'oboe'
    const sql = `SELECT *
    FROM ${connection.escapeId(tableName)}
    WHERE ${filterField} = ?
    ORDER BY ${connection.escapeId(orderColumn)}
    LIMIT ${limit}`

    console.log('sql:', sql)

    connection.query(sql, [filterValue], function(err, result) {
      if (err) return callback(err)
      return callback(null, map(formatter, result))
    })
  } else if (lastItem) {
    console.log('NEXT PAGE MODE')

    const sql = `SELECT *
    FROM ${connection.escapeId(tableName)}
    WHERE name > ?
    ORDER BY ${connection.escapeId(orderColumn)}
    LIMIT ${limit}`

    console.log('SQL', sql)

    connection.query(sql, [lastItem], function(err, result) {
      if (err) return callback(err)
      return callback(null, map(formatter, result))
    })
  } else {
    console.log('SIMPLE LIST. FIRST PAGE')
    const sql = `SELECT *
    FROM ${connection.escapeId(tableName)}
    ORDER BY name
    LIMIT ${limit}`

    console.log('SQL', sql)

    connection.query(sql, function(err, result) {
      if (err) return callback(err)
      return callback(null, map(formatter, result))
    })
  }
}

const dalHelper = {
  create,
  read,
  update,
  deleteRow,
  queryDB
}

module.exports = dalHelper
