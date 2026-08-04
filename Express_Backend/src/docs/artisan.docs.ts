/**
 * ============================================================
 * PROTECTED ARTISAN ENDPOINTS
 * ============================================================
 */

/**
 * @swagger
 * /artisans/{artisan_id}:
 *   get:
 *     tags:
 *       - Protected Artisan
 *     summary: Retrieve artisan dashboard overview
 *     description: |
 *       Returns dashboard information for an artisan including profile details,
 *       upcoming accepted jobs, pending bookings, completed bookings and an earnings overview.
 *
 *       **Current implementation:** The artisan is identified using the `artisan_id`
 *       path parameter.
 *
 *       **Future update:** Authentication will be required. The authenticated artisan
 *       will be identified from the access token instead of the URL parameter.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the artisan.
 *     responses:
 *       200:
 *         description: Dashboard information retrieved successfully.
 *       400:
 *         description: Invalid artisan ID supplied.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /artisans/{artisan_id}/requests/incoming:
 *   get:
 *     tags:
 *       - Protected Artisan
 *     summary: Retrieve incoming booking requests
 *     description: |
 *       Returns all pending booking requests assigned to the artisan.
 *
 *       **Current implementation:** The artisan is identified using the `artisan_id`
 *       path parameter.
 *
 *       **Future update:** Authentication will be required and only the authenticated
 *       artisan will be able to retrieve their own booking requests.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Incoming booking requests retrieved successfully.
 *       400:
 *         description: Invalid artisan ID.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /artisans/{artisan_id}/requests/incoming/{booking_id}:
 *   patch:
 *     tags:
 *       - Protected Artisan
 *     summary: Respond to a booking request
 *     description: |
 *       Allows an artisan to accept or reject an incoming booking request.
 *
 *       **Current implementation:** The artisan is identified using the `artisan_id`
 *       path parameter.
 *
 *       **Future update:** Authentication will be required and ownership of the
 *       booking will be verified using the authenticated artisan.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: booking_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - artisan_response
 *             properties:
 *               artisan_response:
 *                 type: string
 *                 enum:
 *                   - accepted
 *                   - rejected
 *     responses:
 *       200:
 *         description: Booking request updated successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /artisans/{artisan_id}/job-history:
 *   get:
 *     tags:
 *       - Protected Artisan
 *     summary: Retrieve artisan booking history
 *     description: |
 *       Returns paginated booking history with optional filters.
 *
 *       **Current implementation:** Uses the `artisan_id` path parameter.
 *
 *       **Future update:** The authenticated artisan will automatically determine
 *       which booking history is returned.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: booking_status
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - accepted
 *             - rejected
 *             - in_progress
 *             - cancelled
 *             - completed
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking history retrieved successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /artisans/{artisan_id}/reviews:
 *   get:
 *     tags:
 *       - Protected Artisan
 *     summary: Retrieve artisan reviews
 *     description: |
 *       Returns paginated reviews received by the artisan.
 *
 *       **Current implementation:** Uses the `artisan_id` path parameter.
 *
 *       **Future update:** Authentication will determine the artisan automatically.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /artisans/{artisan_id}/reviews/stats:
 *   get:
 *     tags:
 *       - Protected Artisan
 *     summary: Retrieve artisan review statistics
 *     description: |
 *       Returns review statistics including rating breakdown,
 *       average rating and booking completion rate.
 *
 *       **Current implementation:** Uses the `artisan_id` path parameter.
 *
 *       **Future update:** Authentication will determine the artisan automatically.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Review statistics retrieved successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /artisans/{artisan_id}/reviews/{review_id}/reply:
 *   post:
 *     tags:
 *       - Protected Artisan
 *     summary: Create or update a reply to a review
 *     description: |
 *       Creates a new reply or updates an existing reply for a review.
 *
 *       **Current implementation:** Uses the `artisan_id` path parameter.
 *
 *       **Future update:** Authentication will ensure only the owner of the
 *       review can create or update replies.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: review_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reply
 *             properties:
 *               reply:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reply created or updated successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /artisans/{artisan_id}/earnings/stats:
 *   get:
 *     tags:
 *       - Protected Artisan
 *     summary: Retrieve artisan earnings summary
 *     description: |
 *       Returns earnings statistics including available balance,
 *       monthly earnings, pending payouts and earnings growth.
 *
 *       **Current implementation:** Uses the `artisan_id` path parameter.
 *
 *       **Future update:** Authentication will determine the artisan automatically.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Earnings statistics retrieved successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /artisans/{artisan_id}/earnings/trend_chart:
 *   get:
 *     tags:
 *       - Protected Artisan
 *     summary: Retrieve earnings trend data
 *     description: |
 *       Returns earnings trend data formatted for dashboard charts.
 *
 *       **Current implementation:** Uses the `artisan_id` path parameter.
 *
 *       **Future update:** Authentication will determine the artisan automatically.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: days
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Earnings trend data retrieved successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /artisans/{artisan_id}/transactions:
 *   get:
 *     tags:
 *       - Protected Artisan
 *     summary: Retrieve artisan transactions
 *     description: |
 *       Returns payment transactions belonging to the artisan.
 *
 *       **Current implementation:** Uses the `artisan_id` path parameter.
 *
 *       **Future update:** Authentication will determine the artisan automatically.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: recent
 *         schema:
 *           type: boolean
 *         description: When true, only the latest five transactions are returned.
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
