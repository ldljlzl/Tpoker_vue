const express=require('express')
const User=require('./model/user')
const Player=require('./model/player')
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

router.post('/signin',function(req,res,next){
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
                if(!res.isAdmin){  
                    _res.cookie('userinfo',{username:account,isAdmin:false},{expires:new Date(Date.now()+60*60*24*1000)})  
                    let score=res.score      
                    let player=new Player({
                        username:res.account,
                        score:res.score
                    })
                    player.save(function(err,res){
                        if(err){
                            console.log('读取大厅用户列表失败')
                            _res.send({status:1,msg:'读取大厅用户列表失败'})
                            return
                        }
                        else{
                            console.log('读取大厅用户列表成功')
                            _res.send({status:2,msg:'登录成功',score:score})
                            return
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

router.get('/clearCookies',function(req,res){
    res.clearCookie('userinfo')
    res.send('退出用户成功')
    return
})


module.exports=router