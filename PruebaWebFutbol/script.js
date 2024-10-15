const baseUrl = "https://www.football-data.org/v2";
const apiKey = "59d28611aa7d4909a4ba455c0c435a77";

function fetchData(endpoint, callback) {
  $.ajax({
    url: `${baseUrl}${endpoint}`,
    headers: { "X-Auth-Token": apiKey },
    success: callback,
    error: function (error) {
      console.log("Error al obtener datos: ", error);
    }
  });
}

function fetchTeams() {
  fetchData("/competitions/PL/teams", function (data) {
    const teamsDiv = $("#equipos-list");
    teamsDiv.empty();
    data.teams.forEach(function (team) {
      teamsDiv.append(`<p>${team.name}</p>`);
    });
  });
}

function fetchStandings() {
  fetchData("/competitions/PL/standings", function (data) {
    const standingsTable = $("#clasificacion-list tbody");
    standingsTable.empty();
    data.standings[0].table.forEach(function (team, index) {
      standingsTable.append(`
        <tr>
          <td>${team.position}</td>
          <td>${team.team.name}</td>
          <td>${team.points}</td>
        </tr>
      `);
    });
  });
}

function fetchResults() {
  fetchData("/competitions/PL/matches?status=FINISHED", function (data) {
    const resultsDiv = $("#resultados-list");
    resultsDiv.empty();
    data.matches.forEach(function (match) {
      resultsDiv.append(`<p>${match.homeTeam.name} ${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam} ${match.awayTeam.name}</p>`);
    });
  });
}

function fetchPlayers() {
  fetchData("/teams/64", function (data) {
    const playersDiv = $("#jugadores-list");
    playersDiv.empty();
    data.squad.forEach(function (player) {
      if (player.role === "PLAYER") {
        playersDiv.append(`<p>${player.name} - ${player.position}</p>`);
      }
    });
  });
}

$(document).ready(function () {
  fetchTeams();
  //fetchStandings();
  //fetchResults();
  //fetchPlayers();
});
