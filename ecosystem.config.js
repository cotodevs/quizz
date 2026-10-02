module.exports = {
  apps: [
    {
      name: 'cotoneb-phishing-sim',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: 8080,
        HOST: '0.0.0.0'
      },
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      time: true
    }
  ]
};
