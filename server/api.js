const express=require('express')
const User=require('./model/user')
const Player=require('./model/player')

const gameBegin=require('./gameBegin')
const myEmitter=require('./emitter')

let router=express.Router()


let beginFlag=false

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
                    password:password,
                    score:100
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
    let username=req.body.account
    let password=req.body.password;
    // let _res=res
    (function(data){
        let p=new Promise((resolve)=>{
            Player.findOne({username:username},(err,res)=>{
                if(err){
                    console.log("Error:" + err)
                    data._res.send({status:0,msg:'查找数据库失败'})
                    return
                }else{
                    if(res){
                        data._res.send({status:5,msg:'该用户已登录'})
                        return
                    }else{
                        resolve(data)
                    } 
                }
            })
        })
        return p
    })({_res:res,username:username,password:password})
    .then((data)=>{
        return (function(data){
            let p=new Promise((resolve)=>{
                let username=data.username
                let password=data.password
                let _res=data._res
                User.findOne({account:username,password:password},(err,res)=>{
                    if(err){
                        console.log("error: "+err)
                        _res.send({status:0,msg:'查找数据库失败'})
                        return
                    }else{
                        if(res){
                            let _res2=res
                            if(!res.isAdmin){
                                _res.cookie('userinfo',{username:username,isAdmin:false},{expires:new Date(Date.now()+60*60*24*1000)}) 
                                resolve({
                                    username:username,
                                    password:password,
                                    _res:_res,
                                    _res2:_res2,
                                })
                            }else{
                                _res.cookie('userinfo',{username:username,isAdmin:true},{expires:new Date(Date.now()+60*60*24*1000)})
                                _res.send({status:3,msg:'管理员登录成功'})
                                return
                            }
                        }else{
                            data._res.send({status:4,msg:'账号或密码错误'})
                            return
                        } 
                    }
                })
            })
            return p
        })(data)
    })
    .then((data)=>{
        return (function(data){
            let p=new Promise((resolve)=>{
                let seatArr=[0,1,2,3,4,5]
                let seatNum=0
                Player.find({},(err,res)=>{
                    if(err){
                        console.log("Error:" + err);
                    }else{
                        console.log('res:'+res)
                        if(res.length===0){
                            seatNum=0
                        }else{
                            for(let i=0;i<res.length;i++){
                                seatArr.splice(seatArr.indexOf(res[i].seatNum),1)
                            }
                            if(seatArr[0]===0){
                                seatNum=0
                            }else if(seatArr[0]===1){
                                seatNum=1
                            }else{
                                seatNum=seatArr[Math.floor(Math.random()*seatArr.length)]
                            }
                        }
                        let player=new Player({
                            username:data.username,
                            score:data._res2.score,
                            seatNum:seatNum,
                            readyFlag:false
                        })    
                        resolve({
                            username:data.username,
                            _res:data._res,
                            player:player,
                            seatNum:seatNum
                        })
                    }
                })
            })
            return p
        })(data)
    })
    .then((data)=>{
        return (function(data){
            let p=new Promise((resolve)=>{
                data.player.save(function(err,res){
                    if(err){
                        console.log('读取大厅用户列表失败')
                        data._res.send({status:1,msg:'读取大厅用户列表失败'})
                        return
                    }else{
                        console.log('读取大厅用户列表成功')
                        data._res.send({status:2,msg:'登录成功',username:data.username,seatNum:data.seatNum})
                        return
                    }
                })
            })
            return p
        })(data)
    })
})

router.get('/getPlayers',function(req,res){
    _res=res
    Player.find({},function(err,res){
        if(err){
            console.log("Error:" + err)
            _res.send({status:0,msg:'查询大厅用户列表失败'})
            return
        }else{
            _res.send({status:2,msg:'查询大厅用户列表成功',playersInRoom:res})
            return
        }
    }) 
})

router.post('/signout',function(req,res){
    _res=res
    let username=req.body.username
    let seatNum=req.body.seatNum
    Player.remove({username:username},function(err,res){
        if(err){
            console.log("Error:" + err)
            _res.send({status:0,msg:'退出房间失败'})
            return
        }else{
            console.log('删除player成功')
            myEmitter.emit("sendMyInfo",seatNum)
            myEmitter.emit("deleteSocket",seatNum)
            _res.send({status:2,msg:'退出房间成功'})
            return
        }
    }) 
})

function isReady(data){
    let _res=data._res
    let username=data.username
    let seatNum=data.seatNum
    let p=new Promise((resolve,reject)=>{
        Player.find({username:username},(err,res)=>{
            if(err){
                reject(err)
            }else{
                if(res[0].readyFlag){
                    console.log('用户已准备')
                }else{
                    resolve({_res:_res,username:username,seatNum:seatNum})
                } 
            }
        })
    })
    return p
}
function beReady(data){
    let _res=data._res
    let username=data.username
    let seatNum=data.seatNum
    let p=new Promise((resolve,reject)=>{
        Player.update({username:username},{readyFlag:true},(err,res)=>{
            if(err){
                reject(err)
                _res.send({status:0,msg:'准备失败'})
                return
            }else{
                console.log('准备成功')
                myEmitter.emit('sendMyInfo',seatNum)
                resolve()
                _res.send({status:2,msg:'准备成功'})
                return  
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
                resolve(data)
            }
        })
    })
    return p
}
function findPlayerCount(countReady){

    Player.count({},(err,res)=>{
        if(err){
            reject(err)
        }else{
            if((countReady===res)&&(countReady>1)){
                console.log('所有玩家已经准备，游戏开始')
                // beginFlag=true
                gameBegin()
            }else{
                console.log('有玩家还未准备或人数不足两人')
            }
        }
    })

}


router.post('/ready',function(req,res){
    if(beginFlag){
        console.log('游戏已经开始，等待下一局游戏')
        res.send({status:1,msg:'游戏已经开始，等待下一局游戏'})
        return
    }else{
        let username=req.body.username 
        let seatNum=req.body.seatNum 
        isReady({_res:res,username:username,seatNum:seatNum})
        .catch((err)=>{
            console.log("Error:" + err)
        })
        .then((data)=>{
            return beReady(data)
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
            findPlayerCount(data)
        })
    }        
})

router.post('/cancelReady',function(req,res){
    _res=res
    let username=req.body.username
    let seatNum=req.body.seatNum
    Player.update({username:username},{readyFlag:false},function(err,res){
        if(err){
            console.log("Error:" + err)
            _res.send({status:0,msg:'取消准备失败'})
            return
        }else{
            console.log('取消准备成功')
            myEmitter.emit('sendMyInfo',seatNum)
            _res.send({status:2,msg:'取消准备成功'})
            return
        }
    }) 
})

router.get('/clearCookies',function(req,res){
    res.clearCookie('userinfo')
    res.send('退出用户成功')
    return
})


module.exports=router