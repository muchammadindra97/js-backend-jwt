const express = require('express')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()
const prisma = new PrismaClient()

router.post('/sign-up', async (req, res, next) => {
  try {
    const { email, password, roles } = req.body

    const user = await prisma.user.findFirst({ where: { email } })

    if (user) {
      res
        .status(400)
        .json({
          status: 'fail',
          message: 'Email already registered'
        })

      return
    }

    const selectedRoles = []

    if (roles instanceof Array && roles.length > 0) {
      for (const roleName of roles) {
        const result = await prisma.role.findFirst({ where: { name: roleName } })

        if (result === null) {
          res
            .status(400)
            .json({
              status: 'fail',
              message: `Role not exists: ${roleName}`
            })

          return
        }

        selectedRoles.push(result)
      }
    } else {
      const result = await prisma.role.findFirst({ where: { name: 'user' } })

      selectedRoles.push(result)
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 8),
        Role: { connect: selectedRoles.map(role => ({ id: role.id })) }
      }
    })

    res.json({
      status: 'success',
      message: 'Sign up success',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findFirst({
      where: { email },
      include: {
        Role: true
      }
    })

    if (!user) {
      res
        .status(404)
        .json({
          status: 'fail',
          message: 'Invalid email or password'
        })

      return
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      res
        .status(404)
        .json({
          status: 'fail',
          message: 'Invalid email or password'
        })

      return
    }

    const token = jwt.sign(
      {
        email: user.email,
        authorities: user.Role.map(role => role.name)
      },
      process.env.APP_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: parseInt(process.env.APP_JWT_EXPIRY)
      }
    )

    res
      .json({
        status: 'success',
        message: 'Sign in success',
        data: {
          token
        }
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
