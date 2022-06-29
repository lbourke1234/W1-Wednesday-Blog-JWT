import express from 'express'
import createError from 'http-errors'
import AuthorsModel from './model.js'
import { basicAuthMiddleware } from '../../auth/basic.js'

const authorsRouter = express.Router()

authorsRouter.get('/', basicAuthMiddleware, async (req, res, next) => {
  try {
    const authors = await AuthorsModel.find()
    res.send(authors)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
authorsRouter.get('/:id', basicAuthMiddleware, async (req, res, next) => {
  try {
    const author = await AuthorsModel.findById(req.params.id)
    if (!author)
      return next(createError(404, `Author with id ${req.params.id} not found!`))
    res.send(author)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
authorsRouter.post('/', basicAuthMiddleware, async (req, res, next) => {
  try {
    const newAuthor = new AuthorsModel(req.body)
    const { _id } = await newAuthor.save()
    res.status(201).send(_id)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
authorsRouter.put('/:id', basicAuthMiddleware, async (req, res, next) => {
  try {
    const updatedAuthor = await AuthorsModel.findByIdAndUpdate(req.params.id, req.body, {
      validation: true,
      new: true
    })
    if (!updatedAuthor)
      return createError(404, `Author with id ${req.params.id} not found!`)
    res.send(updatedAuthor)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
authorsRouter.delete('/:id', basicAuthMiddleware, async (req, res, next) => {
  try {
    const deletedAuthor = await AuthorsModel.findByIdAndDelete(req.params.id)
    if (!deletedAuthor)
      return createError(404, `Author with id ${req.params.id} not found!`)
    res.send()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default authorsRouter
