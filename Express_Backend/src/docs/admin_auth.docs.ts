/**
 * @openapi
 * /admin/login:
 *   post:
 *     tags:
 *       - Admin Authentication
 *     summary: Login an administrator
 *     description: |
 *       Authenticates an administrator using email and password.
 *       Returns a JWT access token and sets an HTTP-only refresh token cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLoginRequest'
 *     responses:
 *       200:
 *         description: Login successful.
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only refresh token cookie.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminLoginResponse'
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /admin/sign-up:
 *   post:
 *     tags:
 *       - Admin Authentication
 *     summary: Create a new administrator
 *     description: |
 *       Registers a new administrator.
 *       Returns an access token and sets an HTTP-only refresh token cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminSignupRequest'
 *     responses:
 *       201:
 *         description: Administrator created successfully.
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only refresh token cookie.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminLoginResponse'
 *       400:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /admin/logout:
 *   get:
 *     tags:
 *       - Admin Authentication
 *     summary: Logout administrator
 *     description: |
 *       Clears the refresh token cookie.
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Logout Successful
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /admin/refresh-token:
 *   get:
 *     tags:
 *       - Admin Authentication
 *     summary: Refresh access token
 *     description: |
 *       Uses the HTTP-only refresh token cookie to issue a new access token.
 *     responses:
 *       200:
 *         description: Access token refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       401:
 *         description: Refresh token missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 */
