import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { getUsers } from '../services/users';

export const useGlobalStore = defineStore('GlobalStore', () => {
    const usersState = ref([]);

    const gameManagement = reactive({
        roundLocalSum: 3,
        roundLocalCurrent: 1,
        roundLocalMessage: '',
        roundOfTournamentCurrrent: 1,
        gameStep: 'gameOption',   // gameMain, gameOption
        currentPlayer1: 0,
        currentPlayer2: 0,
    });

    const flashAlert = reactive({
        message: '',
        type: '',
    });

    const showFlashAlert = function (message, type) {
        const thisOne = this;
        this.flashAlert.message = message;
        this.flashAlert.type = type;
        setTimeout(function () {
            thisOne.flashAlert.message = '';
        }, 1200);

    };

    async function fetchUsers() {

        const response = await getUsers();

        const { data: users = [] } = response;

        const remainingRivalsID = users.map(({ id }) => id);

        usersState.value = users.map(({ id, name, username }) => {
            return {
                id,
                name,
                username,
                wins: 0,
                remainingRivalsID: remainingRivalsID.filter((cur) => cur !== id),
            };
        });
    }

    return { gameManagement, showFlashAlert, flashAlert, usersState, fetchUsers };
});