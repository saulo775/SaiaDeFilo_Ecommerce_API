import db from "../db.js"
import bcrypt from "bcrypt"
import {v4} from "uuid";


export async function SignUp(req, res){
    const {name, email, password} = req.body
    
    try{
        const passwordCrypt = bcrypt.hashSync(password, 10)
     
        const existingEmail = await db.collection("users").findOne({email})
        console.log("email..",existingEmail)

        if(existingEmail){            
            return res.sendStatus(409).send('E-mail ja cadastrado')
        }
        

        await db.collection("users").insertOne({name, email, password: passwordCrypt})
                  
        res.status(201).send("Cadastro concluído.")
       

    } catch (error){
        console.log(error);
        return res.status(500).send("Erro ao fazer o cadastro.");
    }
}

export async function SignIn(req, res){
    const {email} = req.body
    const login = req.body
    console.log(login)
    try {       
        
        const user = await db.collection("users").findOne({email: login.email})
        
        if(user && bcrypt.compareSync(login.password, user.password)){
            const token = v4()

            await db.collection("sessions").insertOne({
                token,
                userID: user._id
            })

            res.send({token})
            
        }else res.sendStatus(404);
        
    } catch(e){
        res.sendStatus(500)
        console.log("Usuario não encontrado.")
    }
}