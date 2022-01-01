"use strict";

/**
 *  bookmark controller
 *  read more: https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#adding-a-new-controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::bookmark.bookmark",
  ({ strapi }) => ({
    // Method 3: Replacing a core action
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
      try {
        ctx.body = "ok";
      } catch (err) {
        ctx.body = err;
      }
    },
    async create(ctx) {
      strapi.log.info("CREATED SOMETHING");
      // some logic here
      const response = await super.create(ctx);
      // some more logic

      return response;
    },
    async findOne(ctx) {
      strapi.log.info("STRAPI INFORMATION");
      const { id } = ctx.params;
      const { query } = ctx;

      const entity = await strapi
        .service("api::bookmark.bookmark")
        .findOne(id, query);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
