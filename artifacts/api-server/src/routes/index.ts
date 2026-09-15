import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import exchangeRateRouter from "./exchange-rate";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(exchangeRateRouter);

export default router;
