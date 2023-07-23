//jshint esversion:6

const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res)
{
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };

  const jsonData= JSON.stringify(data);

  const url="https://us12.api.mailchimp.com/3.0/lists/05feef0610";

  const options={
    method:"POST",
    auth:"sushanth:b5679753e0a2d7ef4b8fdb9a9b627173-us12"
  }

  const request= https.request(url,options,function(response)
{
  if(response.statusCode===200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data)
{
  console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res)
{
  res.redirect("/");
});


app.listen("3000");


//API key: b5679753e0a2d7ef4b8fdb9a9b627173-us12
//unique list id: 05feef0610
