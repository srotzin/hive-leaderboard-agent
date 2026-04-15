'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3031;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/leaderboard'));
app.get('/',(_,r)=>r.json({service:'hive-leaderboard-agent',version:'1.0.0',description:'Competitive rankings — agent performance boards, achievement badges, seasonal competitions',endpoints:{execute:'POST /v1/leaderboard/execute',record:'GET /v1/leaderboard/record/:id',stats:'GET /v1/leaderboard/stats',records:'GET /v1/leaderboard/records',health:'GET /health',pulse:'GET /.well-known/hive-pulse.json',ai:'GET /.well-known/ai.json'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-leaderboard-agent] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
