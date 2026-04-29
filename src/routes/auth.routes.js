const express = require("express");
const authController = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description Clear token from user cookies and add token to blacklist
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get current user details by token
 * @access Private
 */
authRouter.get("/get-me", authUser, authController.getMeController);

module.exports = authRouter;
