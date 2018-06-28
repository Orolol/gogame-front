<template>
    <div class="policies">
        <div class="eco-policies policies">
            <div class="">
                <div v-for="v, k in ecoPolicies">
                    <span>{{v.Name}}</span>
                    <select v-model="cmpPolicyValue[v.ActionName]" @change="sendNewPolicy(v.ActionName, $event)" class="select-policy">
                        <option v-for="(elem, key) in v.PossibleValue2" :value="elem.Value">{{elem.Name}}</option>
                    </select>
                    <p class="description">{{v.Description}}</p>
                </div>
            </div>
        </div>
        <!-- <div class="mil-policies policies">
        <div class="infoPanel">
          <div v-for="v, k in milPolicies" >
            <span>{{v.Name}}</span>
            <select v-model="cmpPolicyValue[v]" @change="sendNewPolicy(v.ActionName , $event)"  class="select-policy">
              <option v-for="(elem, key) in v.PossibleValue2" v-bind:value="elem.Value">{{elem.Name}}</option>
            </select>
          </div>
        </div>
    </div> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['propsPolicies'],
    data() {
        return {
            currentPoliciesValue: {}
        }
    },
    computed: {
        ecoPolicies: function() {
            return this.propsPolicies
        },

        cmpBoardValues() {
            return this.$store.getters.myBoard
        },
        cmpPolicyValue() {
            for (let pol in this.propsPolicies) {
                let p = this.propsPolicies[pol]
                if (p.PossibleValue2[0].Effects[0].ModifierType == 'Policy') {
                    this.currentPoliciesValue[p.ActionName] = String(this.cmpBoardValues.ModifierPolicy[p.PossibleValue2[0].Effects[0].ModifierName])
                } else if (p.PossibleValue2[0].Effects[0].ModifierType == 'Economy') {
                    this.currentPoliciesValue[p.ActionName] = this.cmpBoardValues.Economy[p.PossibleValue2[0].Effects[0].ModifierName]
                } else if (p.PossibleValue2[0].Effects[0].ModifierType == 'Modifiers') {
                    this.currentPoliciesValue[p.ActionName] = this.cmpBoardValues.Modifiers[p.PossibleValue2[0].Effects[0].ModifierName]
                }
            }
            return this.currentPoliciesValue
        }
    },
    mounted() {
        // for (let i in this.$store.state.myBoard.Policies) {
        //     for (let j in this.$store.state.ecoPolicies) {
        //         if (
        //             this.$store.state.ecoPolicies[j].ActionName ==
        //             this.$store.state.myBoard.Policies[i].ActionName
        //         ) {
        //             this.$store.state.ecoPolicies[j].DefaultValue = Number(
        //                 this.$store.state.myBoard.Policies[i].Value
        //             )
        //         }
        //     }
        //     for (let j in this.$store.state.milPolicies) {
        //         if (
        //             this.$store.state.milPolicies[j].ActionName ==
        //             this.$store.state.myBoard.Policies[i].ActionName
        //         ) {
        //             this.$store.state.milPolicies[j].DefaultValue = Number(
        //                 this.$store.state.myBoard.Policies[i].Value
        //             )
        //         }
        //     }
        // }
    },
    methods: {
        jsonParse(jsonList) {
            return JSON.parse(jsonList)
        },
        sendNewPolicy(policy, event) {
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081/auth'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081/auth'
            this.$store.dispatch('getToken').then(
                function(token) {
                    axios({
                        url: baseUrl + '/ChangePolicy',
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + token },
                        data: {
                            ID: policy,
                            Value: Number(event.target.value),
                            PlayerID: this.$store.state.playerProfile.ID,
                            GameID: this.$store.state.currentGame.GameID
                        }
                    })
                        .then(
                            function(response) {
                                Vue.set(this.actionUsed, action, cd + this.$store.state.currentGame.CurrentTurn)
                            }.bind(this)
                        )
                        .catch(function(error) {
                            console.log(error)
                        })
                }.bind(this)
            )
        },
        getPolicyValue(p) {
            if (p.PossibleValue2.Effects[0].ModifierType == 'Policy') {
                return cmpBoardValues.ModifierPolicy[p.PossibleValue2.Effects[0].ModifierName]
            } else if (p.PossibleValue2.Effects[0].ModifierType == 'Economy') {
                return cmpBoardValues.Economy[p.PossibleValue2.Effects[0].ModifierName]
            }
        }
    }
}
</script>

<style>
.policies {
    text-align: left;
    font-size: 14px;
}
.eco-policies {
    bottom: 15%;
}
.mil-policies {
    bottom: 5%;
}

/*the container must be positioned relative:*/
.select-policy {
    background-color: white;
    height: 29px;
    overflow: hidden;
    width: 240px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
}
.select-policy select {
    background: transparent;
    border: none;
    font-size: 14px;
    height: 29px;
    padding: 5px; /* If you add too much padding here, the options won't show in IE */
    width: 268px;
}

.rounded {
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
}
</style>
