import { Context } from "koa";
import { Contact } from "../entity/contact";

export default class ContactController {
  public static async getContacts(ctx: Context) {
    const contacts: Contact[] = await Contact.find();
    ctx.status = 200;
    ctx.body = contacts;
  }

  public static async getContactByMobile(ctx: Context) {
    const contact: Contact = await Contact.findOne({
      mobile: ctx.params.mobile,
    });
    if (contact) {
      ctx.status = 200;
      ctx.body = contact;
    } else {
      ctx.status = 400;
      ctx.body = {
        error: "The contact you are trying to retrieve doesn't exist",
      };
    }
  }

  public static async addContact(ctx: Context) {
    const contactToBeSaved: Contact = new Contact();
    contactToBeSaved.name = ctx.request.body.name;
    contactToBeSaved.mobile = ctx.request.body.mobile;
    const validBDNumber = /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/;
    const isValid = validBDNumber.test(contactToBeSaved.mobile);
    if (!isValid) {
      ctx.status = 400;
      ctx.body = {
        eror: "The specified mobile no is not valid Bangladeshi mobile number",
      };
    } else if (await Contact.findOne({ mobile: contactToBeSaved.mobile })) {
      ctx.status = 400;
      ctx.body = { error: "The specified mobile number already exists" };
    } else {
      const contact = await Contact.save(contactToBeSaved);
      ctx.status = 201;
      ctx.body = contact;
    }
  }

  public static async editContact(ctx: Context) {
    const contactToBeEdited: Contact = await Contact.findOne({
      mobile: ctx.params.mobile,
    });
    if (!contactToBeEdited) {
      ctx.status = 400;
      ctx.body = {
        error: "The contact you are trying to retrieve doesn't exits",
      };
      return;
    }
    if (ctx.request.body.name) {
      contactToBeEdited.name = ctx.request.body.name;
    }
    if (ctx.request.body.mobile) {
      contactToBeEdited.mobile = ctx.request.body.mobile;
      const validBDNumber = /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/;
      const isValid = validBDNumber.test(contactToBeEdited.mobile);
      if (!isValid) {
        ctx.status = 400;
        ctx.body = {
          error:
            "The specified mobile no is not valid Bangladeshi mobile number",
        };
        return;
      } else if (await Contact.findOne({ mobile: contactToBeEdited.mobile })) {
        ctx.status = 400;
        ctx.body = { error: "The specified mobile number already exists" };
        return;
      }
    }
    if (contactToBeEdited.name || contactToBeEdited.mobile) {
      const contact = await Contact.save(contactToBeEdited);
      ctx.status = 201;
      ctx.body = contact;
    } else {
      ctx.status = 400;
      ctx.body = { error: "No payload given" };
    }
  }

  public static async deleteContactByMobile(ctx: Context) {
    const contactToRemove: Contact = await Contact.findOne({
      mobile: ctx.params.mobile,
    });
    if (!contactToRemove) {
      ctx.status = 400;
      ctx.body = {
        error: "The contact you are trying to delete doesn't exits",
      };
    } else {
      await Contact.remove(contactToRemove);
      ctx.status = 200;
      ctx.body = { error: "The contact is deleted" };
    }
  }
}
