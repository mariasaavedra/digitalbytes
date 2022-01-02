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
  })
);
