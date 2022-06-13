import { Router } from "express";
import { ensureClientAuthenticated } from "./middlewares/ensureClientAuthenticated";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindUnfinishedDeliveriesController } from "./modules/deliveries/useCases/findUnfinishedDeliveries.ts/FindUnfinishedDeliveriesController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findUnfinishedDeliveriesController = new FindUnfinishedDeliveriesController();

routes.post("/client", createClientController.handle);
routes.post("/client/sessions", authenticateClientController.handle);

routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/deliveryman/sessions", authenticateDeliverymanController.handle);

routes.post("/delivery", ensureClientAuthenticated, createDeliveryController.handle);
routes.get("/delivery/unfinished", findUnfinishedDeliveriesController.handle);

export { routes }