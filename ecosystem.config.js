module.exports = {
  apps : [{
        name: 'pj-swps',
        script: 'server-pj-swps.js',
        watch: true,
        env_production: {
            "NODE_ENV": "production",
        }
  }],
};
