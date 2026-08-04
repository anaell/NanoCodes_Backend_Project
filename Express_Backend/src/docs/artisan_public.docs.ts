/**
 * ============================================================
 * PUBLIC ARTISAN ENDPOINTS
 * ============================================================
 */

/**
 * @openapi
 * /artisans/featured:
 *   get:
 *     tags:
 *       - Public Artisans
 *     summary: Get featured artisans
 *     description: |
 *       Returns up to five highly-rated featured artisans.
 *       Only active (non-deleted and non-suspended) artisans are returned.
 *     responses:
 *       200:
 *         description: Featured artisans retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeaturedArtisansResponse'
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /artisans:
 *   get:
 *     tags:
 *       - Public Artisans
 *     summary: Browse artisans
 *     description: |
 *       Returns a paginated list of artisans.
 *       Supports searching and filtering.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search by artisan name or skill.
 *
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location.
 *
 *       - in: query
 *         name: experience
 *         schema:
 *           type: integer
 *         description: Minimum years of experience.
 *
 *       - in: query
 *         name: min_rating
 *         schema:
 *           type: number
 *           format: float
 *         description: Minimum rating.
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
 *           default: 9
 *
 *     responses:
 *       200:
 *         description: Artisans retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArtisansResponse'
 *       400:
 *         description: Invalid query parameters.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /artisans/{artisan_id}:
 *   get:
 *     tags:
 *       - Public Artisans
 *     summary: Get artisan profile
 *     description: Returns a complete artisan profile.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Artisan retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArtisanProfileResponse'
 *       400:
 *         description: Invalid artisan id.
 *       404:
 *         description: Artisan not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /artisans/{artisan_id}/bookings_completed:
 *   get:
 *     tags:
 *       - Public Artisans
 *     summary: Get completed bookings
 *     description: Returns completed jobs for an artisan.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
 *         description: Completed bookings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompletedBookingsResponse'
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Artisan not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /artisans/{artisan_id}/reviews:
 *   get:
 *     tags:
 *       - Public Artisans
 *     summary: Get artisan reviews
 *     description: Returns paginated reviews for an artisan.
 *     parameters:
 *       - in: path
 *         name: artisan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
 *               $ref: '#/components/schemas/ArtisanReviewsResponse'
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Artisan not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * ============================================================
 * PROTECTED ARTISAN ENDPOINTS
 * ============================================================
 */
