import * as Router from "koa-router";
import controller = require("../controllers");
export const restRouter = new Router();

restRouter.get("/", (ctx) => {
  ctx.body = "Hello Phone Book";
});

// Contact
restRouter.get("/contacts", controller.contact.getContacts);
restRouter.get("/contact/:mobile", controller.contact.getContactByMobile);
restRouter.post("/contact", controller.contact.addContact);
restRouter.put("/contact/:mobile", controller.contact.editContact);
restRouter.delete("/contact/:mobile", controller.contact.deleteContactByMobile);
