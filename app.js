const app = Vue.createApp({
    data() {
        return {
            logs:[],
            gameOver:false,
            playerHealth:100,
            monsterHealth:100,
            isPlayerChance:true,
            winnerName:'',
            allowedHealsForPlayer:2,
            allowedHealsForMonster:2,
        }
    },
    methods: {
        whoWinsTheGame(){
            let log;
            if(this.monsterHealth<=0){
                this.monsterHealth=0;
                this.winnerName='Player';
                this.gameOver=true;
                log=`<b>Player</b> wins the Game`;
                this.logs.push(log);
                return;
            }
            if(this.playerHealth<=0){
                this.playerHealth=0;    
                this.winnerName='Monster'
                this.gameOver=true;
                log=`<b>Monster</b> wins the Game`;
                this.logs.push(log);
                return;
            }
            this.isPlayerChance=!this.isPlayerChance;
        },
        onAttack(){
            let attackValue;
            let log;
            if(this.isPlayerChance){
                attackValue=Math.floor(Math.random()*10)+5;
                this.monsterHealth-=attackValue;
                log=`<span class="log--player">Player</span> attacks and deals <span class="log--damage">${attackValue}</span>`;
            }
            else{
                attackValue=Math.floor(Math.random()*10)+2;
                this.playerHealth-=attackValue;
                log=`<span class="log--monster">Monster</span> attacks and deals <span class="log--damage">${attackValue}</span>`;
            }
            this.logs.push(log);
            this.whoWinsTheGame();
        },
        onSpecialAttack(){
            let specialAttakMove=Math.floor(Math.random()*10)+7;
            let log;
            if (this.isPlayerChance){
                this.monsterHealth-=specialAttakMove
                log=`<span class="log--player">Player</span> special attacks and deals <span class="log--damage"> ${specialAttakMove}</span>`;
            }
            else{
                this.playerHealth-=specialAttakMove;
                log=`<span class="log--monster">Monster</span> special attacks and deals <span class="log--damage">${specialAttakMove}</span>`;
            } 
            this.logs.push(log);
            this.whoWinsTheGame();
        },
        onHeal(){
            let healValue=Math.floor(Math.random()*10)+5;
            let log;
            if(this.isPlayerChance){
                if(this.allowedHealsForPlayer<=0) return;
                this.playerHealth+=healValue;
                log=`<span class="log--player">Player</span> heals himself for <span class="log--heal">${healValue}</span>`;
                this.allowedHealsForPlayer--;
            }
            else{
                if(this.allowedHealsForMonster<=0) return;
                this.monsterHealth+=healValue;
                log=`<span class="log--monster">Monster</span> heals himself for <span class="log--heal">${healValue}</span>`;
                this.allowedHealsForMonster--;
            }
            this.logs.push(log);
            if(this.monsterHealth>=100) this.monsterHealth=100;
            if(this.playerHealth>=100) this.playerHealth=100;
        },
        onSurrender(){
            (this.isPlayerChance)?(this.playerHealth=0):(this.monsterHealth=0);
            this.whoWinsTheGame();
        },
        onStartNewGame(){
            this.gameOver=false;
            this.winnerName='';
            this.isPlayerChance=true;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.logs=[];
            this.allowedHealsForMonster=2;
            this.allowedHealsForPlayer=2;
        }
    },
});

app.mount('#game');