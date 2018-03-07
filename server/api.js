const express=require('express')
const User=require('./model/user')
const Player=require('./model/player')

const gameBegin=require('./gameBegin')

let router=express.Router()


router.post('/register',function(req,res,next){
    let account=req.body.account
    let password=req.body.password
    let _res=res
    User.findOne({account:account},function(err,res){
        if(err){
            console.log("error: "+err)
            _res.send({status:0,msg:'查找是否是已注册账号失败'})
            return
        }
        else{
            if(!res){
                let user=new User({
                    account:account,
                    password:password
                })
                user.save(function(err,res){
                    if(err){
                        console.log('存入数据失败')
                        _res.send({status:1,msg:'注册失败'})
                        return
                    }
                    else{
                        console.log('存入数据成功')
                        _res.send({status:2,msg:'注册成功'})
                        return
                    }
                })
            }
            else{
                console.log('已经存在该账号')     
                console.log("res: "+res)
                _res.send({status:3,msg:'已经存在该账号'})    
                return 
            }
        }
    })
})

router.post('/signin',function(req,res){
    let account=req.body.account
    let password=req.body.password
    let _res=res
                    
    User.findOne({account:account,password:password},function(err,res){
        if(err){
            console.log("error: "+err)
            _res.send({status:0,msg:'查找数据库失败'})
            return
        }
        else{
            if(res){
                _res2=res
                if(!res.isAdmin){  
                    _res.cookie('userinfo',{username:account,isAdmin:false},{expires:new Date(Date.now()+60*60*24*1000)}) 
                    let score=_res2.score  
                    let seatArr=[0,1,2,3,4,5]
                    let seatNum=0
                    Player.find({},function(err,res){
                        if(err){
                            console.log("Error:" + err);
                        }else{
                            if(res){
                                res.map(function(item){
                                    seatArr.splice(seatArr.indexOf(item.seatNum),1)
                                })
                            }
                            seatNum=seatArr[Math.floor(Math.random()*seatArr.length)]
                            let player=new Player({
                                username:account,
                                score:score,
                                seatNum:seatNum,
                                readyFlag:false
                            })
                            player.save(function(err,res){
                                if(err){
                                    console.log('读取大厅用户列表失败')
                                    _res.send({status:1,msg:'读取大厅用户列表失败'})
                                    return
                                }
                                else{
                                    console.log('读取大厅用户列表成功')
                                    _res.send({status:2,msg:'登录成功',username:account})
                                    return
                                }
                            })
                        }
                    }) 
                    return   
                }else{
                    _res.cookie('userinfo',{username:account,isAdmin:true},{expires:new Date(Date.now()+60*60*24*1000)})
                    _res.send({status:3,msg:'管理员登录成功'})
                    return
                }  
                
            }else{
               _res.send({status:4,msg:'账号或密码错误'})
                return 
            }                          
        }
    })
})

router.get('/getPlayers',function(req,res){
    _res=res
    Player.find({},function(err,res){
        if(err){
            console.log("Error:" + err)
            _res.send({status:0,msg:'查询大厅用户列表失败'})
        }else{
            _res.send({status:2,msg:'查询大厅用户列表成功',playersInRoom:res})
        }
    }) 
})

router.post('/signout',function(req,res){
    _res=res
    let username=req.body.username
    Player.remove({username:username},function(err,res){
        if(err){
            console.log("Error:" + err)
            _res.send({status:0,msg:'退出房间失败'})
        }else{
            console.log('删除player成功')
            _res.send({status:2,msg:'退出房间成功'})
        }
    }) 
})

function isReady(_res,username){
    let p=new Promise((resolve,reject)=>{
        Player.find({username:username},(err,res)=>{
            if(err){
                reject(err)
            }else{
                if(res){
                    console.log('用户已准备')
                }else{
                    resolve(_res,username)
                } 
            }
        })
    })
    return p
}
function beReady(_res,username){
    let p=new Promise((resolve,reject)=>{
        Player.update({username:username},{readyFlag:true},(err,res)=>{
            if(err){
                _res.send({status:0,msg:'准备失败'})
                reject(err)
            }else{
                console.log('准备成功')
                _res.send({status:2,msg:'准备成功'})
                resolve()
            }
        })
    })
    return p
}
function findReadyCount(){
    let p=new Promise((resolve,reject)=>{
        Player.count({readyFlag:true},(err,res)=>{
            if(err){
                reject(err)
            }else{
                let data=res
                console.log('res:'+res)
                resolve(data)
            }
        })
    })
    return p
}
function findPlayerCount(countReady){
    let p=new Promise((resolve,reject)=>{
        Player.count({},(err,res)=>{
            if(err){
                reject(err)
            }else{
                console.log(countReady)
                console.log(res)
                if(countReady===res){
                    console.log('所有玩家已经准备')
                    gameBegin()
                }else{
                    console.log('有玩家还未准备')
                }
            }
        })
    })
    return p
}
router.post('/ready',function(req,res){
    _res=res
    let username=req.body.username
    isReady(res,username)
    .catch((err)=>{
        console.log("Error:" + err)
    })
    .then((res,username)=>{
        return beReady(res,username)
    })
    .catch((err)=>{
        console.log("Error:" + err)
    })
    .then(()=>{
        return findReadyCount()
    })
    .catch((err)=>{
        console.log("Error:" + err)
    })
    .then((data)=>{
        console.log('countReady:'+data)
        return findPlayerCount(data)
    })


})

router.post('/cancelReady',function(req,res){
    _res=res
    let username=req.body.username
    Player.update({username:username},{readyFlag:false},function(err,res){
        if(err){
            console.log("Error:" + err)
            _res.send({status:0,msg:'取消准备失败'})
        }else{
            console.log('准备成功')
            _res.send({status:2,msg:'取消准备成功'})
        }
    }) 
})

router.get('/clearCookies',function(req,res){
    res.clearCookie('userinfo')
    res.send('退出用户成功')
    return
})


module.exports=router