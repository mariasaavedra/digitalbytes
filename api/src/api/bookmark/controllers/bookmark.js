'use strict';

/**
 *  bookmark controller
*  read more: https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#adding-a-new-controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::bookmark.bookmark', ({ strapi }) =>  ({
    // Method 3: Replacing a core action
    async findOne(ctx) {
        strapi.log.info('STRAPI INFORMATION');
        const { id } = ctx.params;
        const { query } = ctx;

        const entity = await strapi.service('api::bookmark.bookmark').findOne(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    }
}));
