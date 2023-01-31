const tableBody = document.querySelector(".tbody")

const URL= './schedule.json'


async function getapi(url) {

    
    const response = await fetch(url);
    
    const data = await response.json();

    const scheduleArray = data.schedules
    
    scheduleArray.forEach(element => {
       const teamOne = element.sport_event.competitors[0].name;
       const teamTwo = element.sport_event.competitors[1].name;
       const scoreOne = element.sport_event_status.home_score;
       const scoreTwo = element.sport_event_status.away_score;
       const matchDate = element.sport_event.start_time.slice(0,10);
       const stadium = element.sport_event.venue.name;


       const rowElement = document.createElement('tr');
       const teamOneCell = document.createElement('td')
       const teamTwoCell = document.createElement('td')
       const matchDateCell = document.createElement('td')
       const stadiumCell = document.createElement('td')
       const halfTimeScoreCell = document.createElement('td')
       const scoreCell = document.createElement('td')

    
       rowElement.appendChild(teamOneCell)
       rowElement.appendChild(teamTwoCell)
       rowElement.appendChild(matchDateCell)
       rowElement.appendChild(stadiumCell)
       rowElement.appendChild(halfTimeScoreCell)
       rowElement.appendChild(scoreCell)

       teamOneCell.textContent = `${teamOne}`
       teamTwoCell.textContent = `${teamTwo}`
       matchDateCell.textContent = matchDate;
       stadiumCell.textContent = stadium;

        if (element.sport_event_status.match_status !== 'ended') {
            halfTimeScoreCell.textContent = '-';
            scoreCell.textContent = 'Postponed';
        } else {
            const halfScoreOne = element.sport_event_status.period_scores[0].home_score
            const halfScoreTwo = element.sport_event_status.period_scores[0].away_score

            halfTimeScoreCell.textContent = `${halfScoreOne} : ${halfScoreTwo}`
            scoreCell.textContent = `${scoreOne} : ${scoreTwo}`
        }

 
        if (scoreOne > scoreTwo) {
            teamOneCell.classList.add('winner')
            teamTwoCell.classList.add('loser')
        } else if (scoreOne < scoreTwo) {
            teamOneCell.classList.add('loser')
            teamTwoCell.classList.add('winner')
        } else if(scoreOne == scoreTwo && scoreCell.textContent !== 'Postponed') {
            teamOneCell.classList.add('draw')
            teamTwoCell.classList.add('draw')
        } 

       
       tableBody.appendChild(rowElement)
       
       });
    }


getapi(URL);
