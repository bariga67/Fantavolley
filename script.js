let teams = [];
let matches = [];
const minPlayers = 6;  // Numero minimo di giocatori richiesti

// Funzione per creare una nuova squadra
function createTeam() {
    const teamName = document.getElementById('teamName').value;
    const team = { id: Date.now(), name: teamName, players: [], score: 0, penalties: 0, qualified: true };
    teams.push(team);
    document.getElementById('teamName').value = '';
    displayTeams();
}

// Funzione per aggiungere un giocatore a una squadra
function addPlayerToTeam(teamId, playerName) {
    const team = teams.find(t => t.id === teamId);
    if (team) {
        team.players.push(playerName);
        team.qualified = team.players.length >= minPlayers;
        displayTeams();
    }
}

// Funzione per visualizzare le squadre e i dettagli
function displayTeams() {
    const teamsTable = document.getElementById('teamsTable').getElementsByTagName('tbody')[0];
    teamsTable.innerHTML = teams.map(team => `
        <tr>
            <td>${team.name}</td>
            <td>${team.score}</td>
            <td>${team.players.join(', ') || "Nessun giocatore"}</td>
            <td>${team.penalties}</td>
            <td>${team.qualified ? 'Sì' : 'Squalificato'}</td>
        </tr>
    `).join('');
}

// Funzione per creare una nuova partita e aggiornare i punteggi
function createMatch() {
    const team1Id = parseInt(document.getElementById('team1').value);
    const team2Id = parseInt(document.getElementById('team2').value);
    const team1 = teams.find(t => t.id === team1Id);
    const team2 = teams.find(t => t.id === team2Id);

    if (!team1 || !team2) {
        alert('Entrambe le squadre devono esistere');
        return;
    }

    // Calcola punteggio con penalità
    team1.score = Math.floor(Math.random() * 100);  // Simulazione del punteggio
    team2.score = Math.floor(Math.random() * 100);
    
    if (team1.players.length < minPlayers) {
        team1.penalties += 10;
        team1.qualified = false;
    }
    if (team2.players.length < minPlayers) {
        team2.penalties += 10;
        team2.qualified = false;
    }

    const winner = team1.score > team2.score ? team1.name : team2.name;
    const match = {
        date: new Date().toLocaleDateString(),
        team1: team1.name,
        team1Score: team1.score,
        team2: team2.name,
        team2Score: team2.score,
        winner: winner
    };
    matches.push(match);
    displayMatches();
}

// Funzione per visualizzare le partite giocate
function displayMatches() {
    const matchesTable = document.getElementById('matchesTable').getElementsByTagName('tbody')[0];
    matchesTable.innerHTML = matches.map(match => `
        <tr>
            <td>${match.date}</td>
            <td>${match.team1}</td>
            <td>${match.team1Score}</td>
            <td>${match.team2}</td>
            <td>${match.team2Score}</td>
            <td>${match.winner}</td>
        </tr>
    `).join('');
}
