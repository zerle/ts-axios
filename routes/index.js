
const router = require('express').Router()

router.get('/simple/get', (req, res) => {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', (req, res) => {
  res.json(req.query)
})

router.post('/base/post', (req, res) => {
  console.log(req.body, 'ee')
  res.json(req.body)
})

router.post('/base/buffer', (req, res)=> {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', (req, res) =>{
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', (req, res)=> {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

router.get('/extend/get', (req, res) => {
  res.json(req.body)
})
router.post('/extend/post', (req, res) => {
  res.json(req.body)
})
router.delete('/extend/delete', (req, res) => {
  res.json(req.body)
})
router.head('/extend/head', (req, res) => {
  res.json(req.body)
})
router.put('/extend/put', (req, res) => {
  res.json(req.body)
})
router.patch('/extend/patch', (req, res) => {
  res.json(req.body)
})
router.options('/extend/options', (req, res) => {
  res.json(req.body)
})

router.get('/extend/user', (req, res) => {
  res.json('hello msg')
})
router.get('/Interceptor/get', (req, res) => {
  res.json('hello Interceptor')
})

module.exports = router