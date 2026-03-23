import CustomerModel from "../models/CustomerModel.js";

//create a customer
export const createCustomer = async (req, res) => {
    try {
        const customer = req.body;
        // Associate the customer with the logged-in user
        customer.createdBy = req.user._id;

        const newCustomer = await CustomerModel.create(customer);

        res.status(201).json({
            message: "Customer created successfully",
            customer: newCustomer
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "error while adding data",
            error: error.message
        })
    }
}

//get customers
export const getCustomers = async (req, res) => {
    try {
        // Only fetch customers created by this user
        const customers = await CustomerModel.find({ createdBy: req.user._id }).select('-__v');
        res.json({ customers });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "error while getting data",
            error: error.message
        })
    }
};

//get a customer
export const getACustomer = async (req, res) => {
    try {
        // Ensure the fetched customer belongs to this user
        const customer = await CustomerModel.findOne({ _id: req.params.id, createdBy: req.user._id });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ customer })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "error while getting data",
            error: error.message
        })
    }
}

//update a customer
export const updateCustomer = async (req, res) => {
    try {
        // Ensure user can only update their own customer
        const customer = await CustomerModel.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ message: "Customer not found or access denied" });
        }

        res.json({ updated: customer });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "error while updating data",
            error: error.message
        })
    }
};

//delete a customer
export const deleteCustomer = async (req, res) => {
    try {
        // Ensure user can only delete their own customer
        const customer = await CustomerModel.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found or access denied" });
        }

        res.json({ message: "Customer deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "error while deleting data",
            error: error.message
        })
    }
};