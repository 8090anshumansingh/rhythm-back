import User from "../models/user.model.js";
import All from "../models/All Songs.model.js";
import Conversation from "../models/Conversation.js";
import bcryptjs from "bcryptjs";
const saltRounds = 12;

export const registerUser = (req, res) => {
  try {
    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var newName = fname + " " + lname;
    const newUser = {
      name: newName,
      email: req.body.email,
      password: req.body.password,
      likedSongs:[]
    };
    bcryptjs.hash(req.body.password, saltRounds, function (err, hash) {
      newUser.password = hash;
      User.create(newUser, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(data);
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
};
export const loginUser = (req, res) => {
  try {
    User.findOne({ email: req.body.email }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        if (data !== undefined && data !== null) {
          bcryptjs.compare(req.body.password, data.password, function (
            err,
            result
          ) {
            if (result) {
              res.status(200).json({data:data , msg:"login"});
            } else {
              res.status(200).json({data:NULL,msg:"incorrect password or username"});
            }
          });
        } else {
          res.status(200).json({msg:"incorrect username"});
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const likeSong = (req, res) => {
  try {
    
    User.find({_id:req.body.userId}, function (err, data) {
      if (err) {
        
         console.log(err);
      } else {
         

           data[0].likedSongs.push(req.body.id);            

        data[0].save();
        res.status(200).send("song liked");
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const dislikeSong = (req, res) => {
  try {
    
    User.find({_id:req.body.userId}, function (err, data) {
      if (err) {
        
         console.log(err);
      } else {
         
             var index= data[0].likedSongs.indexOf(req.body.id);
             data[0].likedSongs.splice(index,1);
                      

        data[0].save();
        res.status(200).send("song disliked");
      }
    });
  } catch (e) {
    console.log(e);
  }
};


export const getAllLiked = (req, res) => {
  try {
    
    User.find({_id:req.body.userId}, function (err, data) {
      if (err) {
        
         console.log(err);
      } else {
         
        //  console.log(data[0].likedSongs);
         
         res.status(200).json(data[0].likedSongs);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUserFromId=(req,res)=>{
  try {
    
    User.find({_id:req.body.userId},function(err,data){
      if(err)
      {
        console.log(err);
      }
      else
      {
        res.status(200).json(data[0]);
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export const  getSongFromId = async (req, res) => {
  try {
    var tt =[];
    // console.log(req.body.userId);
   User.find({_id:req.body.userId}, function (err, data) {
      if (err) {
        
         console.log(err);
      } else {

        All.find({}, function (err1,data1){
           data[0].likedSongs.forEach((e) => {
              var found= data1[0].tracks.find(t => t.id===e);
               tt.push(found);
              
           });
          //  console.log(tt);
           res.status(200).json(tt);
        });
        
       
        
      }
    });
   
   
  } catch (e) {
    console.log(e);
  }
};

export const getLikedArtists=(req,res)=>{
  try {
    var tt =[];
    User.find({_id:req.params.userId},function(err,data){
        if(err)
        {
          console.log(err);
        }
        else
        {
             All.find({}, function (err1,data1){
              data[0].likedSongs.forEach((e) => {
                 var found= data1[0].tracks.find(t => t.id===e);

                 if(!tt.includes(found.artist))
                     tt.push(found.artist);
               
               });
                  // console.log(tt);
              res.status(200).json(tt);
         });
        }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsersWithArtists=(req,res)=>{
  try {
    var tt=[];

      User.find({},function(err,data)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {

          All.find({}, function(err1, data1){

             data.forEach((d)=>{
              var objc=
              {
                  id:d._id,
                  name:d.name,
                  artists:[],
              };

                d.likedSongs.forEach((id)=>{

                  var found= data1[0].tracks.find(t=> t.id===id);
                  if(!objc.artists.includes(found.artist))
                  objc.artists.push(found.artist);

                });

                tt.push(objc);
             });
             res.status(200).json(tt);
          });
          
          // data.forEach((d)=>{
          //     var objc=
          //     {
          //        name:d.name,
          //        artists:[],
          //     };
              
          //      d.likedSongs.forEach((id)=>{
          //          All.find({},function(err1,data1){
          //            if(err1)
          //             {
          //               console.log(err1);
          //             }
          //             else
          //             {
          //                var found= data1[0].tracks.find(t=> t.id===id);
          //                if(!objc.artists.includes(found.artist))
          //                objc.artists.push(found.artist);
                        
          //             }
          //          });
          //         //  console.log(objc);
          //      });
          //     //  console.log(objc);
          //      tt.push(objc);
          //  });

           
        }
      });


  } catch (error) {
    console.log(error);
  }
}

export const getFriends=async(req,res)=>{
  try {
    var tt=[];
    Conversation.find({},function(err,data){
       data.forEach((d)=>{
         if(d.members[0]===req.params.userId)
         {
              tt.push(d.members[1]);
         }
         else if(d.members[1]===req.params.userId)
         {
          tt.push(d.members[0]);
         }
       });
       res.status(200).json(tt);
    });
  } catch (error) {
    console.log(error);
  }
}

export const getFriendsNew=async(req,res)=>{
  try {
    // var tt=[];
    var tt2=[];

    User.find({},function(err1,data1){
      Conversation.find({},function(err,data){
      
        data.forEach((d)=>{
          var mem;
          if(d.members[0]===req.params.userId)
          {
            mem=d.members[1];  
          }
          else if(d.members[1]===req.params.userId)
          {
            mem=d.members[0];
          }
        //  console.log(data1);
            const found= data1.find((r)=>r._id==mem);
             tt2.push(found);
        });
        
          res.status(200).json(tt2);
      });
    });

  } catch (error) {
    console.log(error);
  }
}

export const getPosters=async(req,res)=>{
  var tt=[];
  try {
    User.find({_id:req.params.userId},function(err,data){
      if(err)
      {
        console.log(err);
      }
      else
      {
           All.find({}, function (err1,data1){
            data[0].likedSongs.forEach((e) => {
               var found= data1[0].tracks.find(t => t.id===e);

              //  if(!tt.includes(found.artist))
                  tt.length<12 && tt.push({
                     image:found.image,
                     artist:found.artist,
                     title:found.title
                   });
             
             });
                // console.log(tt);
            res.status(200).json(tt);
       });
      }
  });
  } catch (error) {
    console.log(error);
  }
}

export const setDp=(req,res)=>{
  try {
    
    User.find({_id:req.body.userId},function(err,data){
      if(err)
      {
        console.log(err);
      }
      else
      {
        data[0].dp=req.body.url;
        data[0].save();
        res.status(200).json(data[0]);
      }
    })
  } catch (error) {
    console.log(error);
  }
}
