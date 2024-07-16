const cors = require('cors');
const express = require('express');

const FormDataModel = require('./models/FormData'); // Assuming you have a FormData model defined


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res) => {
    res.send('Hello World');
})
// Connect to MongoDB Atlas

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://gokila15:btY4uC5uU4z4BJet@cluster0.neh26jg.mongodb.net/customer?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const medicinecollection = client.db("MedicineInventory").collection("medicines");
    app.post("/upload-medicine", async (req, res) => {
        try {
          const data = req.body;
          const result = await medicinecollection.insertOne(data);
          res.status(201).json({ message: "Medicine uploaded successfully", insertedId: result.insertedId });
        } catch (error) {
          console.error("Error uploading medicine:", error);
          res.status(500).json({ message: "An error occurred while uploading the medicine" });
        }
      });
      // Get all books
    app.get("/all-medicines", async (req, res) => {
        try {
          const medicines = await medicinecollection.find().toArray();
          res.send(medicines);
        } catch (error) {
          console.error('Error fetching all medicines:', error);
          res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
      });
      
      // Delete a book
      app.delete("/delete-medicine/:name", async (req, res) => {
        try {
          const name = req.params.name;
          const filter = { title: name };
          const result = await medicinecollection.deleteOne(filter);
          if (result.deletedCount > 0) {
            res.json({ message: 'Medicine deleted successfully', result });
          } else {
            res.status(404).json({ message: 'Medicine not found' });
          }
        } catch (error) {
          console.error('Error deleting Medicine from MongoDB:', error);
          res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
      });
      
      // Assuming 'medicinecollection' is your MongoDB collection
// Import ObjectId from the MongoDB library
const { ObjectId } = require('mongodb');

// Assuming 'medicinecollection' is your MongoDB collection
app.get("/medicine/:medicineId", async (req, res) => {
    try {
        const medicineId = req.params.medicineId;
        // Convert medicineId to ObjectId before querying the database
        const objectId = new ObjectId(medicineId);
        // Fetch medicine details from the database based on the provided ID
        const medicine = await medicinecollection.findOne({ _id: objectId });
        
        if (!medicine) {
            // If medicine is not found, return a 404 status code
            res.status(404).json({ error: "Medicine not found" });
            return;
        }
        
        res.json(medicine); // Send medicine details as JSON response
    } catch (error) {
        console.error('Error fetching medicine details:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
// Assuming you have a cart collection in your MongoDB database
const cartCollection = client.db("MedicineInventory").collection("cart");



app.post("/cart/add/:medicineId", async (req, res) => {
  try {
    const { medicineId } = req.params;

    // Find the medicine by its ID
    const medicine = await medicinecollection.findOne({ _id: new ObjectId(medicineId) });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    // Example: Adding the medicine to the cart collection
    const cartItem = {
      medicineId: medicineId,
      name: medicine.title, // Use the correct field name
      price: medicine.price,
      quantity: 1,
      image: medicine.imgsrc,
    };

    // Insert the cart item into the cart collection
    const result = await cartCollection.insertOne(cartItem);

    res.status(201).json({ message: "Medicine added to cart", cartItemId: result.insertedId });
  } catch (error) {
    console.error("Error adding medicine to cart:", error);
    res.status(500).json({ message: "An error occurred while adding medicine to cart" });
  }
});
app.get("/cart/items", async (req, res) => {
  try {
    // Fetch all cart items from the cart collection
    const cartItems = await cartCollection.find().toArray();
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});



    


      // Update a book
      app.patch("/medicine/:id", async (req, res) => {
        
          const id = req.params.id;
          const updateMedicineData = req.body;
          
          const filter = { _id: new ObjectId(id)};
          const updateDoc = {
             $set: {
                 ...updateMedicineData
             },
          }
          const options = {upsert: true};
          const Result = await medicinecollection.updateOne(filter, updateDoc,options);
          res.send(Result);
        });
        app.post("/roleselection", (req, res) => {
            const role = req.body.role;
            if (role === "admin") {
                // Redirect to admin login page
                res.redirect("/login");
            } else if (role === "user") {
                // Redirect to user registration page
                res.redirect("/register");
            } else {
                res.send("Invalid role selected");
            }
        });
        const customerDB = client.db("customer"); // Assuming 'customer' is the database name

        // Access the 'register' collection
        const registerCollection = customerDB.collection("register");
        
        // Define a route for user registration
        app.post("/register", async (req, res) => {
          try {
              const { email, password, role } = req.body;
      
              // For regular user registration
              const userData = { email, password, role };
              const result = await registerCollection.insertOne(userData);
      
              res.status(201).json({
                  message: "User registered successfully",
                  insertedId: result.insertedId
              });
          } catch (error) {
              console.error("Error registering user:", error);
              res.status(500).json({
                  message: "An error occurred while registering the user"
              });
          }
      });
      
            
          
          
        
    // User login endpoint
    app.post('/login', async (req, res) => {
      try {
          const { email, password } = req.body;
          const user = await registerCollection.findOne({ email: email });
  
          if (user) {
              // Check if the user is admin and if the credentials match
              if (email === "admin@gmail.com" && password === "admin") {
                  res.json({ message: "Success", user: user });
              } else if (password === user.password) {
                  res.json({ message: "Success", user: user });
              } else {
                  res.json({ message: "Incorrect password" });
              }
          } else {
              res.json({ message: "No user found with this email" });
          }
      } catch (error) {
          console.error("Error logging in:", error);
          res.status(500).json({ message: "An error occurred while logging in" });
      }
  });
  app.post('/process-payment', async (req, res) => {
    try {
        const { amount, currency, token } = req.body;

        // Create a charge using the Stripe SDK
        const charge = await stripe.charges.create({
            amount: amount,
            currency: currency,
            source: token,
            description: 'Payment for medicines',
        });

        // If the charge is successful, send a success response
        res.json({ message: 'Payment successful', charge });
    } catch (error) {
        // If there's an error during payment processing, send an error response
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Payment processing error', message: error.message });
    }
});

  

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

//mongoose.connect('mongodb+srv://gokila15:btY4uC5uU4z4BJet@cluster0.neh26jg.mongodb.net/customer?retryWrites=true&w=majority&appName=Cluster0"')
   // .then(() => console.log('MongoDB connected'))
   // .catch(err => console.error('MongoDB connection error:', err));

// User registration endpoint

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
