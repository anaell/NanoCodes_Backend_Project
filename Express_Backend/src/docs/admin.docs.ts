/**
 * @openapi
 * /api/admin/analytics:
 *   get:
 *     summary: Get platform analytics
 *     description: |
 *       Returns overall statistics about the platform including users,
 *       artisans, bookings, booking reviews, average rating,
 *       booking status distribution and user/artisan growth.
 *
 *       If the optional **days** query parameter is supplied,
 *       only records created within that period are considered.
 *
 *     tags:
 *       - Admin Analytics
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: days
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of previous days to include.
 *         example: 30
 *
 *     responses:
 *       200:
 *         description: Platform analytics retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 total_users: 345
 *                 total_artisans: 86
 *                 total_bookings: 914
 *                 total_booking_reviews: 412
 *                 average_review_rating: 4.8
 *                 booking_status_number:
 *                   - status: completed
 *                     _count:
 *                       status: 520
 *                   - status: pending
 *                     _count:
 *                       status: 120
 *                 user_platform_growth:
 *                   - date: "2025-01-01"
 *                     count: 15
 *                 artisan_platform_growth:
 *                   - date: "2025-01-01"
 *                     count: 4
 *
 *       400:
 *         description: Invalid request query.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             examples:
 *               Missing Token:
 *                 value:
 *                   status: error
 *                   message: Access token required
 *               Invalid Token:
 *                 value:
 *                   status: error
 *                   message: Invalid token
 *               Expired Token:
 *                 value:
 *                   status: error
 *                   message: Token expired
 *
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     summary: Retrieve platform users
 *     description: |
 *       Returns a paginated list of users registered on the platform.
 *
 *       Supports searching, filtering by role, suspension status,
 *       artisan verification status and pagination.
 *
 *     tags:
 *       - Admin Users
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: role
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - artisan
 *             - user
 *         description: Filter users by role.
 *
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Filter suspended users.
 *
 *       - in: query
 *         name: artisan_document_verification_status
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - accepted
 *             - rejected
 *             - more_info_required
 *
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search by name, email or ID.
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *
 *     responses:
 *       200:
 *         description: Users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/PlatformUser'
 *                     meta:
 *                       $ref: '#/components/schemas/PaginationMeta'
 *
 *       400:
 *         description: Invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/users/{user_id}:
 *   delete:
 *     summary: Delete a platform user
 *
 *     description: Soft deletes a user by marking the account as deleted.
 *
 *     tags:
 *       - Admin Users
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *
 *       400:
 *         description: Invalid user id.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/artisans/pending_document_verification:
 *   get:
 *     summary: List pending artisan verification requests
 *
 *     description: Returns every artisan whose verification documents are awaiting review.
 *
 *     tags:
 *       - Admin Artisan Verification
 *
 *     security:
 *       - BearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Pending verification requests retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_artisans_with_pending_reviews:
 *                       type: integer
 *                     artisans_with_pending_reviews:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/PendingVerification'
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/artisans/pending_document_verification/{artisan_id}:
 *   get:
 *     summary: Get a pending verification request
 *
 *     description: Retrieves the submitted verification documents and artisan information for a specific artisan awaiting review.
 *
 *     tags:
 *       - Admin Artisan Verification
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     responses:
 *       200:
 *         description: Verification request retrieved.
 *
 *       400:
 *         description: Invalid artisan id.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/artisans/pending_document_verification/{artisan_id}:
 *   post:
 *     summary: Review artisan verification request
 *
 *     description: Accept, reject or request additional information for an artisan verification application.
 *
 *     tags:
 *       - Admin Artisan Verification
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - application_status_chosen
 *             properties:
 *               application_status_chosen:
 *                 type: string
 *                 enum:
 *                   - accepted
 *                   - rejected
 *                   - more_info_required
 *
 *     responses:
 *       200:
 *         description: Verification request reviewed successfully.
 *
 *       400:
 *         description: Validation failed.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/bookings:
 *   get:
 *     summary: Retrieve platform bookings
 *     description: |
 *       Returns a paginated list of bookings on the platform.
 *
 *       Supports searching, filtering by booking status,
 *       filtering by creation date, and pagination.
 *
 *     tags:
 *       - Admin Bookings
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search by customer name or artisan name.
 *         example: John
 *
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - accepted
 *             - rejected
 *             - in_progress
 *             - cancelled
 *             - completed
 *         description: Booking status to filter by.
 *
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Return bookings created within the last X days.
 *         example: 30
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_bookings:
 *                       type: integer
 *                     bookings:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Booking'
 *                     meta:
 *                       $ref: '#/components/schemas/PaginationMeta'
 *
 *       400:
 *         description: Invalid query parameters.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/bookings/stat_card:
 *   get:
 *     summary: Retrieve booking overview statistics
 *
 *     description: |
 *       Returns booking dashboard cards including:
 *       - Completed bookings today
 *       - Total revenue
 *       - Active bookings
 *       - Pending bookings
 *       - Growth percentages
 *
 *     tags:
 *       - Admin Bookings
 *
 *     security:
 *       - BearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Booking statistics retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 bookings_completed_today: 24
 *                 total_revenue:
 *                   _sum:
 *                     booking_price: 495000
 *                 active_bookings: 31
 *                 pending_bookings: 14
 *                 percentage_growths:
 *                   percentage_active_bookings_growth: 12.8
 *                   percentage_pending_bookings_growth: -5.4
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/reviews:
 *   get:
 *     summary: Retrieve customer reviews
 *
 *     description: |
 *       Returns customer reviews submitted for completed bookings.
 *
 *       Supports:
 *       - searching
 *       - filtering reported reviews
 *       - pagination
 *
 *     tags:
 *       - Admin Reviews
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search reviews.
 *
 *       - in: query
 *         name: reported_reviews
 *         schema:
 *           type: boolean
 *         description: Return only reported reviews.
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     all_artisans_reviews:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Review'
 *                     meta:
 *                       type: object
 *                       properties:
 *                         total_reported_reviews:
 *                           type: integer
 *                         total_reviews:
 *                           type: integer
 *                         current_page:
 *                           type: integer
 *                         per_page:
 *                           type: integer
 *                         total_pages:
 *                           type: integer
 *                         has_next_page:
 *                           type: boolean
 *                         has_previous_page:
 *                           type: boolean
 *
 *       400:
 *         description: Invalid query parameters.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/earnings_management/stats_card:
 *   get:
 *     summary: Retrieve earnings overview
 *
 *     description: |
 *       Returns financial dashboard statistics including:
 *       total revenue,
 *       platform commission,
 *       pending payouts,
 *       transaction counts,
 *       and calculated growth percentages.
 *
 *     tags:
 *       - Admin Earnings
 *
 *     security:
 *       - BearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Earnings overview retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 total_revenue:
 *                   _sum:
 *                     amount: 5200000
 *                 platform_commission:
 *                   _sum:
 *                     commission: 520000
 *                 processing_transactions: 14
 *                 completed_transactions: 1524
 *                 pending_payouts:
 *                   _sum:
 *                     booking_price: 80000
 *                 number_of_artisans_with_pending_payouts: 8
 *                 percentage_growths:
 *                   percentage_revenue_growth: 15.8
 *                   percentage_success_rate: 98.2
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/earnings_management/transaction_logs:
 *   get:
 *     summary: Retrieve transaction logs
 *
 *     description: Returns a paginated list of successful and processing transactions.
 *
 *     tags:
 *       - Admin Earnings
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search transaction by customer, artisan, booking or payment ID.
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *
 *     responses:
 *       200:
 *         description: Transaction logs retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     all_transactions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Transaction'
 *                     meta:
 *                       $ref: '#/components/schemas/PaginationMeta'
 *
 *       400:
 *         description: Invalid query parameters.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/earnings_management/revenue_trend:
 *   get:
 *     summary: Retrieve revenue trend
 *
 *     description: Returns revenue grouped by payment completion date for dashboard charts.
 *
 *     tags:
 *       - Admin Earnings
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 30
 *         description: Number of previous days to include.
 *
 *     responses:
 *       200:
 *         description: Revenue trend retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 - date: "2026-07-01"
 *                   revenue: 42000
 *                 - date: "2026-07-02"
 *                   revenue: 18500
 *                 - date: "2026-07-03"
 *                   revenue: 61000
 *
 *       400:
 *         description: Invalid query parameters.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/system_settings:
 *   get:
 *     summary: Retrieve platform settings
 *
 *     description: Returns the current platform configuration.
 *
 *     tags:
 *       - Admin System Settings
 *
 *     security:
 *       - BearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Platform settings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/PlatformSettings'
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /api/admin/system_settings:
 *   post:
 *     summary: Update platform settings
 *
 *     description: Updates the global platform configuration.
 *
 *     tags:
 *       - Admin System Settings
 *
 *     security:
 *       - BearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - platform_name
 *               - support_email
 *               - maintenance_mode
 *               - logo_url
 *             properties:
 *               platform_name:
 *                 type: string
 *                 example: ServiceConnect Nigeria
 *
 *               support_email:
 *                 type: string
 *                 format: email
 *                 example: support@serviceconnect.com
 *
 *               maintenance_mode:
 *                 type: boolean
 *                 example: false
 *
 *               logo_url:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/logo.png
 *
 *     responses:
 *       201:
 *         description: Platform settings updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/PlatformSettings'
 *
 *       400:
 *         description: Validation failed.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */
