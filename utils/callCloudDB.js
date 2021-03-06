const getAccessToken = require('./getAccessToken.js')
const rp = require('request-promise')

const callCloudDB = async(ctx, fnName, query = {}) => {
    const ACCESS_TOKEN = await getAccessToken()
    const options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`,
        body: {
            query,
            env: ctx.state.env,
        },
        json: true // Automatically stringifies the body to JSON
    }
    // console.log('query', query)
    return await rp(options)
        .then((res) => {
            console.log('res',res);
            return res
        })
        .catch(function (err) {
            console.log(err);
        })

}

module.exports = callCloudDB