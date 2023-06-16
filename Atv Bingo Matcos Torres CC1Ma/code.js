var players = [];
        var cards = [];
        var numbersDrawn = [];

        function addPlayer() {
            var playerName = document.getElementById("player").value;

            if (playerName !== "") {
                players.push(playerName);
                document.getElementById("player").value = "";
            }
        }

        function createCards() {
            var cardCount = parseInt(document.getElementById("card").value);

            if (!isNaN(cardCount) && cardCount >= 1 && cardCount <= 10) {
                cards = [];

                for (var i = 0; i < cardCount; i++) {
                    var card = [];

                    while (card.length < 9) {
                        var number = Math.floor(Math.random() * 90) + 1;

                        if (!card.includes(number)) {
                            card.push(number);
                        }
                    }

                    cards.push(card);
                }

                document.getElementById("card").value = "1";
                displayCards();
            }
        }

        function displayCards() {
            var container = document.querySelector(".container");
            container.innerHTML = "";

            for (var i = 0; i < cards.length; i++) {
                var cardElement = document.createElement("div");
                cardElement.classList.add("card");

                var playerName = document.createElement("div");
                playerName.classList.add("player-name");
                playerName.innerText = players[i] || "Jogador " + (i + 1);
                cardElement.appendChild(playerName);

                for (var j = 0; j < cards[i].length; j++) {
                    var numberElement = document.createElement("div");
                    numberElement.classList.add("number");
                    numberElement.innerText = cards[i][j];
                    cardElement.appendChild(numberElement);
                }

                container.appendChild(cardElement);
            }
        }

        function startGame() {
            numbersDrawn = [];
            document.getElementById("numbersDrawn").innerText = "";
            document.getElementById("winner").innerText = "";

            var interval = setInterval(function() {
                var number = Math.floor(Math.random() * 90) + 1;
                numbersDrawn.push(number);
                document.getElementById("numbersDrawn").innerText = numbersDrawn.join(", ");

                markNumbers();

                checkWinner();

                if (numbersDrawn.length === 90) {
                    clearInterval(interval);
                }
            }, 1000);
        }

        function markNumbers() {
            var cardElements = document.querySelectorAll(".card");

            for (var i = 0; i < cardElements.length; i++) {
                var numbers = cardElements[i].querySelectorAll(".number");

                for (var j = 0; j < numbers.length; j++) {
                    var number = parseInt(numbers[j].innerText);

                    if (numbersDrawn.includes(number)) {
                        numbers[j].style.backgroundColor = "green";
                    }
                }
            }
        }

        function checkWinner() {
            for (var i = 0; i < cards.length; i++) {
                var card = cards[i];
                var isWinner = true;

                for (var j = 0; j < card.length; j++) {
                    if (!numbersDrawn.includes(card[j])) {
                        isWinner = false;
                        break;
                    }
                }

                if (isWinner) {
                    document.getElementById("winner").innerText = "Parabéns, jogador " + (players[i] || "Jogador " + (i + 1)) + "! Você ganhou!";
                    break;
                }
            }
        }