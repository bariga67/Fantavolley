let teams = [];
let matches = [];
const minPlayers = 6;  // Numero minimo di giocatori richiesti

// Funzione per creare una nuova squadra
function createTeam() {
    const teamName = document.getElementById('teamName').value.trim();
    const teamScore = parseInt(document.getElementById('teamScore').value) || 0;
    const teamPenalties = parseInt(document.getElementById('teamPenalties').value) || 0;
    const teamPlayers = document.getElementById('teamPlayers').value.split(',').map(player => player.trim());

    // Validazione dei campi
    if (teamName === '' || teamPlayers.length === 0) {
        alert("Inserisci tutti i dettagli della squadra.");
        return;
    }

    const team = {
        id: Date.now(),
        name: teamName,
        players: teamPlayers,
        score: teamScore,
        penalties: teamPenalties,
        qualified: teamPlayers.length >= minPlayers  // Qualifica con 6 o più giocatori
    };

    teams.push(team);

    // Pulizia dei campi
    document.getElementById('teamName').value = '';
    document.getElementById('teamScore').value = '';
    document.getElementById('teamPenalties').value = '';
    document.getElementById('teamPlayers').value = '';

    displayTeams();
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

// Funzione per creare una nuova partita e registrare i risultati
function createMatch() {
    const team1Name = document.getElementById('team1').value.trim();
    const team2Name = document.getElementById('team2').value.trim();

    const team1 = teams.find(t => t.name === team1Name);
    const team2 = teams.find(t => t.name === team2Name);

    if (!team1 || !team2) {
        alert('Entrambe le squadre devono esistere');
        return;
    }

    // Verifica se le squadre sono qualificate (almeno 6 giocatori)
    let winner;
    let score1 = team1.score - team1.penalties;
    let score2 = team2.score - team2.penalties;

    if (team1.players.length < minPlayers) {
        winner = team2.name;  // Team 1 perde a tavolino
        score1 = 0;
    } else if (team2.players.length < minPlayers) {
        winner = team1.name;  // Team 2 perde a tavolino
        score2 = 0;
    } else {
        winner = score1 > score2 ? team1.name : team2.name; // Confronto punteggi
    }

    const match = {
        date: new Date().toLocaleDateString(),
        team1: team1.name,
        team1Score: score1,
        team2: team2.name,
        team2Score: score2,
        winner: winner
    };

    matches.push(match);

    displayMatches();
    displayCalendar();
}

// Funzione per visualizzare le giornate giocate
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

// Funzione per visualizzare il calendario dei risultati
function displayCalendar() {
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = matches.map(match => `
        <div class="day">
            <strong>${match.date}</strong><br>
            <span class="winner">Vincitore: ${match.winner}</span>
        </div>
    `).join('');
}

