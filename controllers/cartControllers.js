import db from "../db.js"

export async function AddShoppingCart(req, res) {
    const {data, userId} = req.body
<<<<<<< HEAD
=======
    
>>>>>>> 1dccd55c967c37f940201f530144daba45d72449
    try {
        await db.collection("cart").insertOne({...data, userId})
        res.status(200).send("Produto adicionado ao carrinho.")

    } catch (error) {
        return res.status(500);
    }
}

export async function GetShoppingCart(req, res) {
    try {
        const  {user}  = res.locals      
        const product = await db.collection("cart").find({userId: user._id.toString()}).toArray()
        
        res.send(product)

    } catch (error) {
        
        res.status(500).send("Erro ao buscar produto.");
    }
}

