"use strict";

// const Mail = use('Mail')
const Validator = use("Validator");
const Ticket = use("App/Model/Ticket");
// const RandomString = use('randomstring')
const Category = use("App/Model/Category");

class TicketController {
  /**
   * Display all tickets.
   */
  async index(response) {
    try {
      const tickets = await Ticket.all();
      const categories = await Category.all();

      if (tickets && categories) {
        return response.json({
          status: "success",
          tickets: tickets,
          categories: categories
        });
        // return [tickets, categories];
        // return { status: "success", tickets : tickets, categories : categories }
      }
    } catch (err) {
      console.log(err);
      return response.status(err.status).send(err);
    }
  }
  /**
   * Display all tickets by a user.
   */
  async userTickets(request, response) {
    const tickets = await Ticket.query()
      .where("user_id", request.currentUser.id)
      .fetch();
    const categories = Category.all();

    return response.json({
      status: "success",
      tickets: tickets,
      categories: categories
    });
    // yield response.sendView('tickets.user_tickets', { tickets: tickets.toJSON(), categories: categories.toJSON() })
  }

  /**
   * Show the form for opening a new ticket.
   */
  async create(request, response) {
    const categories = await Category.pair("id", "name");
    return response.json({
      status: "success",
      categories: categories
    });
  }
  /**
   * Store a newly created ticket in database.
   */
  /*async store(request, response) {
    const user = request.currentUser;

    // validate form input
    const validation = yield Validator.validateAll(request.all(), {
      title: "required",
      category: "required",
      priority: "required",
      message: "required"
    });

    // show error messages upon validation fail
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash();

      return response.redirect("back");
    }

    // persist ticket to database
    const ticket = yield Ticket.create({
      title: request.input("title"),
      user_id: user.id,
      ticket_id: RandomString.generate({
        length: 10,
        capitalization: "uppercase"
      }),
      category_id: request.input("category"),
      priority: request.input("priority"),
      message: request.input("message"),
      status: "Open"
    });

    // send mail notification
    yield Mail.send("emails.ticket_info", { user, ticket }, message => {
      message.to(user.email, user.username);
      message.from("support@adonissupport.dev");
      message.subject(`[Ticket ID: ${ticket.ticket_id}] ${ticket.title}`);
    });

    yield request
      .with({
        status: `A ticket with ID: #${ticket.ticket_id} has been opened.`
      })
      .flash();
    response.redirect("back");
  }*/
  /**
   * Display a specified ticket.
   */
  /*show(request, response) {
    const ticket = yield Ticket.query()
      .where("ticket_id", request.param("ticket_id"))
      .with("user")
      .firstOrFail();
    const comments = yield ticket
      .comments()
      .with("user")
      .fetch();
    const category = yield ticket.category().fetch();

    yield response.sendView("tickets.show", {
      ticket: ticket.toJSON(),
      comments: comments.toJSON(),
      category: category.toJSON()
    });
  }*/

  /**
   * Close the specified ticket.
   */
  /**close(request, response) {
    const ticket = yield Ticket.query()
      .where("ticket_id", request.param("ticket_id"))
      .firstOrFail();
    ticket.status = "Closed";
    yield ticket.save();

    const ticketOwner = yield ticket.user().fetch();

    // send email
    yield Mail.send(
      "emails.ticket_status",
      { ticketOwner, ticket },
      message => {
        message.to(ticketOwner.email, ticketOwner.username);
        message.from("support@adonissupport.dev");
        message.subject(`RE: ${ticket.title} (Ticket ID: ${ticket.ticket_id})`);
      }
    );

    yield request.with({ status: "The ticket has been closed." }).flash();
    response.redirect("back");
  }*/
}

module.exports = TicketController;
