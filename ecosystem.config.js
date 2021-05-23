module.exports = {
  apps : [{
        name: 'dutch-auction',
        script: 'server-pj-auction.js',
        watch: true,
        env_production: {
            "NODE_ENV": "production",
        }
  }],
};
