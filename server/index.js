const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000
const fs = require('fs')

// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true}));
app.use(cors())

//You can use this to check if your server is working
app.get('/', (req, res)=>{

    res.send("Welcome to my server")
})


//Route that handles form submission logic
app.post('/formSubmit', (req, res) =>{
    let reqBody = req.body
    let curDate = Date.now()
    let filename = reqBody.orderDate + reqBody.vendor + curDate + ".csv"

    let dataString  = reqBody.orderDate + "; " +
            reqBody.vendor.trim() + "; " +
            reqBody.location.trim() + "; " +
            reqBody.shipMethod.trim() + "; " +
            reqBody.receiptDate + "; " +
            reqBody.refNum.trim() + "; " +
            reqBody.jobNum.trim() + "; " +
            reqBody.jobTaskNum.trim() + "; "
    for (let x =0; x < reqBody.glAccount.length; x++){
        dataString += reqBody.glAccount[x].trim() + "; " +
            reqBody.costCenter[x] + "; " +
            reqBody.dept[x].trim() + "; " +
            reqBody.itemNo[x].trim() + "; " +
            reqBody.quantity[x] + "; " +
            reqBody.description[x].trim() + "; " +
            reqBody.unitPrice[x] + "; " +
            reqBody.extPrice[x] + "; "
    }

    fs.writeFile(filename, dataString, "utf-8", function (){
        console.log("File Written")
        fs.rename("C:\\Users\\bedwards\\WebstormProjects\\po_requests\\server\\" + filename, "\\hff-corp-fs01\\data\\home\\SmartConnect\\Purchase Order Requests\\" + filename, function (){
            console.log("File Moved")
        })
    })

    res.send("Form Submitted, Thank you")
})

//Start your server on a specified port
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})