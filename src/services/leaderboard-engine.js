'use strict';const{v4:uuid}=require('uuid');
const boards=new Map();const achievements=new Map();const seasons=new Map();
const BADGES={first_execution:{name:'First Blood',icon:'⚡'},speed_demon:{name:'Speed Demon',icon:'🏎️'},whale:{name:'Whale',icon:'🐋'},trusted:{name:'Trusted',icon:'🛡️'},squad_leader:{name:'Squad Leader',icon:'👑'}};
let stats={boards_created:0,badges_awarded:0,seasons_run:0};
function createBoard(name,opts={}){const id=uuid();const b={id,name,metric:opts.metric||'executions',period:opts.period||'all_time',entries:[],created_at:new Date().toISOString()};boards.set(id,b);stats.boards_created++;return b}
function addEntry(boardId,agentDid,score){const b=boards.get(boardId);if(!b)return null;b.entries.push({agent_did:agentDid,score,recorded_at:new Date().toISOString()});b.entries.sort((a,c)=>c.score-a.score);return b}
function awardBadge(agentDid,badgeKey){const id=uuid();const badge=BADGES[badgeKey]||{name:badgeKey,icon:'🏅'};const a={id,agent_did:agentDid,badge:badgeKey,...badge,awarded_at:new Date().toISOString()};achievements.set(id,a);stats.badges_awarded++;return a}
function createSeason(opts={}){const id=uuid();const s={id,name:opts.name||'Season '+id.slice(0,4),starts:new Date().toISOString(),ends:new Date(Date.now()+(opts.days||30)*86400000).toISOString(),prize_pool_usdc:opts.prize_pool||100,participants:[],status:'active'};seasons.set(id,s);stats.seasons_run++;return s}
function getStats(){return{...stats,badges_available:Object.keys(BADGES),active_seasons:[...seasons.values()].filter(s=>s.status==='active').length}}
module.exports={createBoard,addEntry,awardBadge,createSeason,getStats,boards,achievements,BADGES};