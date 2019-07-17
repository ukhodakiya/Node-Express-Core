const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');


// get all members
router.get('/',(req,res)=>{
    res.json(members);
    });
    
//get one member
    router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg:`No member with id ${req.params.id} found `});
    }
    });

//create member 
 router.post('/',(req,res) => {
// res.send(req.body);
const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
}

if(!newMember.name || !newMember.email){
    return res.status(400).json({msg:"Please include name and email"});
}

members.push(newMember);
// res.redirect('/');
res.json(members);
});

//update member
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
        const updatedMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;

                res.json({msg: 'Member updted', member:member});
            }
        });


    }else{
        res.status(400).json({msg:`No member with id ${req.params.id} found `});
    }
    });

    //delete member
    router.delete('/:id', (req,res) => {
        const found = members.some(member => member.id === parseInt(req.params.id));
        
        if(found){
            res.json({msg:'Member Deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
        }else{
            res.status(400).json({msg:`No member with id ${req.params.id} found `});
        }
        });
    




    module.exports = router;