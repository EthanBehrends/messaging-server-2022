require('module-alias').addPath(__dirname)

const setup = require('setup.js')


const start = async () => {
    await setup()
    const { startApp } = require('app.js')
    
    startApp()
}

start()