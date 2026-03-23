import { Router } from "express";
import {getCustomers,getACustomer,createCustomer,updateCustomer,deleteCustomer} from '../controllers/customerController.js'

const router = Router();

router.get('/',getCustomers);
router.get('/:id',getACustomer);
router.post('/',createCustomer);
router.put('/:id',updateCustomer);
router.delete('/:id',deleteCustomer);


export default router