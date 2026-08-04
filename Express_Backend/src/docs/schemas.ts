// General Response Schemas
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           oneOf:
 *             - type: string
 *               example: Something went wrong
 *             - type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                     example: days
 *                   message:
 *                     type: string
 *                     example: '"days" must be greater than 0'
 *
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         data:
 *           type: object
 */

// Pagination Schema
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         total_items:
 *           type: integer
 *           example: 253
 *
 *         current_page:
 *           type: integer
 *           example: 2
 *
 *         per_page:
 *           type: integer
 *           example: 10
 *
 *         total_pages:
 *           type: integer
 *           example: 26
 *
 *         has_next_page:
 *           type: boolean
 *           example: true
 *
 *         has_previous_page:
 *           type: boolean
 *           example: true
 */

// Platform User
// This is used by /admin/users.
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     PlatformUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *
 *         f_name:
 *           type: string
 *           example: John
 *
 *         l_name:
 *           type: string
 *           example: Doe
 *
 *         email:
 *           type: string
 *           format: email
 *
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - artisan
 *
 *         profile_pic_url:
 *           type: string
 *           nullable: true
 *
 *         is_suspended:
 *           type: boolean
 *
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *         artisan:
 *           nullable: true
 *           type: object
 *           properties:
 *             verified:
 *               type: boolean
 *             created_at:
 *               type: string
 *               format: date-time
 */

// Booking
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *
 *         work_to_be_done:
 *           type: string
 *
 *         booking_price:
 *           type: number
 *
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - accepted
 *             - rejected
 *             - in_progress
 *             - cancelled
 *             - completed
 *
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *         customer:
 *           type: object
 *           properties:
 *             f_name:
 *               type: string
 *             l_name:
 *               type: string
 *
 *         artisan:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 f_name:
 *                   type: string
 *                 l_name:
 *                   type: string
 */

// Review
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     Review:
 *       type: object
 *       properties:
 *         rating:
 *           type: number
 *
 *         comment:
 *           type: string
 *
 *         status:
 *           type: string
 *
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *         customer:
 *           type: object
 *           properties:
 *             f_name:
 *               type: string
 *             l_name:
 *               type: string
 *
 *         artisan:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 f_name:
 *                   type: string
 *                 l_name:
 *                   type: string
 */

// Transaction
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *
 *         amount:
 *           type: number
 *
 *         commission:
 *           type: number
 *
 *         status:
 *           type: string
 *
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *         payment_completed_at:
 *           type: string
 *           format: date-time
 *
 *         booking:
 *           type: object
 *           properties:
 *             work_to_be_done:
 *               type: string
 *
 *         artisan:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 f_name:
 *                   type: string
 *                 l_name:
 *                   type: string
 *
 *         customer:
 *           type: object
 *           properties:
 *             f_name:
 *               type: string
 *             l_name:
 *               type: string
 */

// Pending Verification
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     PendingVerification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *
 *         user_id:
 *           type: string
 *
 *         main_skill:
 *           type: string
 *
 *         location:
 *           type: string
 *
 *         artisanVerificationDocuments:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             created_at:
 *               type: string
 *               format: date-time
 *
 *         user:
 *           type: object
 *           properties:
 *             f_name:
 *               type: string
 *             l_name:
 *               type: string
 *             profile_pic_url:
 *               type: string
 */

// Platform Settings
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     PlatformSettings:
 *       type: object
 *       properties:
 *         platform_name:
 *           type: string
 *
 *         support_email:
 *           type: string
 *           format: email
 *
 *         platform_logo_url:
 *           type: string
 *           format: uri
 *
 *         maintenance_mode:
 *           type: boolean
 */

/**
 * @openapi
 * components:
 *   schemas:
 *
 *     AdminLoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: admin@example.com
 *         password:
 *           type: string
 *           example: StrongPassword123
 *
 *     AdminSignupRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: admin@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           example: StrongPassword123
 *
 *     AdminLoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: adm_123456
 *             name:
 *               type: string
 *               example: John Doe
 *             email:
 *               type: string
 *               example: admin@example.com
 *             token:
 *               type: string
 *               description: JWT access token.
 *
 *     RefreshTokenResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: Newly generated JWT access token.
 */
