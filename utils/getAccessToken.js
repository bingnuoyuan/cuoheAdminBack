const rp = require('request-promise')
const APPID = 'wxfa16f7434362f65d'
const APPSECRET = 'db664e5824c4474dcd67ebf17df9e2de'
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')

const updateAccessToken = async () => {
    const resStr = await rp(URL)
    const res = JSON.parse(resStr)
    console.log(res)
    // 写文件
    if (res.access_token) {
        fs.writeFileSync(fileName, JSON.stringify({
            access_token: res.access_token,
            createTime: new Date()
        }))
    } else {
        await updateAccessToken()
    }
}

const getAccessToken = async () => {
    // 读取文件
    try {
        const readRes = fs.readFileSync(fileName, 'utf8')
        const readObj = JSON.parse(readRes)
        const createTime = new Date(readObj.createTime).getTime()
        const nowTime = new Date().getTime()
        if ((nowTime - createTime) / 1000 / 60 / 60 >= 1) {
            await updateAccessToken()
            return await getAccessToken()
        }
        return readObj.access_token
    } catch (error) {
        await updateAccessToken()
        return  await getAccessToken()
    }
}

setInterval(async () => {
    return await updateAccessToken()
}, (7200 - 1000) * 1000)

// updateAccessToken()
// console.log(getAccessToken())
module.exports = getAccessToken
