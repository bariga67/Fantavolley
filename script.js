let teams = [];

document.getElementById('teamForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teamName = document.getElementById('teamName').value;
    const teamPoints = parseInt(document.getElementById('teamPoints').value);
    const teamPenalties = parseInt(document.getElementById('teamPenalties').value);
    const teamPlayers = parseInt(document.getElementById('teamPlayers').value);
    
    addTeam(teamName, teamPoints, teamPenalties, teamPlayers);
    
    document.getElementById('teamForm').reset();
});

function addTeam(name, points, penalties, players) {
    const team = {
        name: name,
        points: points,
        penalties: penalties,
        players: players
    };
    teams.push(team);
    renderTeams();
    renderScores();
}

function renderTeams() {
    const teamList = document.getElementById('teamList');
    teamList.innerHTML = '';
    
    teams.forEach((team) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${team.points}</td>
            <td>${team.penalties}</td>
            <td>${team.players}</td>
        `;
        teamList.appendChild(row);
    });
}

function renderScores() {
    const scoreList = document.getElementById('scoreList');
    scoreList.innerHTML = '';

    let highestScore = -Infinity;
    let winningTeam = '';

    teams.forEach((team) => {
        let totalPoints = team.points - (team.penalties * 2); // Penalità da sottrarre
        let finalResult = totalPoints;

        if (team.players < 6) { // Numero minimo di giocatori
            finalResult = "Perde a tavolino";
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${totalPoints}</td>
            <td>${team.penalties}</td>
            <td>${finalResult}</td>
        `;
        scoreList.appendChild(row);

        if (typeof finalResult === 'number' && finalResult > highestScore) {
            highestScore = finalResult;
            winningTeam = team.name;
        }
    });

    if (winningTeam) {
        const winningRow = document.createElement('tr');
        winningRow.innerHTML = `<td colspan="4">Vincitore: ${winningTeam}</td>`;
        scoreList.appendChild(winningRow);
    }
}
