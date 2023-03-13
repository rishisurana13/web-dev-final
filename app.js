const playerStats = {
    'messi': [{
        goals: 672,
        club: "Barcelona",
        appearances: 778,
        goalPerGameRatio: Math.round((672/778)*100)/100
    },
    {
        goals: 114,
        club: "Argentina",
        appearances: 195,
        goalPerGameRatio: Math.round((114/195)*100)/100
    },
    {
        goals: 29,
        club: "Paris Saint-Germain",
        appearances: 65,
        goalPerGameRatio: Math.round((29/65)*100)/100
    }],
    'ronaldo': [{
        goals: 450,
        club: "Real Madrid",
        appearances: 428,
        goalPerGameRatio: Math.round((450/438)*100)/100
    },
    {
        goals: 118,
        club: "Manchester United",
        appearances: 292,
        goalPerGameRatio: Math.round((118/292)*100)/100
    },
    {
        goals: 101,
        club: "Juventus",
        appearances: 134,
        goalPerGameRatio: Math.round((101/134)*100)/100
    }],
    'neymar': [{
        goals: 105,
        club: "Barcelona",
        appearances: 186,
        goalPerGameRatio: Math.round((108/186)*100)/100
    },
    {
        goals: 136,
        club: "Santos",
        appearances: 225,
        goalPerGameRatio: Math.round((136/225)*100)/100
    },
    {
        goals: 118,
        club: "Paris Saint Germain",
        appearances: 173,
        goalPerGameRatio: Math.round((118/173)*100)/100
    }],
     'mbappe': [{
        goals: 27,
        club: "AS Monaco",
        appearances: 60,
        goalPerGameRatio: Math.round((108/186)*100)/100
    },
    {
        goals: 209,
        club: "Paris Saint Germain",
        appearances: 249,
        goalPerGameRatio: Math.round((136/225)*100)/100
    },
    {
        goals: 36,
        club: "France",
        appearances: 66,
        goalPerGameRatio: Math.round((118/173)*100)/100
    }]
};

const tableBody = document.querySelector("#stats-table tbody");

function addRows(players) {
  players.forEach((player) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.club}</td>
      <td>${player.goals}</td>
      <td>${player.appearances}</td>
      <td>${player.goalPerGameRatio}</td>
    `;
    document.querySelector("tbody").appendChild(row);
  });
}


function clearRows() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

function sortOrReverseByKey(players, key) {
  let sorted = true;
  for (let i = 0; i < players.length - 1; i++) {
    if (players[i][key] < players[i + 1][key]) {
      sorted = false;
      break;
    }
  }

  if (sorted) {
    players.reverse();
  } else {
    players.sort((a, b) => {
      if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key] - a[key];
      }
    });
  }
  return players;
}



function sortTable(column) {
  clearRows();
  const path = new URL(window.location.toLocaleString()).pathname;
  let player = path.split(".html");
  player = player[0].split("/")[1];
  let sortedPlayers;
  switch (column) {
    case "goals":
      sortedPlayers = sortOrReverseByKey(playerStats[player], "goals");
      break;
    case "club":
      sortedPlayers = sortOrReverseByKey(playerStats[player], "club");
      break;
    case "appearances":
      sortedPlayers = sortOrReverseByKey(playerStats[player], "appearances");
      break;
    case "ratio":
      sortedPlayers = sortOrReverseByKey(playerStats[player], "goalPerGameRatio");
      break;
    default:
      sortedPlayers = playerStats[player];
  }
  addRows(sortedPlayers);
}


const goalsHeader = document.querySelector("#goals-header");
const clubHeader = document.querySelector("#club-header");
const appearancesHeader = document.querySelector("#appearances-header");
const ratioHeader = document.querySelector("#ratio-header");


window.addEventListener("load", function() {
clearRows();
  const path = new URL(window.location.toLocaleString()).pathname;
  let player = path.split(".html");
  player = player[0].split("/")[1]
  addRows(playerStats[player])
});

goalsHeader.addEventListener("click", () => {
    sortTable("goals");
});

clubHeader.addEventListener("click", () => {
    sortTable("club");
});

appearancesHeader.addEventListener("click", () => {
    sortTable("appearances");
});

ratioHeader.addEventListener("click", () => {
    sortTable("ratio");
});

addRows(playerStats);


