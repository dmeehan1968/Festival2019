const homeDir = '/home/replicated/2019.10parishesfestival.org.uk'
module.exports = {
  apps : [{
    name: 'Festival2019',
    script: `${homeDir}/build/server/server.bundle.js`,
    cwd: homeDir,
    interpreter: '/home/replicated/.nvm/versions/node/v11.9.0/bin/node',
    log_date_format : "YYYY-MM-DD HH:mm Z",

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && npm run build && npx pm2 reload ecosystem.config.js --env production'
    }
  }
};
